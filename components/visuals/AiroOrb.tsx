'use client';
import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * AiroOrb v4 — "Andromeda"
 *
 * A particle swarm that lives. Every particle has its own velocity,
 * its own morph timer, its own colour, and its own size. Physics drive
 * everything:
 *
 *   - spring force pulls each particle towards its current morph target
 *   - friction damps its velocity every frame
 *   - mouse cursor projects a repulsion field into the swarm — particles
 *     get visibly pushed aside as the cursor moves through them, then
 *     spring back when the cursor leaves
 *   - per-particle morph timers (random 3–6 s each) mean the swarm is
 *     ALWAYS in flux — there is never a moment where everyone snaps to
 *     a new shape simultaneously
 *
 * Four target shapes cycle individually per-particle:
 *   galaxy disk → sphere → brain → letter A → loop
 *
 * Every point is rendered with a custom shader as a soft circular glow,
 * never a hard square. Behind it, a single radial glow disc; in front,
 * a radial alpha mask on the canvas so there is no visible rectangle.
 */

type Props = {
  className?: string;
};

const PARTICLE_COUNT = 3200;
const SHAPE_COUNT = 4;
// Beyond this radius (world units) a particle's alpha fully fades to 0.
// Inside FADE_INNER it is fully visible. Between, smoothstep fade. This
// is what kills the visible 'edge' the user reported — particles pushed
// outwards by the cursor fade out smoothly instead of hitting a mask.
const FADE_INNER = 1.7;
const FADE_OUTER = 2.7;

function hash(i: number): number {
  const s = Math.sin(i * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

// === Shape factories — each writes [x,y,z] triples for PARTICLE_COUNT ===

// Galaxy / Andromeda disk — Fibonacci-arm spiral with thin Z disk.
function makeGalaxy(): Float32Array {
  const out = new Float32Array(PARTICLE_COUNT * 3);
  const arms = 3;
  const armSpread = 0.42;
  const maxR = 1.85;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Radius pulled with bias toward outer arms (sqrt for area-uniform).
    const rNorm = Math.sqrt(hash(i + 11));
    const r = rNorm * maxR;
    const arm = Math.floor(hash(i + 19) * arms);
    const armAngle = (arm / arms) * Math.PI * 2;
    // Spiral winds tighter as radius grows.
    const spiral = r * 2.4;
    const angle = armAngle + spiral + (hash(i + 23) - 0.5) * armSpread;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    // Disk thickness — denser core, thinner outer.
    const thickness = (1 - rNorm * 0.7) * 0.32;
    const y = (hash(i + 37) - 0.5) * thickness;
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}

function makeSphere(): Float32Array {
  const out = new Float32Array(PARTICLE_COUNT * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  const r = 1.4;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = phi * i;
    out[i * 3] = Math.cos(theta) * rad * r;
    out[i * 3 + 1] = y * r;
    out[i * 3 + 2] = Math.sin(theta) * rad * r;
  }
  return out;
}

function makeBrain(): Float32Array {
  const out = new Float32Array(PARTICLE_COUNT * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  const baseR = 1.55;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const bumps =
      Math.sin(theta * 6) * 0.20 +
      Math.cos(y * 9) * 0.16 +
      Math.sin(theta * 3 + y * 4) * 0.12;
    const rr = baseR + bumps;
    out[i * 3] = Math.cos(theta) * rad * rr;
    out[i * 3 + 1] = y * rr;
    out[i * 3 + 2] = Math.sin(theta) * rad * rr;
  }
  return out;
}

function makeLetterA(): Float32Array {
  const out = new Float32Array(PARTICLE_COUNT * 3);
  const scale = 1.7;
  const apex: [number, number] = [0, 1];
  const bl: [number, number] = [-0.7, -1];
  const br: [number, number] = [0.7, -1];
  const crossY = -0.2;
  const crossLT: [number, number] = [
    bl[0] + (apex[0] - bl[0]) * ((crossY - bl[1]) / (apex[1] - bl[1])),
    crossY,
  ];
  const crossRT: [number, number] = [
    br[0] + (apex[0] - br[0]) * ((crossY - br[1]) / (apex[1] - br[1])),
    crossY,
  ];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = hash(i);
    let px = 0, py = 0;
    if (p < 0.4) {
      const t = hash(i + 17);
      px = apex[0] + (bl[0] - apex[0]) * t;
      py = apex[1] + (bl[1] - apex[1]) * t;
    } else if (p < 0.8) {
      const t = hash(i + 29);
      px = apex[0] + (br[0] - apex[0]) * t;
      py = apex[1] + (br[1] - apex[1]) * t;
    } else {
      const t = hash(i + 41);
      px = crossLT[0] + (crossRT[0] - crossLT[0]) * t;
      py = crossY;
    }
    out[i * 3] = (px + (hash(i + 53) - 0.5) * 0.07) * scale;
    out[i * 3 + 1] = (py + (hash(i + 67) - 0.5) * 0.07) * scale;
    out[i * 3 + 2] = (hash(i + 71) - 0.5) * 0.38;
  }
  return out;
}

function makeColors(): Float32Array {
  // Disciplined palette — overwhelmingly cyan/teal with quiet violet
  // accents. Drops the pink. Reads as one coherent material rather
  // than a rainbow swarm.
  const out = new Float32Array(PARTICLE_COUNT * 3);
  const palette: Array<[number, number, number]> = [
    [0.0, 0.83, 1.0],   // cyan
    [0.49, 1.0, 1.0],   // ice cyan
    [0.42, 0.78, 1.0],  // pale azure
    [0.66, 0.45, 0.95], // soft violet
    [1.0, 1.0, 1.0],    // white sparkle
  ];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = hash(i + 5);
    const idx =
      r < 0.50 ? 0 :
      r < 0.78 ? 1 :
      r < 0.92 ? 2 :
      r < 0.98 ? 3 : 4;
    const c = palette[idx] ?? palette[0]!;
    out[i * 3] = c[0];
    out[i * 3 + 1] = c[1];
    out[i * 3 + 2] = c[2];
  }
  return out;
}

