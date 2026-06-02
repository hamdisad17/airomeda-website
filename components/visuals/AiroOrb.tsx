'use client';
import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * AiroOrb — a Three.js particle entity that morphs between four shapes
 * (sphere → AI brain mesh → cube grid → giant "A") then loops. Every
 * particle drifts continuously via simplex-ish noise, so the surface
 * never feels static. Inner emissive core, four 3D orbital rings, a
 * scatter of background dust, and animated energy arcs jumping between
 * random particles complete the scene.
 *
 * Designed to read as the brand's neural engine, not a generic Earth.
 */

type Props = {
  className?: string;
};

const PARTICLE_COUNT = 2800;
const BG_DUST_COUNT = 600;
const ARC_COUNT = 5;

// Pseudo-random utility — deterministic per index so the layouts are
// stable across re-renders and SSR has nothing to disagree about.
function hash(i: number): number {
  const s = Math.sin(i * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

// === SHAPE FACTORIES — each returns Float32Array of [x,y,z] triples ===

// Sphere via fibonacci spiral — even coverage.
function makeSphere(count: number, radius = 1.5): Float32Array {
  const arr = new Float32Array(count * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    arr[i * 3] = Math.cos(theta) * r * radius;
    arr[i * 3 + 1] = y * radius;
    arr[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return arr;
}

// Brain-like double-helix node cloud — irregular bumpy sphere via
// multiplicative noise (a low-rent neural mesh).
function makeBrain(count: number, radius = 1.6): Float32Array {
  const arr = new Float32Array(count * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    // Bumpy modulation — simulates gyri/sulci of a brain.
    const bumps =
      Math.sin(theta * 6) * 0.18 +
      Math.cos(y * 9) * 0.15 +
      Math.sin(theta * 3 + y * 4) * 0.12;
    const rr = radius + bumps;
    arr[i * 3] = Math.cos(theta) * r * rr;
    arr[i * 3 + 1] = y * rr;
    arr[i * 3 + 2] = Math.sin(theta) * r * rr;
  }
  return arr;
}

// Cube grid — points on the surface of a cube of half-side s.
function makeCube(count: number, s = 1.4): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const face = Math.floor(hash(i + 11) * 6);
    const u = (hash(i + 23) - 0.5) * 2 * s;
    const v = (hash(i + 37) - 0.5) * 2 * s;
    let x = 0, y = 0, z = 0;
    if (face === 0) { x = s; y = u; z = v; }
    else if (face === 1) { x = -s; y = u; z = v; }
    else if (face === 2) { x = u; y = s; z = v; }
    else if (face === 3) { x = u; y = -s; z = v; }
    else if (face === 4) { x = u; y = v; z = s; }
    else { x = u; y = v; z = -s; }
    arr[i * 3] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;
  }
  return arr;
}

// "A" letter shaped point cloud. The letter is built as 3 line segments:
// left leg, right leg, crossbar. Particles get scattered along these
// segments with a tiny perpendicular jitter.
function makeLetterA(count: number, scale = 1.8): Float32Array {
  const arr = new Float32Array(count * 3);
  // Vertices in normalized space — apex (top), bottom-left, bottom-right.
  const apex: [number, number] = [0, 1];
  const bl: [number, number] = [-0.7, -1];
  const br: [number, number] = [0.7, -1];
  // Crossbar 35% from bottom.
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
      // Left leg apex → bl
      const t = hash(i + 17);
      return [apex[0] + (bl[0] - apex[0]) * t, apex[1] + (bl[1] - apex[1]) * t];
    } else if (p < 0.8) {
      // Right leg apex → br
      const t = hash(i + 29);
      return [apex[0] + (br[0] - apex[0]) * t, apex[1] + (br[1] - apex[1]) * t];
    } else {
      // Crossbar
      const t = hash(i + 41);
      return [crossLT[0] + (crossRT[0] - crossLT[0]) * t, crossLT[1] + (crossRT[1] - crossLT[1]) * t];
    }
  };

  for (let i = 0; i < count; i++) {
    const [px, py] = seg(i);
    // Thickness jitter perpendicular to the letter plane + a tiny z spread.
    const jitterX = (hash(i + 53) - 0.5) * 0.08;
    const jitterY = (hash(i + 67) - 0.5) * 0.08;
    const jitterZ = (hash(i + 71) - 0.5) * 0.3;
    arr[i * 3] = (px + jitterX) * scale;
    arr[i * 3 + 1] = (py + jitterY) * scale;
    arr[i * 3 + 2] = jitterZ;
  }
  return arr;
}

