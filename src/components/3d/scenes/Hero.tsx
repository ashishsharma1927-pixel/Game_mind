import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../../store/useStore';
import * as THREE from 'three';
import { Html, useTexture } from '@react-three/drei';

function LogoBox() {
  const logoTexture = useTexture('/logo.jpg');
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += delta * 0.4;
      boxRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <mesh ref={boxRef} position={[0, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      {/* Apply the texture to all 6 sides, make it emissive so it glows */}
      <meshStandardMaterial 
        map={logoTexture} 
        emissiveMap={logoTexture}
        emissive={new THREE.Color('#ffffff')}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

export const Hero = () => {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 2000;

  // Keep original positions intact
  const { basePositions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const color = new THREE.Color();
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1 + (Math.random() * 0.2);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      color.setHSL(0.5 + Math.random() * 0.1, 1.0, 0.5);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { basePositions: pos, colors: col };
  }, []);

  const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x += delta * 0.2;

      // Deterministic particle shattering based on scroll
      if (particlesRef.current) {
        const breakProgress = Math.max(0, Math.min((scrollProgress - 0.1) * 5, 1));
        const currentPositions = particlesRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          // Seed a random blast direction based on the index
          const blastX = Math.sin(i * 13.5) * 50;
          const blastY = Math.cos(i * 21.1) * 50;
          const blastZ = Math.sin(i * 3.3) * 50 + 50; // Bias towards camera

          currentPositions[idx] = THREE.MathUtils.lerp(basePositions[idx], basePositions[idx] + blastX, breakProgress);
          currentPositions[idx + 1] = THREE.MathUtils.lerp(basePositions[idx + 1], basePositions[idx + 1] + blastY, breakProgress);
          currentPositions[idx + 2] = THREE.MathUtils.lerp(basePositions[idx + 2], basePositions[idx + 2] + blastZ, breakProgress);
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  const textOpacity = Math.max(1 - (scrollProgress * 5), 0);

  return (
    <group position={[0, 0, 0]}>
      {/* HTML Overlay "I CREATE WORLDS." */}
      <Html position={[0, -2.5, 0]} transform distanceFactor={10} zIndexRange={[100, 0]}>
        <div style={{
          opacity: textOpacity,
          transition: 'opacity 0.1s',
          color: '#ffffff',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '4rem',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          textShadow: '0 0 10px rgba(0, 255, 204, 0.5), 2px 0 0 rgba(255, 0, 51, 0.5)',
          letterSpacing: '5px',
          pointerEvents: 'none'
        }}>
          I CREATE WORLDS.
        </div>
      </Html>

      {/* The new glowing 3D logo box */}
      <LogoBox />

      {/* The Core / Abstract Controller */}
      <group ref={groupRef}>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            vertexColors
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
};
