import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../../store/useStore';
import * as THREE from 'three';
import { Text, Html } from '@react-three/drei';

export const ProjectsWorld = () => {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const groupRef = useRef<THREE.Group>(null);

  // Rotating holographic rings
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const characterRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 0.2;
    if (ring2Ref.current) ring2Ref.current.rotation.y += delta * 0.3;
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 0.4;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }

    // Code-to-Reality jump logic
    if (characterRef.current) {
      // Jump happens between scrollProgress 0.65 and 0.75
      const jumpProgress = Math.max(0, Math.min(1, (scrollProgress - 0.65) * 10));
      // Parabola equation for jump
      const jumpY = Math.sin(jumpProgress * Math.PI) * 3;
      characterRef.current.position.y = -1 + jumpY;
    }
  });

  // Calculate opacity based on scroll (active between ~0.4 and 0.8)
  const isVisible = scrollProgress > 0.4 && scrollProgress < 0.8;
  const htmlOpacity = isVisible ? 1 : 0;
  const htmlTransition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
  const htmlTransform = isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)';

  return (
    <group position={[0, 0, -80]} ref={groupRef}>
      {/* Holographic Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[10, 0.05, 16, 100]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.3} wireframe />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[8, 0.05, 16, 100]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.3} wireframe />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[12, 0.05, 16, 100]} />
        <meshBasicMaterial color="#ff00cc" transparent opacity={0.3} wireframe />
      </mesh>

      {/* Project 1 */}
      <group position={[-5, 2, 0]}>
        <Text position={[0, 1.5, 0]} fontSize={0.8} color="#ffffff">
          PROJECT 01
        </Text>
        <Text position={[0, 0.5, 0]} fontSize={0.4} color="#00ffcc">
          AI GAME SYSTEM
        </Text>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[4, 2, 0.1]} />
          <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} transparent opacity={0.8} />
        </mesh>
        <Html position={[0, -1, 0.1]} transform distanceFactor={10} zIndexRange={[100, 0]}>
          <div style={{ opacity: htmlOpacity, transition: htmlTransition, transform: htmlTransform, color: 'white', background: 'rgba(0,255,204,0.1)', padding: '10px', border: '1px solid #00ffcc', borderRadius: '4px', fontSize: '14px', width: '200px', textAlign: 'center', pointerEvents: isVisible ? 'auto' : 'none' }}>
            <p>Neural Network NPCs</p>
            <button style={{ marginTop: '10px', background: '#00ffcc', color: 'black', border: 'none', padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold' }}>VIEW SOURCE</button>
          </div>
        </Html>
      </group>

      {/* Skills Matrix / Code Terminal */}
      <group position={[5, -1, 5]} rotation={[0, -Math.PI / 4, 0]}>
        <mesh>
          <planeGeometry args={[6, 4]} />
          <meshBasicMaterial color="#000502" transparent opacity={0.9} />
        </mesh>
        <Html position={[0, 0, 0.01]} transform distanceFactor={10} zIndexRange={[100, 0]}>
          <div style={{ opacity: htmlOpacity, transition: htmlTransition, transform: htmlTransform, width: '400px', height: '250px', padding: '20px', fontFamily: 'monospace', color: '#00ffcc', textShadow: '0 0 5px #00ffcc', pointerEvents: isVisible ? 'auto' : 'none' }}>
            <h3>&gt; SYSTEM SKILLS</h3>
            <p style={{ marginTop: '10px' }}>[ PROGRAMMING ]</p>
            <p style={{ color: '#fff' }}>TypeScript, Python, C++, Rust</p>

            <p style={{ marginTop: '10px' }}>[ ENGINE ]</p>
            <p style={{ color: '#fff' }}>Three.js, WebGL, React Three Fiber</p>

            <div style={{ marginTop: '20px', borderTop: '1px solid #00ffcc', paddingTop: '10px' }}>
              <p>Executing:</p>
              <p style={{ color: '#ff00cc' }}>{scrollProgress > 0.65 ? 'if (player.jumps()) character.jump();' : 'if (player.isMoving) character.walk();'}</p>
            </div>
          </div>
        </Html>
        
        {/* Abstract Character */}
        <mesh ref={characterRef} position={[-3, -1, 0]}>
          <capsuleGeometry args={[0.5, 1, 4, 8]} />
          <meshStandardMaterial color="#00ffcc" emissive="#002233" wireframe />
        </mesh>
      </group>
    </group>
  );
};