function makeSizes(): Float32Array {
  const out = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = hash(i + 79);
    // Bias toward fine dust; only the rarest particles get to be bright
    // stars. Smaller average → looks like a sophisticated nebula rather
    // than a chaotic cloud of marbles.
    out[i] = 0.5 + Math.pow(r, 4) * 1.7;
  }
  return out;
}

const VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uPixelRatio;
  uniform float uBaseSize;
  varying vec3 vColor;
  varying float vDistFade;
  uniform float uFadeInner;
  uniform float uFadeOuter;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uBaseSize * uPixelRatio * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    vColor = aColor;
    // Smooth alpha fade beyond uFadeInner; fully gone past uFadeOuter.
    // This is what gives the swarm a soft 'fog of war' silhouette so
    // when the cursor pushes a particle outward it dissolves naturally
    // instead of clipping against a mask.
    float d = length(position);
    vDistFade = 1.0 - smoothstep(uFadeInner, uFadeOuter, d);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vDistFade;
  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float r2 = dot(d, d);
    if (r2 > 0.25) discard;
    // Soft radial glow — bright tight core, soft halo out to the edge.
    float core = exp(-r2 * 14.0);
    float halo = exp(-r2 * 4.0);
    float a = (core + halo * 0.42) * vDistFade;
    gl_FragColor = vec4(vColor, a);
  }
