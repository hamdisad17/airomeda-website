'use client';
import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * AiroOrb v3 — a single iridescent shader sphere. Deliberately
 * restrained: no particles, rings, satellites, arcs or bloom chaos.
 * One elegant entity, slow organic motion, generous negative space —
 * the same restraint OpenAI / Anthropic / Stripe use on their landing
 * pages.
 *
 * The surface is displaced by a tri-wave noise field, lit by a custom
 * fresnel + iridescence fragment shader, and faded into the cosmic bg
 * via a radial alpha mask on the canvas wrapper so there's never a
 * visible rectangle.
 */

type Props = {
  className?: string;
};

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vDisp;

  // Cheap organic noise — three layered sine/cosine waves. Avoids the
  // 80-line simplex implementation while still giving believable
  // organic motion.
  float wave(vec3 p, float t) {
    return sin(p.x * 1.6 + t * 0.6) * cos(p.y * 1.4 + t * 0.5) * 0.55
         + cos(p.x * 2.4 - t * 0.4) * sin(p.z * 1.8 + t * 0.7) * 0.30
         + sin(p.y * 3.0 + t * 0.3) * cos(p.z * 2.6 - t * 0.5) * 0.18;
  }

  void main() {
    vec3 pos = position;
    float low  = wave(pos * 1.00, uTime * 0.30) * 0.20;
    float high = wave(pos * 2.80, -uTime * 0.20) * 0.05;
    float disp = low + high;
    pos += normal * disp;

    vNormal   = normalize(normalMatrix * normal);
    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    vDisp     = disp;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec3  uCameraPos;
  uniform vec3  uColorA; // deep cyan (core)
  uniform vec3  uColorB; // violet (mid)
  uniform vec3  uColorC; // pink (rim)

  varying vec3  vNormal;
  varying vec3  vWorldPos;
  varying float vDisp;

  void main() {
    vec3 viewDir = normalize(uCameraPos - vWorldPos);
    float ndotv  = max(0.0, dot(viewDir, vNormal));

    // Fresnel — bright on grazing angles, soft at facing.
    float fresnel = pow(1.0 - ndotv, 1.8);

    // Iridescent core color — modulated by world Y + surface displacement
    // so the color flow follows the breathing surface.
    float mixT = 0.5 + 0.5 * sin(uTime * 0.32 + vWorldPos.y * 2.4 + vDisp * 6.0);
    vec3 base = mix(uColorA, uColorB, mixT);

    // Pink rim via fresnel.
    base = mix(base, uColorC, fresnel * 0.75);

    // Subtle key-light shading from a notional studio position so the
    // sphere has volumetric form, not flat material.
    float key = pow(max(0.0, dot(vNormal, normalize(vec3(0.35, 0.55, 1.0)))), 1.1);
    base += vec3(0.07, 0.16, 0.30) * key * 0.55;

    // Bright peaks where the surface bulges outward — fakes specular
    // hot-spots that bloom would otherwise add.
    base += vec3(0.45, 0.78, 1.10) * smoothstep(0.08, 0.22, vDisp) * 0.55;

    // Soft inner glow towards center (deeper darks near silhouette edges
    // get lifted just slightly so the orb never goes flat-black).
    base += vec3(0.04, 0.10, 0.20) * (1.0 - fresnel) * 0.4;

    gl_FragColor = vec4(base, 0.97);
  }
`;

// react-hooks/immutability conflicts with r3f's per-frame uniform
// mutation pattern; disable for this function.
/* eslint-disable react-hooks/immutability */
function OrbMesh() {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const matRef = React.useRef<THREE.ShaderMaterial>(null);
  const { camera } = useThree();

  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uCameraPos: { value: new THREE.Vector3() },
      uColorA: { value: new THREE.Color('#00b8e6') }, // deep cyan
      uColorB: { value: new THREE.Color('#9046e8') }, // violet
      uColorC: { value: new THREE.Color('#ec4899') }, // pink
    }),
    [],
  );

  useFrame((rs) => {
    const m = meshRef.current;
    if (!m) return;
    const t = rs.clock.elapsedTime;
    uniforms.uTime.value = t;
    uniforms.uCameraPos.value.copy(camera.position);
    // Slow, sub-1-rpm rotation — meditative, never distracting.
    m.rotation.y = t * 0.11;
    m.rotation.x = Math.sin(t * 0.13) * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.35, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

/* eslint-enable react-hooks/immutability */

// A second, larger transparent sphere that adds a soft inner volumetric
// glow surrounding the orb. Single mesh, additive blending.
function InnerGlow() {
  const meshRef = React.useRef<THREE.Mesh>(null);
  useFrame((rs) => {
    const m = meshRef.current;
    if (!m) return;
    const t = rs.clock.elapsedTime;
    m.scale.setScalar(1.78 + Math.sin(t * 0.6) * 0.04);
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color="#0f8fff"
        transparent
        opacity={0.05}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function AiroOrb({ className }: Props) {
  return (
    <div className={`relative ${className ?? ''}`}>
      <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
        {/* Soft glow disc behind the orb — radial fade so the sphere
            seats into the cosmic bg without a hard edge. */}
        <div
          aria-hidden
          className="absolute inset-[-12%] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(0,170,255,0.40) 0%, rgba(144,70,232,0.22) 28%, rgba(236,72,153,0.08) 50%, transparent 72%)',
            filter: 'blur(38px)',
            borderRadius: '50%',
          }}
        />

        {/* Canvas wrapper with radial alpha mask — kills the visible
            rectangular boundary of the WebGL canvas. */}
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              'radial-gradient(circle at 50% 50%, black 58%, transparent 95%)',
            WebkitMaskImage:
              'radial-gradient(circle at 50% 50%, black 58%, transparent 95%)',
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: false,
            }}
            dpr={[1, 2]}
            style={{ background: 'transparent' }}
          >
            <InnerGlow />
            <OrbMesh />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
