import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { loadServiceFrontmatter, listServices, __setContentRootForTests } from '@/lib/mdx';

let TEMP_ROOT: string;

beforeAll(async () => {
  TEMP_ROOT = await fs.mkdtemp(path.join(os.tmpdir(), 'airomeda-content-'));
  __setContentRootForTests(TEMP_ROOT);

  const dir = path.join(TEMP_ROOT, 'services', 'tr');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, 'finans.mdx'),
    `---
title: Finans Yazılımları
slug: finans
excerpt: Test
hero_subtitle: Test
capabilities:
  - { title: A, description: B }
tech_stack: [Node.js]
cta_text: CTA
---

# Body
`,
    'utf-8',
  );
});

afterAll(async () => {
  await fs.rm(TEMP_ROOT, { recursive: true, force: true });
});

describe('mdx loader', () => {
  it('loads frontmatter for a single service', async () => {
    const fm = await loadServiceFrontmatter('finans', 'tr');
    expect(fm).not.toBeNull();
    expect(fm!.title).toBe('Finans Yazılımları');
  });

  it('returns null for missing service', async () => {
    const fm = await loadServiceFrontmatter('does-not-exist', 'tr');
    expect(fm).toBeNull();
  });

  it('lists services for a locale', async () => {
    const list = await listServices('tr');
    expect(list.some((s) => s.slug === 'finans')).toBe(true);
  });

  it('returns empty list for locale with no content', async () => {
    const list = await listServices('en');
    expect(list).toEqual([]);
  });
});