// Per-particle color: cyan dominant, with sprinkles of violet and pink
// chosen via deterministic hash so the palette is brand-consistent.
function makeColors(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  const palette = [
    [0.0, 0.83, 1.0],   // cyan
    [0.49, 1.0, 1.0],   // ice cyan
    [0.66, 0.33, 0.97], // violet
    [0.93, 0.28, 0.6],  // pink
    [1.0, 1.0, 1.0],    // white sparkle
  ];
  for (let i = 0; i < count; i++) {
    const r = hash(i + 5);
    const idx =
      r < 0.55 ? 0 :
      r < 0.78 ? 1 :
      r < 0.92 ? 2 :
      r < 0.98 ? 3 : 4;
    const c = palette[idx] ?? palette[0]!;
    arr[i * 3] = c[0] ?? 0;
    arr[i * 3 + 1] = c[1] ?? 0;
    arr[i * 3 + 2] = c[2] ?? 0;
  }
  return arr;
}

const SHAPE_SEQUENCE = ['sphere', 'brain', 'cube', 'letterA'] as const;
type ShapeKey = typeof SHAPE_SEQUENCE[number];

function Particles({ pointerRef }: { pointerRef: React.RefObject<{ x: number; y: number }> }) {
  const ref = React.useRef<THREE.Points>(null);

  const { positionsRef, colorsRef, shapesRef } = React.useMemo(() => {
    const shapes: Record<ShapeKey, Float32Array> = {
      sphere: makeSphere(PARTICLE_COUNT),
      brain: makeBrain(PARTICLE_COUNT),
      cube: makeCube(PARTICLE_COUNT),
      letterA: makeLetterA(PARTICLE_COUNT),
    };
    const positions = new Float32Array(shapes.sphere);
    const colors = makeColors(PARTICLE_COUNT);
    return {
      positionsRef: positions,
      colorsRef: colors,
      shapesRef: shapes,
    };
  }, []);

  // Time bookkeeping for shape interpolation.
  const start = React.useRef({ shape: 0, holdUntil: 0, morphUntil: 0, fromShape: 0 });
  const initialised = React.useRef(false);

  useFrame((state) => {
    const points = ref.current;
    if (!points) return;
    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (!posAttr) return;
    const positions = posAttr.array as Float32Array;
    const time = state.clock.elapsedTime;

    if (!initialised.current) {
      start.current.holdUntil = time + 4;
      start.current.morphUntil = time;
      initialised.current = true;
    }

    // Drive the morph state machine: hold a shape 4s, morph 1.8s, hold, ...
    let morphT = 1;
    if (time < start.current.holdUntil) {
      morphT = 1;
    } else if (time < start.current.holdUntil + 1.8) {
      morphT = (time - start.current.holdUntil) / 1.8;
    } else {
      // Transition done — advance shape.
      start.current.fromShape = start.current.shape;
      start.current.shape = (start.current.shape + 1) % SHAPE_SEQUENCE.length;
      start.current.holdUntil = time + 4;
      morphT = 1;
    }

    const fromKey = SHAPE_SEQUENCE[start.current.fromShape] ?? 'sphere';
    const toKey = SHAPE_SEQUENCE[start.current.shape] ?? 'sphere';
    const from = shapesRef[fromKey];
    const to = shapesRef[toKey];
    const e = morphT;
    // Smoothstep for cleaner ease.
    const tEase = e * e * (3 - 2 * e);

    const pointerX = pointerRef.current?.x ?? 0;
    const pointerY = pointerRef.current?.y ?? 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Interpolated target.
      const tx = (from?.[i3] ?? 0) + ((to?.[i3] ?? 0) - (from?.[i3] ?? 0)) * tEase;
      const ty = (from?.[i3 + 1] ?? 0) + ((to?.[i3 + 1] ?? 0) - (from?.[i3 + 1] ?? 0)) * tEase;
      const tz = (from?.[i3 + 2] ?? 0) + ((to?.[i3 + 2] ?? 0) - (from?.[i3 + 2] ?? 0)) * tEase;
      // Per-particle phase for organic drift.
      const phase = i * 0.137;
      const nx = Math.sin(time * 0.6 + phase) * 0.04;
      const ny = Math.cos(time * 0.5 + phase * 1.3) * 0.04;
      const nz = Math.sin(time * 0.7 + phase * 0.7) * 0.04;
      // Mouse repulsion: shift particles away from pointer in XY plane.
      const dx = tx - pointerX * 2;
      const dy = ty - pointerY * 2;
      const dist2 = dx * dx + dy * dy + 0.4;
      const push = 0.25 / dist2;
      positions[i3] = tx + nx + dx * push;
      positions[i3 + 1] = ty + ny + dy * push;
      positions[i3 + 2] = tz + nz;
    }

    posAttr.needsUpdate = true;
    points.rotation.y += 0.0015;
    points.rotation.x = Math.sin(time * 0.2) * 0.08;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionsRef, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colorsRef, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.95}
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
      const r = 3 + hash(i + 101) * 4;
      const phi = Math.acos(2 * hash(i + 113) - 1);
      const theta = hash(i + 137) * Math.PI * 2;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y = state.clock.elapsedTime * 0.012;
    p.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#7dffff"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitalRings() {
  const ringA = React.useRef<THREE.Mesh>(null);
  const ringB = React.useRef<THREE.Mesh>(null);
  const ringC = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringA.current) ringA.current.rotation.z = t * 0.08;
    if (ringB.current) ringB.current.rotation.z = t * -0.11;
    if (ringC.current) ringC.current.rotation.z = t * 0.14;
  });

  return (
    <group>
      <mesh ref={ringA} rotation={[Math.PI / 2.6, 0.1, 0]}>
        <ringGeometry args={[2.3, 2.34, 128]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 3, -0.4, 0.2]}>
        <ringGeometry args={[2.6, 2.64, 128]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={ringC} rotation={[Math.PI / 2.2, 0.7, -0.3]}>
        <ringGeometry args={[3.0, 3.04, 128]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function InnerCore() {
  const meshRef = React.useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const m = meshRef.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const s = 0.55 + Math.sin(t * 2) * 0.06;
    m.scale.setScalar(s);
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial
        color="#7dffff"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
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

function SatelliteOrbs() {
  return Array.from({ length: ARC_COUNT }).map((_, i) => (
    <SatelliteOrb key={i} index={i} />
  ));
}

function SatelliteOrb({ index }: { index: number }) {
  const ref = React.useRef<THREE.Mesh>(null);
  const radius = 2.4 + hash(index + 7) * 0.6;
  const speed = 0.25 + hash(index + 13) * 0.15;
  const tiltX = hash(index + 19) * Math.PI;
  const tiltZ = hash(index + 23) * Math.PI;
  const offset = hash(index + 29) * Math.PI * 2;
  const colorIdx = index % 3;
  const color = ['#00d4ff', '#a855f7', '#ec4899'][colorIdx] ?? '#00d4ff';

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    const m = ref.current;
    if (!m) return;
    const x = Math.cos(t) * radius;
    const y = Math.sin(t * 0.5) * 0.6;
    const z = Math.sin(t) * radius;
    // Apply orbital tilt as a quaternion-ish rotation around X then Z.
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
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={1} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

export function AiroOrb({ className }: Props) {
  const pointer = React.useRef({ x: 0, y: 0 });

  return (
    <div className={`relative inline-block ${className ?? ''}`}>
      {/* outer pulsing brand halo behind canvas */}
      <div
        aria-hidden
        className="absolute inset-[-25%] pulse-halo pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, transparent 38%, rgb(0 150 255 / 0.32) 52%, rgb(168 85 247 / 0.22) 70%, transparent 88%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
        }}
      />
      {/* slow conic halos around the scene */}
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

      <div className="relative aspect-square w-full" style={{ maxWidth: '600px' }}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <PointerTracker pointerRef={pointer} />
          <InnerCore />
          <Particles pointerRef={pointer} />
          <OrbitalRings />
          <SatelliteOrbs />
          <BackgroundDust />
        </Canvas>
      </div>
    </div>
  );
}
