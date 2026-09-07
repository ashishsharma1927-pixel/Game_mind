import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../../../store/useStore';
import * as THREE from 'three';
import { Text, Html, useGLTF, useAnimations } from '@react-three/drei';

function RobotCharacter() {
  const { scene, animations } = useGLTF('./RobotExpressive.glb');
  const { actions } = useAnimations(animations, scene);
  
  useEffect(() => {
    // Try to play 'Idle' or the first available animation
    if (actions['Idle']) {
      actions['Idle'].reset().fadeIn(0.5).play();
    } else {
      const firstAction = Object.values(actions)[0];
      if (firstAction) firstAction.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  return (
    <group position={[0, -2, -5]} rotation={[0, 0, 0]} scale={0.5}>
      <primitive object={scene} />
    </group>
  );
}


export const DeveloperRoom = () => {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const scrollProgress = useStore((state) => state.scrollProgress);
  
  const textRef1 = useRef<THREE.Group>(null); // THE DEVELOPER
  const textRef2 = useRef<THREE.Group>(null); // READY TO PLAY?
  const textRef3 = useRef<THREE.Group>(null); // GAME OVER? -> NOT YET.
  
  const [isNotYet, setIsNotYet] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useFrame(() => {
    // 1. THE DEVELOPER (Fade in 0.8-0.85, out 0.90-0.92)
    if (textRef1.current) {
      const fadeIn = Math.min(Math.max((scrollProgress - 0.8) * 20, 0), 1);
      const fadeOut = Math.min(Math.max((scrollProgress - 0.9) * 50, 0), 1);
      const opacity = fadeIn - fadeOut;
      textRef1.current.children.forEach(child => {
        const mesh = child as any;
        if (mesh.material) {
          mesh.material.opacity = Math.max(0, opacity);
          mesh.material.transparent = true;
        }
      });
    }

    // 2. READY TO PLAY? (Fade in 0.92-0.94, out 0.96-0.97)
    if (textRef2.current) {
      const fadeIn = Math.min(Math.max((scrollProgress - 0.92) * 50, 0), 1);
      const fadeOut = Math.min(Math.max((scrollProgress - 0.96) * 100, 0), 1);
      const opacity = fadeIn - fadeOut;
      textRef2.current.children.forEach(child => {
        const mesh = child as any;
        if (mesh.material) {
          mesh.material.opacity = Math.max(0, opacity);
          mesh.material.transparent = true;
        }
      });
    }

    // 3. GAME OVER? / NOT YET. (Fade in 0.97-0.98)
    if (textRef3.current) {
      const opacity = Math.min(Math.max((scrollProgress - 0.97) * 100, 0), 1);
      textRef3.current.children.forEach(child => {
        const mesh = child as any;
        if (mesh.material) {
          mesh.material.opacity = Math.max(0, opacity);
          mesh.material.transparent = true;
        }
      });
    }

    // Trigger text change at 0.985
    if (scrollProgress > 0.985 && !isNotYet) setIsNotYet(true);
    if (scrollProgress <= 0.985 && isNotYet) setIsNotYet(false);

    // Show buttons at 0.99
    if (scrollProgress > 0.99 && !showButtons) setShowButtons(true);
    if (scrollProgress <= 0.99 && showButtons) setShowButtons(false);
  });

  const isVisible = scrollProgress > 0.72;

  return (
    <group position={[0, 0, -130]} visible={isVisible}>
      
      {/* Dark Room Walls / Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#020202" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* 3D Character replacing the abstract desk */}
      <RobotCharacter />

      <pointLight position={[0, 5, 0]} intensity={2} distance={20} color="#00ffcc" />

      {/* The Developer Text */}
      <group ref={textRef1} position={[0, isMobile ? 2.5 : 3, -10]}>
        <Text
          fontSize={isMobile ? 0.65 : 1.6}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          whiteSpace="nowrap"
        >
          THE DEVELOPER
        </Text>
        <Text
          position={[0, isMobile ? -0.85 : -1.4, 0]}
          fontSize={isMobile ? 0.32 : 0.65}
          color="#aaaaaa"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          whiteSpace="nowrap"
        >
          Hi, I build interactive experiences.
        </Text>
      </group>

      {/* READY TO PLAY? */}
      <group ref={textRef2} position={[0, isMobile ? 1.5 : 2, -15]}>
        <Text
          fontSize={isMobile ? 0.75 : 2.0}
          color="#00ffcc"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          whiteSpace="nowrap"
        >
          READY TO PLAY?
        </Text>
        <Text
          position={[0, isMobile ? -0.9 : -1.6, 0]}
          fontSize={isMobile ? 0.36 : 0.75}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          whiteSpace="nowrap"
        >
          LET'S BUILD SOMETHING.
        </Text>
      </group>

      {/* GAME OVER? / NOT YET */}
      <group ref={textRef3} position={[0, isMobile ? 1.5 : 2, -15]}>
        <Text
          fontSize={isMobile ? 0.85 : 2.2}
          color={isNotYet ? "#00ffcc" : "#ff0033"}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          whiteSpace="nowrap"
        >
          {isNotYet ? "NOT YET." : "GAME OVER?"}
        </Text>
        
        <Html center position={[0, isMobile ? -1.6 : -2.4, 0]} transform distanceFactor={10} zIndexRange={[100, 0]}>
          <div style={{
            opacity: showButtons ? 1 : 0,
            transition: 'opacity 0.5s',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '10px' : '20px',
            alignItems: 'center',
            pointerEvents: showButtons ? 'auto' : 'none'
          }}>
            <button 
              onClick={() => {
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: '#00ffcc', color: 'black', border: 'none', 
                padding: isMobile ? '10px 20px' : '15px 30px',
                fontSize: isMobile ? '13px' : '18px',
                fontWeight: 'bold', 
                cursor: 'pointer', textTransform: 'uppercase',
                letterSpacing: isMobile ? '1px' : '2px',
                borderRadius: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              View My Work
            </button>
            <button 
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: 'transparent', color: '#00ffcc', border: '2px solid #00ffcc', 
                padding: isMobile ? '10px 20px' : '15px 30px',
                fontSize: isMobile ? '13px' : '18px',
                fontWeight: 'bold', 
                cursor: 'pointer', textTransform: 'uppercase',
                letterSpacing: isMobile ? '1px' : '2px',
                borderRadius: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              Contact Me
            </button>
          </div>
        </Html>
      </group>

    </group>
  );
};
