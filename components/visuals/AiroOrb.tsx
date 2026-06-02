'use client';
import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * AiroOrb v2 — a living particle entity. Cinematic morph behaviour:
 *
 *  • Per-particle stagger — each particle starts its morph at a slightly
 *    different time, so the swarm flows into the next form like a wave
 *    instead of every dot moving in lockstep
 *  • Curved trajectory — each particle gets a random midpoint offset so
 *    paths arc through space, not straight lines
 *  • Outward burst — at the midpoint of the morph the swarm scatters
 *    away from origin, then convergences onto the target shape
 *  • Always-on organic drift — particles never freeze, even during the
 *    'hold' phase between morphs
 *  • Live energy arcs flicker between random particle pairs
 *  • Slow auto-orbit camera + UnrealBloom post-process
 */

type Props = {
  className?: string;
};

const PARTICLE_COUNT = 3200;
const BG_DUST_COUNT = 700;
const ARC_COUNT = 6;

function hash(i: number): number {
  const s = Math.sin(i * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

// === Shape factories ===
function makeSwarm(count: number, radius = 1.5): Float32Array {
  // Noisy spherical cloud — not a perfect sphere, has organic depth.
  const arr = new Float32Array(count * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const wobble =
      0.92 +
      Math.sin(theta * 4) * 0.08 +
      Math.cos(y * 5) * 0.05 +
      hash(i + 3) * 0.04;
    const rr = radius * wobble;
    arr[i * 3] = Math.cos(theta) * r * rr;
    arr[i * 3 + 1] = y * rr;
    arr[i * 3 + 2] = Math.sin(theta) * r * rr;
  }
  return arr;
}

function makeBrain(count: number, radius = 1.6): Float32Array {
  const arr = new Float32Array(count * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const bumps =
      Math.sin(theta * 6) * 0.22 +
      Math.cos(y * 9) * 0.18 +
      Math.sin(theta * 3 + y * 4) * 0.14;
    const rr = radius + bumps;
    arr[i * 3] = Math.cos(theta) * r * rr;
    arr[i * 3 + 1] = y * rr;
    arr[i * 3 + 2] = Math.sin(theta) * r * rr;
  }
  return arr;
}

function makeTorus(count: number, R = 1.4, r = 0.55): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = hash(i + 11) * Math.PI * 2;
    const v = hash(i + 23) * Math.PI * 2;
    arr[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
    arr[i * 3 + 1] = r * Math.sin(v) * 0.9;
    arr[i * 3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
  }
  return arr;
}

function makeLetterA(count: number, scale = 1.9): Float32Array {
  const arr = new Float32Array(count * 3);
  const apex: [number, number] = [0, 1];
  const bl: [number, number] = [-0.7, -1];
  const br: [number, number] = [0.7, -1];
  const crossYNorm = -0.2;
  const crossLT: [number, number] = [
    bl[0] + (apex[0] - bl[0]) * ((crossYNorm - bl[1]) / (apex[1] - bl[1])),
    crossYNorm,
  ];
  const crossRT: [number, number] = [
    br[0] + (apex[0] - br[0]) * ((crossYNorm - br[1]) / (apex[1] - br[1])),
    crossYNorm,
  ];

  const seg = (i: number): [number, number] => {
    const p = hash(i);
    if (p < 0.4) {
      const t = hash(i + 17);
      return [apex[0] + (bl[0] - apex[0]) * t, apex[1] + (bl[1] - apex[1]) * t];
    } else if (p < 0.8) {
      const t = hash(i + 29);
      return [apex[0] + (br[0] - apex[0]) * t, apex[1] + (br[1] - apex[1]) * t];
    } else {
      const t = hash(i + 41);
      return [crossLT[0] + (crossRT[0] - crossLT[0]) * t, crossLT[1] + (crossRT[1] - crossLT[1]) * t];
    }
  };

  for (let i = 0; i < count; i++) {
    const [px, py] = seg(i);
    const jitterX = (hash(i + 53) - 0.5) * 0.1;
    const jitterY = (hash(i + 67) - 0.5) * 0.1;
    const jitterZ = (hash(i + 71) - 0.5) * 0.4;
    arr[i * 3] = (px + jitterX) * scale;
    arr[i * 3 + 1] = (py + jitterY) * scale;
    arr[i * 3 + 2] = jitterZ;
  }
  return arr;
}

function makeColors(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  const palette = [
    [0.0, 0.83, 1.0],
    [0.49, 1.0, 1.0],
    [0.66, 0.33, 0.97],
    [0.93, 0.28, 0.6],
    [1.0, 1.0, 1.0],
  ];
  for (let i = 0; i < count; i++) {
    const r = hash(i + 5);
    const idx =
      r < 0.55 ? 0 :
      r < 0.8 ? 1 :
      r < 0.92 ? 2 :
      r < 0.98 ? 3 : 4;
    const c = palette[idx] ?? palette[0]!;
    arr[i * 3] = c[0] ?? 0;
    arr[i * 3 + 1] = c[1] ?? 0;
    arr[i * 3 + 2] = c[2] ?? 0;
  }
  return arr;
}

// Random unit-vector midpoint offset per particle, for curved trajectories.
function makeMidpointOffsets(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = hash(i + 89) * Math.PI * 2;
    const phi = Math.acos(2 * hash(i + 103) - 1);
    const mag = 0.55 + hash(i + 109) * 0.7; // 0.55 .. 1.25
    arr[i * 3] = Math.sin(phi) * Math.cos(theta) * mag;
    arr[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * mag;
    arr[i * 3 + 2] = Math.cos(phi) * mag;
  }
  return arr;
}

// Stagger delay per particle — 0..1 normalized fraction of the morph
// window each particle waits before starting.
function makeStagger(count: number): Float32Array {
  const arr = new Float32Array(count);
  for (let i = 0; i < count; i++) arr[i] = hash(i + 131) * 0.35; // up to 35% delay
  return arr;
}

const SHAPE_SEQUENCE = ['swarm', 'brain', 'torus', 'letterA'] as const;
type ShapeKey = typeof SHAPE_SEQUENCE[number];

function Particles({ pointerRef }: { pointerRef: React.RefObject<{ x: number; y: number }> }) {
  const ref = React.useRef<THREE.Points>(null);

  const data = React.useMemo(() => {
    const shapes: Record<ShapeKey, Float32Array> = {
      swarm: makeSwarm(PARTICLE_COUNT),
      brain: makeBrain(PARTICLE_COUNT),
      torus: makeTorus(PARTICLE_COUNT),
      letterA: makeLetterA(PARTICLE_COUNT),
    };
    return {
      positions: new Float32Array(shapes.swarm),
      colors: makeColors(PARTICLE_COUNT),
      shapes,
      midOffsets: makeMidpointOffsets(PARTICLE_COUNT),
      stagger: makeStagger(PARTICLE_COUNT),
    };
  }, []);

  const state = React.useRef({
    fromShape: 0,
    toShape: 0,
    holdUntil: 0,
    morphDuration: 2.4,
    initialised: false,
  });

  useFrame((rs) => {
    const points = ref.current;
    if (!points) return;
    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (!posAttr) return;
    const positions = posAttr.array as Float32Array;
    const time = rs.clock.elapsedTime;

    if (!state.current.initialised) {
      state.current.holdUntil = time + 3;
      state.current.initialised = true;
    }

    // State machine — randomized hold + morph durations break the
    // robotic rhythm.
    let morphT = 1;
    if (time < state.current.holdUntil) {
      morphT = 1;
    } else if (time < state.current.holdUntil + state.current.morphDuration) {
      morphT = (time - state.current.holdUntil) / state.current.morphDuration;
    } else {
      state.current.fromShape = state.current.toShape;
      state.current.toShape = (state.current.toShape + 1) % SHAPE_SEQUENCE.length;
      const holdLen = 3.4 + hash(state.current.toShape + Math.floor(time * 7.3)) * 1.6;
      const morphLen = 2.2 + hash(state.current.toShape * 3 + 1) * 0.9;
      state.current.holdUntil = time + holdLen;
      state.current.morphDuration = morphLen;
      morphT = 1;
    }

    const fromKey = SHAPE_SEQUENCE[state.current.fromShape] ?? 'swarm';
    const toKey = SHAPE_SEQUENCE[state.current.toShape] ?? 'swarm';
    const from = data.shapes[fromKey];
    const to = data.shapes[toKey];

    const px = pointerRef.current?.x ?? 0;
    const py = pointerRef.current?.y ?? 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Per-particle stagger — start later than the swarm front, so the
      // shape forms as a wave rather than a snap.
      const delay = data.stagger[i] ?? 0;
      const raw = (morphT - delay) / (1 - delay);
      const e = Math.max(0, Math.min(1, raw));
      // Smoothstep ease
      const t = e * e * (3 - 2 * e);

      // Curved path via quadratic-bezier-ish: B(t) = (1-t)^2 * from + 2(1-t)t * mid + t^2 * to
      // Midpoint = average of (from, to) pushed outward by per-particle offset.
      const fx = from?.[i3] ?? 0;
      const fy = from?.[i3 + 1] ?? 0;
      const fz = from?.[i3 + 2] ?? 0;
      const tx = to?.[i3] ?? 0;
      const ty = to?.[i3 + 1] ?? 0;
      const tz = to?.[i3 + 2] ?? 0;
      // Outward burst: average position pushed away from origin by
      // midOffset, scaled by a "burst factor" that peaks at morphT=0.5.
      const burstAmount = Math.sin(t * Math.PI) * 0.85;
      const mxBase = (fx + tx) * 0.5;
      const myBase = (fy + ty) * 0.5;
      const mzBase = (fz + tz) * 0.5;
      const mox = data.midOffsets[i3] ?? 0;
      const moy = data.midOffsets[i3 + 1] ?? 0;
      const moz = data.midOffsets[i3 + 2] ?? 0;
      const mx = mxBase + mox * burstAmount;
      const my = myBase + moy * burstAmount;
      const mz = mzBase + moz * burstAmount;

      const u = 1 - t;
      const u2 = u * u;
      const t2 = t * t;
      const ut2 = 2 * u * t;
      let X = u2 * fx + ut2 * mx + t2 * tx;
      let Y = u2 * fy + ut2 * my + t2 * ty;
      let Z = u2 * fz + ut2 * mz + t2 * tz;

      // Always-on organic drift, regardless of phase.
      const phase = i * 0.137;
      X += Math.sin(time * 0.6 + phase) * 0.045;
      Y += Math.cos(time * 0.5 + phase * 1.3) * 0.045;
      Z += Math.sin(time * 0.7 + phase * 0.7) * 0.045;

      // Mouse repulsion in XY.
      const dx = X - px * 2.5;
      const dy = Y - py * 2.5;
      const dist2 = dx * dx + dy * dy + 0.6;
      const push = 0.18 / dist2;
      X += dx * push;
      Y += dy * push;

      positions[i3] = X;
      positions[i3 + 1] = Y;
      positions[i3 + 2] = Z;
    }

    posAttr.needsUpdate = true;
    points.rotation.y += 0.0012;
    points.rotation.x = Math.sin(time * 0.18) * 0.07;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.042}
        vertexColors
        transparent
        opacity={1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function BackgroundDust() {
  const ref = React.useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const arr = new Float32Array(BG_DUST_COUNT * 3);
    for (let i = 0; i < BG_DUST_COUNT; i++) {
      const r = 3.2 + hash(i + 101) * 4.5;
      const phi = Math.acos(2 * hash(i + 113) - 1);
      const theta = hash(i + 137) * Math.PI * 2;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((rs) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y = rs.clock.elapsedTime * 0.012;
    p.rotation.x = Math.sin(rs.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#7dffff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// Energy arcs: ARC_COUNT line segments between random particle index pairs.
// Each arc lives for ~600ms then picks a new pair.
// react-hooks/immutability flags the canonical r3f per-frame buffer
// mutation pattern; this animation needs to write into TypedArrays inside
// useFrame which is the recognised exception.
/* eslint-disable react-hooks/immutability */
function EnergyArcs() {
  const ref = React.useRef<THREE.LineSegments>(null);
  const buf = React.useMemo(
    () => ({
      positions: new Float32Array(ARC_COUNT * 2 * 3),
      colors: new Float32Array(ARC_COUNT * 2 * 3),
      meta: Array.from({ length: ARC_COUNT }).map((_, i) => ({
        a: 0,
        b: 0,
        bornAt: -i * 0.1,
        life: 0.5 + hash(i + 17) * 0.5,
      })),
    }),
    [],
  );

  useFrame((rs) => {
    const t = rs.clock.elapsedTime;
    const meta = buf.meta;
    for (let i = 0; i < ARC_COUNT; i++) {
      const m = meta[i];
      if (!m) continue;
      if (t - m.bornAt > m.life) {
        m.a = Math.floor(hash(i + Math.floor(t * 31)) * PARTICLE_COUNT);
        m.b = Math.floor(hash(i + 7 + Math.floor(t * 31 + 0.5)) * PARTICLE_COUNT);
        m.bornAt = t;
        m.life = 0.4 + hash(i + Math.floor(t * 17)) * 0.7;
      }
    }
    const arr = buf.positions;
    const carr = buf.colors;
    for (let i = 0; i < ARC_COUNT; i++) {
      const m = meta[i];
      if (!m) continue;
      const fade = 1 - (t - m.bornAt) / m.life;
      const a3 = i * 6;
      const ang1 = (m.a / PARTICLE_COUNT) * Math.PI * 2;
      const ang2 = (m.b / PARTICLE_COUNT) * Math.PI * 2;
      const tilt1 = Math.sin(m.a * 0.137) * 1.4;
      const tilt2 = Math.sin(m.b * 0.137) * 1.4;
      arr[a3 + 0] = Math.cos(ang1) * 1.6;
      arr[a3 + 1] = tilt1;
      arr[a3 + 2] = Math.sin(ang1) * 1.6;
      arr[a3 + 3] = Math.cos(ang2) * 1.6;
      arr[a3 + 4] = tilt2;
      arr[a3 + 5] = Math.sin(ang2) * 1.6;
      const cyan = [0, 0.83, 1] as const;
      carr[a3 + 0] = cyan[0] * fade;
      carr[a3 + 1] = cyan[1] * fade;
      carr[a3 + 2] = cyan[2] * fade;
      carr[a3 + 3] = cyan[0] * fade;
      carr[a3 + 4] = cyan[1] * fade;
      carr[a3 + 5] = cyan[2] * fade;
    }
    const ls = ref.current;
    if (!ls) return;
    const posAttr = ls.geometry.attributes.position as THREE.BufferAttribute | undefined;
    const colAttr = ls.geometry.attributes.color as THREE.BufferAttribute | undefined;
    if (posAttr) posAttr.needsUpdate = true;
    if (colAttr) colAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[buf.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[buf.colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}
/* eslint-enable react-hooks/immutability */

function OrbitalRings() {
  const ringA = React.useRef<THREE.Mesh>(null);
  const ringB = React.useRef<THREE.Mesh>(null);
  const ringC = React.useRef<THREE.Mesh>(null);

  useFrame((rs) => {
    const t = rs.clock.elapsedTime;
    if (ringA.current) ringA.current.rotation.z = t * 0.08;
    if (ringB.current) ringB.current.rotation.z = t * -0.11;
    if (ringC.current) ringC.current.rotation.z = t * 0.14;
  });

  return (
    <group>
      <mesh ref={ringA} rotation={[Math.PI / 2.6, 0.1, 0]}>
        <ringGeometry args={[2.3, 2.34, 128]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.75} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 3, -0.4, 0.2]}>
        <ringGeometry args={[2.65, 2.69, 128]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.65} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringC} rotation={[Math.PI / 2.2, 0.7, -0.3]}>
        <ringGeometry args={[3.05, 3.09, 128]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.5} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function SatelliteOrb({ index }: { index: number }) {
  const ref = React.useRef<THREE.Mesh>(null);
  const radius = 2.4 + hash(index + 7) * 0.6;
  const speed = 0.25 + hash(index + 13) * 0.15;
  const tiltX = hash(index + 19) * Math.PI;
  const tiltZ = hash(index + 23) * Math.PI;
  const offset = hash(index + 29) * Math.PI * 2;
  const color = ['#00d4ff', '#a855f7', '#ec4899'][index % 3] ?? '#00d4ff';

  useFrame((rs) => {
    const t = rs.clock.elapsedTime * speed + offset;
    const m = ref.current;
    if (!m) return;
    const x = Math.cos(t) * radius;
    const y = Math.sin(t * 0.5) * 0.7;
    const z = Math.sin(t) * radius;
    const cx = Math.cos(tiltX), sx = Math.sin(tiltX);
    const cz = Math.cos(tiltZ), sz = Math.sin(tiltZ);
    const x1 = x;
    const y1 = y * cx - z * sx;
    const z1 = y * sx + z * cx;
    const x2 = x1 * cz - y1 * sz;
    const y2 = x1 * sz + y1 * cz;
    m.position.set(x2, y2, z1);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={1} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function SatelliteOrbs() {
  return Array.from({ length: 5 }).map((_, i) => (
    <SatelliteOrb key={i} index={i} />
  ));
}

function InnerCore() {
  const meshRef = React.useRef<THREE.Mesh>(null);
  useFrame((rs) => {
    const m = meshRef.current;
    if (!m) return;
    const t = rs.clock.elapsedTime;
    const s = 0.6 + Math.sin(t * 1.6) * 0.07;
    m.scale.setScalar(s);
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial color="#7dffff" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function PointerTracker({ pointerRef }: { pointerRef: React.RefObject<{ x: number; y: number }> }) {
  const { pointer: tp } = useThree();
  useFrame(() => {
    pointerRef.current = { x: tp.x, y: tp.y };
  });
  return null;
}

// Slow auto-orbit camera — gives the scene cinematic life without
// requiring user input.
function CameraRig() {
  useFrame((rs) => {
    const t = rs.clock.elapsedTime;
    const radius = 5.5 + Math.sin(t * 0.18) * 0.3;
    const yaw = t * 0.08;
    rs.camera.position.x = Math.sin(yaw) * radius;
    rs.camera.position.z = Math.cos(yaw) * radius;
    rs.camera.position.y = Math.sin(t * 0.12) * 0.6;
    rs.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function AiroOrb({ className }: Props) {
  const pointer = React.useRef({ x: 0, y: 0 });

  return (
    <div className={`relative inline-block ${className ?? ''}`}>
      <div
        aria-hidden
        className="absolute inset-[-25%] pulse-halo pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, transparent 38%, rgb(0 150 255 / 0.30) 52%, rgb(168 85 247 / 0.22) 70%, transparent 88%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[-10%] rotate-slow pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0%, rgb(0 212 255 / 0.55) 18%, transparent 36%, rgb(168 85 247 / 0.5) 60%, transparent 78%, rgb(236 72 153 / 0.4) 92%, transparent 100%)',
          borderRadius: '50%',
          maskImage: 'radial-gradient(circle, transparent 56%, black 58%, black 60%, transparent 62%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 56%, black 58%, black 60%, transparent 62%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[-18%] rotate-slow pointer-events-none"
        style={{
          background:
            'conic-gradient(from 90deg, transparent 0%, rgb(255 255 255 / 0.35) 25%, transparent 50%, rgb(168 85 247 / 0.30) 75%, transparent 100%)',
          borderRadius: '50%',
          maskImage: 'radial-gradient(circle, transparent 62%, black 64%, black 65%, transparent 67%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 62%, black 64%, black 65%, transparent 67%)',
          animationDuration: '32s',
          animationDirection: 'reverse',
        }}
      />

      <div className="relative aspect-square w-full" style={{ maxWidth: '640px' }}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <PointerTracker pointerRef={pointer} />
          <CameraRig />
          <InnerCore />
          <Particles pointerRef={pointer} />
          <EnergyArcs />
          <OrbitalRings />
          <SatelliteOrbs />
          <BackgroundDust />
          <EffectComposer>
            <Bloom
              intensity={1.4}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
