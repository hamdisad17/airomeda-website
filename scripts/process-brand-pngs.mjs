// One-off script: identifies the 9 brand PNGs and creates transparent versions.
// Strategy:
//   - read each PNG, get dimensions
//   - sample the 4 corner pixels (12x12 each)
//   - corner color light (>200,>200,>200) → "light" bg variant
//   - corner color dark (<40,<40,<60)    → "dark" bg variant
//   - square (aspect ≈ 1) → "mark"
//   - wide (aspect > 1.6) → "logo"
//   - chroma-key: walk every pixel; if it matches the bg corner within tolerance, set alpha = 0
//   - save trimmed transparent PNG under public/brand/<role>.png

import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.resolve('public/brand');
const OUT = SRC;

function colorDistance(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

async function detectVariant(file) {
  const img = sharp(file);
  const meta = await img.metadata();
  const { width, height } = meta;
  const aspect = width / height;

  const { data } = await img.raw().toBuffer({ resolveWithObject: true });
  const channels = meta.channels; // 3 or 4
  const idx = (x, y) => (y * width + x) * channels;
  const px = (x, y) => [data[idx(x, y)], data[idx(x, y) + 1], data[idx(x, y) + 2]];

  // Sample many points and pick the modal (most-frequent rounded color) — robust to rounded corners.
  const samples = [];
  // edge midpoints + offsets
  for (let i = 1; i < 10; i++) {
    samples.push(px(Math.floor((width * i) / 10), 4));
    samples.push(px(Math.floor((width * i) / 10), height - 5));
    samples.push(px(4, Math.floor((height * i) / 10)));
    samples.push(px(width - 5, Math.floor((height * i) / 10)));
  }
  // bucket by RGB rounded to nearest 16
  const buckets = new Map();
  for (const s of samples) {
    const key = `${s[0] >> 4}-${s[1] >> 4}-${s[2] >> 4}`;
    if (!buckets.has(key)) buckets.set(key, { count: 0, sum: [0, 0, 0] });
    const b = buckets.get(key);
    b.count++;
    b.sum[0] += s[0]; b.sum[1] += s[1]; b.sum[2] += s[2];
  }
  const top = [...buckets.values()].sort((a, b) => b.count - a.count)[0];
  const bg = top.sum.map((s) => Math.round(s / top.count));
  const lum = (bg[0] + bg[1] + bg[2]) / 3;

  const bgKind = lum > 200 ? 'light' : 'dark';
  const shape = aspect < 1.2 ? 'mark' : 'logo';

  return { bgKind, shape, aspect, width, height, bg, channels };
}

async function chromaKey(file, bg, channels) {
  const img = sharp(file);
  const meta = await img.metadata();
  const { width, height } = meta;
  const { data } = await img.raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(width * height * 4);

  const tolerance = 35; // distance in RGB

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * channels;
      const dstIdx = (y * width + x) * 4;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];
      const dist = colorDistance([r, g, b], bg);

      out[dstIdx] = r;
      out[dstIdx + 1] = g;
      out[dstIdx + 2] = b;

      if (dist < tolerance) {
        out[dstIdx + 3] = 0;
      } else if (dist < tolerance * 2) {
        // soft edge — gradient alpha
        out[dstIdx + 3] = Math.round(((dist - tolerance) / tolerance) * 255);
      } else {
        out[dstIdx + 3] = channels === 4 ? data[srcIdx + 3] : 255;
      }
    }
  }

  return sharp(out, { raw: { width, height, channels: 4 } })
    .trim()
    .png({ compressionLevel: 9 });
}

async function main() {
  const files = (await readdir(SRC)).filter((f) => f.toLowerCase().endsWith('.png') && f.startsWith('ChatGPT'));
  console.log(`Found ${files.length} source PNGs`);

  const candidates = [];
  for (const f of files) {
    const full = path.join(SRC, f);
    const v = await detectVariant(full);
    candidates.push({ src: full, variant: v, name: f });
    console.log(`${f} → ${v.shape}-${v.bgKind} (aspect=${v.aspect.toFixed(2)}, bg=rgb(${v.bg.join(',')}))`);
  }

  // Score each candidate for each role; pick the best
  const lum = (rgb) => (rgb[0] + rgb[1] + rgb[2]) / 3;
  const score = (c, target) => {
    // target: { aspect, bgLight }
    const aspectScore = -Math.abs(c.variant.aspect - target.aspect);
    const bgScore = target.bgLight
      ? lum(c.variant.bg) // light bg → high lum wins
      : -lum(c.variant.bg); // dark bg → low lum wins
    return aspectScore * 10 + bgScore * 0.01;
  };

  const roles = {
    'mark-dark':  { aspect: 1.0,  bgLight: false },
    'mark-light': { aspect: 1.0,  bgLight: true },
    'logo-dark':  { aspect: 1.78, bgLight: false },
    'logo-light': { aspect: 1.78, bgLight: true },
  };

  for (const [role, target] of Object.entries(roles)) {
    const sorted = [...candidates].sort((a, b) => score(b, target) - score(a, target));
    const best = sorted[0];
    const outFile = path.join(OUT, `${role}.png`);
    const pipeline = await chromaKey(best.src, best.variant.bg, best.variant.channels);
    await pipeline.toFile(outFile);
    console.log(`✓ ${role}.png ← ${best.name}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