`;

/* eslint-disable react-hooks/immutability */
function Swarm() {
  const ref = React.useRef<THREE.Points>(null);
  const matRef = React.useRef<THREE.ShaderMaterial>(null);
  const { camera, size, pointer } = useThree();

  const data = React.useMemo(() => {
    const shapes = [
      makeGalaxy(),
      makeSphere(),
      makeBrain(),
      makeLetterA(),
    ];
    const positions = new Float32Array(shapes[0]!);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = makeColors();
    const sizes = makeSizes();
    const fromIdx = new Uint8Array(PARTICLE_COUNT);
    const toIdx = new Uint8Array(PARTICLE_COUNT);
    const morphT = new Float32Array(PARTICLE_COUNT);
    const morphSpeed = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Each particle starts in the middle of a random morph already so
      // the swarm boots in a flowing state instead of a perfect galaxy.
      const start = Math.floor(hash(i + 101) * SHAPE_COUNT);
      const next = (start + 1) % SHAPE_COUNT;
      fromIdx[i] = start;
      toIdx[i] = next;
      morphT[i] = hash(i + 113);
      // 6–12 s per morph — calm, meditative pace. Each particle's own.
      morphSpeed[i] = 1 / (6 + hash(i + 127) * 6);
    }
    return {
      shapes,
      positions,
      velocities,
      colors,
      sizes,
      fromIdx,
      toIdx,
      morphT,
      morphSpeed,
    };
  }, []);

  const uniforms = React.useMemo(
    () => ({
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
      uBaseSize: { value: 56 },
      uFadeInner: { value: FADE_INNER },
      uFadeOuter: { value: FADE_OUTER },
    }),
    [],
  );

  // Reused vectors to avoid per-frame allocation.
  const raycaster = React.useMemo(() => new THREE.Raycaster(), []);
  const cursorPlane = React.useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const cursor3D = React.useMemo(() => new THREE.Vector3(), []);
  const cursorHas = React.useRef(false);

  React.useEffect(() => {
    const onLeave = () => { cursorHas.current = false; };
    const onMove = () => { cursorHas.current = true; };
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  useFrame((rs, deltaIn) => {
    const points = ref.current;
    if (!points) return;
    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (!posAttr) return;
    const positions = posAttr.array as Float32Array;

    // Clamp delta — if user tab-switched the dt can spike huge.
    const dt = Math.min(deltaIn, 1 / 30);

    // Project pointer into the swarm's plane.
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.ray.intersectPlane(cursorPlane, cursor3D);

    // Tunable physics — calmer, more honeyed than v4.
    const SPRING = 3.2;      // softer pull toward morph target
    const FRICTION = 0.90;   // longer hang time, smoother recovery
    const REPEL_R = 0.85;    // gentle influence radius
    const REPEL_R2 = REPEL_R * REPEL_R;
    const REPEL_STR = 6.5;   // softer push, swarm parts gracefully

    const frictionFrame = Math.pow(FRICTION, dt * 60);

    const shapes = data.shapes;
    const velocities = data.velocities;
    const fromIdx = data.fromIdx;
    const toIdx = data.toIdx;
    const morphT = data.morphT;
    const morphSpeed = data.morphSpeed;

    const cursorActive = hit !== null && cursorHas.current;
    const cx = cursorActive ? cursor3D.x : 0;
    const cy = cursorActive ? cursor3D.y : 0;
    const cz = cursorActive ? cursor3D.z : 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Advance per-particle morph progress and loop shape sequence.
      let mt = morphT[i]!;
      mt += morphSpeed[i]! * dt;
      while (mt >= 1) {
        mt -= 1;
        fromIdx[i] = toIdx[i]!;
        toIdx[i] = (toIdx[i]! + 1) % SHAPE_COUNT;
        // Re-roll morph speed each cycle for organic variation.
        morphSpeed[i] = 1 / (6 + hash(i + 131 + Math.floor(rs.clock.elapsedTime * 13)) * 6);
      }
      morphT[i] = mt;

      const e = mt;
      const tEase = e * e * (3 - 2 * e);
      const from = shapes[fromIdx[i]!]!;
      const to = shapes[toIdx[i]!]!;
      const fx = from[i3]!;
      const fy = from[i3 + 1]!;
      const fz = from[i3 + 2]!;
      const tx = fx + (to[i3]! - fx) * tEase;
      const ty = fy + (to[i3 + 1]! - fy) * tEase;
      const tz = fz + (to[i3 + 2]! - fz) * tEase;

      const px = positions[i3]!;
      const py = positions[i3 + 1]!;
      const pz = positions[i3 + 2]!;

      // Spring toward target.
      let vx = velocities[i3]! + (tx - px) * SPRING * dt;
      let vy = velocities[i3 + 1]! + (ty - py) * SPRING * dt;
      let vz = velocities[i3 + 2]! + (tz - pz) * SPRING * dt;

      // Mouse repulsion in 3D.
      if (cursorActive) {
        const dx = px - cx;
        const dy = py - cy;
        const dz = pz - cz;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < REPEL_R2 && d2 > 1e-6) {
          const d = Math.sqrt(d2);
          const fall = 1 - d / REPEL_R; // 1 at centre, 0 at edge
          const k = (fall * fall * REPEL_STR) / d;
          vx += dx * k * dt * 60;
          vy += dy * k * dt * 60;
          vz += dz * k * dt * 60;
        }
      }

      // Friction (damping).
      vx *= frictionFrame;
      vy *= frictionFrame;
      vz *= frictionFrame;

      // Integrate.
      positions[i3] = px + vx * dt;
      positions[i3 + 1] = py + vy * dt;
      positions[i3 + 2] = pz + vz * dt;

      velocities[i3] = vx;
      velocities[i3 + 1] = vy;
      velocities[i3 + 2] = vz;
    }

    posAttr.needsUpdate = true;

    // Very slow whole-swarm drift — sub-1-rpm.
    points.rotation.y += dt * 0.03;
    points.rotation.x = Math.sin(rs.clock.elapsedTime * 0.12) * 0.06;

    // Keep pixel ratio + size in sync with window resizes.
    uniforms.uPixelRatio.value = Math.min(rs.gl.getPixelRatio(), 2);
    uniforms.uBaseSize.value = Math.max(40, Math.min(size.height, size.width) * 0.105);
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
/* eslint-enable react-hooks/immutability */

export function AiroOrb({ className }: Props) {
  return (
    <div className={`relative ${className ?? ''}`}>
      <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
        {/* Soft glow disc behind the swarm — sets the atmosphere. */}
        <div
          aria-hidden
          className="absolute inset-[-12%] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(0,170,255,0.22) 0%, rgba(120,90,220,0.12) 38%, transparent 72%)',
            filter: 'blur(42px)',
            borderRadius: '50%',
          }}
        />

        {/*
          No mask on the canvas wrapper any more — the soft fade in the
          shader (smoothstep from FADE_INNER to FADE_OUTER) handles the
          silhouette so particles never clip against a visible edge.
          The empty corners of the WebGL canvas are simply transparent.
        */}
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 4.4], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <Swarm />
        </Canvas>
      </div>
    </div>
  );
}
