import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../../store/useStore';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export const ForestWorld = () => {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const characterRef = useRef<THREE.Group>(null);

  // Procedural Digital Forest (Instanced glowing pillars/trees)
  const treeCount = 500;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 1000;
  const particles = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = Math.random() * 20;
      pos[i * 3 + 2] = -20 - Math.random() * 80;
    }
    return pos;
  }, [particleCount]);

  useEffect(() => {
    if (!instancedMeshRef.current) return;
    for (let i = 0; i < treeCount; i++) {
      const x = (Math.random() - 0.5) * 100;
      const z = -20 - (Math.random() * 80); // Spread across the z-axis where the camera travels
      
      // Clear a path in the middle
      if (Math.abs(x) < 5) continue;

      const height = 2 + Math.random() * 10;
      dummy.position.set(x, height / 2 - 2, z);
      dummy.scale.set(0.5 + Math.random(), height, 0.5 + Math.random());
      
      // Random rotation
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.rotation.z = (Math.random() - 0.5) * 0.2;
      
      dummy.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
      
      // Colors (greenish/cyan)
      const c = new THREE.Color();
      c.setHSL(0.3 + Math.random() * 0.2, 0.8, 0.4);
      instancedMeshRef.current.setColorAt(i, c);
    }
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current.instanceColor) {
      instancedMeshRef.current.instanceColor.needsUpdate = true;
    }
  }, [dummy, treeCount]);

  useFrame((state) => {
    // Fade in text as we enter forest (progress ~0.25 to 0.4)
    if (textRef.current) {
      const opacity = Math.min(Math.max((scrollProgress - 0.25) * 5, 0), 1) - Math.max((scrollProgress - 0.45) * 5, 0);
      textRef.current.children.forEach((child) => {
        if ((child as THREE.Mesh).material) {
          ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = opacity;
        }
      });
    }

    // Animate character
    if (characterRef.current) {
      // Basic floating/breathing animation for the abstract character
      characterRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      
      // Make character "walk" as we approach it (scrollProgress > 0.4)
      if (scrollProgress > 0.4) {
        characterRef.current.position.z = -50 - ((scrollProgress - 0.4) * 50);
      } else {
        characterRef.current.position.z = -50;
      }
    }

    // Animate ambient particles
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Terrain Floor */}
      <mesh position={[0, -2, -120]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200, 32, 32]} />
        <meshStandardMaterial color="#011105" roughness={0.8} wireframe={scrollProgress > 0.6} />
      </mesh>

      {/* Trees / Pillars */}
      <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, treeCount]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.2} metalness={0.8} />
      </instancedMesh>

      {/* Ambient Forest Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#00ffcc" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </points>

      {/* Text Reveal */}
      <group ref={textRef} position={[0, 5, -35]}>
        <Text fontSize={3} color="#ffffff">
          WORLD BUILDING
          <meshBasicMaterial attach="material" transparent opacity={0} />
        </Text>
        <Text position={[0, -2, 0]} fontSize={1} color="#aaaaaa">
          I don't just write code.
          <meshBasicMaterial attach="material" transparent opacity={0} />
        </Text>
        <Text position={[0, -3.5, 0]} fontSize={1} color="#aaaaaa">
          I build worlds people can explore.
          <meshBasicMaterial attach="material" transparent opacity={0} />
        </Text>
      </group>

      {/* Abstract Character Reveal */}
      <group ref={characterRef} position={[0, 0, -50]}>
        {/* Glowing aura */}
        <pointLight color="#00ffcc" intensity={2} distance={10} />
        
        {/* Core body */}
        <mesh position={[0, 1, 0]}>
          <capsuleGeometry args={[0.4, 1, 4, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#00ffcc" emissiveIntensity={0.5} wireframe />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        </mesh>
      </group>
    </group>
  );
};
