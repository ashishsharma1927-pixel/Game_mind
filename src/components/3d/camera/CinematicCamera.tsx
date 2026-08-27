import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../../../store/useStore';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';

// Define the keyframes for the camera journey
// progress: 0 to 1
export const cameraKeyframes = [
  { progress: 0.0, position: new THREE.Vector3(0, 1, 10), lookAt: new THREE.Vector3(0, 0.5, 0) }, // Hero - looking at controller
  { progress: 0.15, position: new THREE.Vector3(0, 0.5, 3), lookAt: new THREE.Vector3(0, 0, 0) }, // Approaching controller
  { progress: 0.2, position: new THREE.Vector3(0, 2, -2), lookAt: new THREE.Vector3(0, 1, -10) }, // Moving through transformation
  { progress: 0.35, position: new THREE.Vector3(0, 2, -15), lookAt: new THREE.Vector3(0, 1, -25) }, // Forest World Entry
  { progress: 0.5, position: new THREE.Vector3(0, 1.5, -30), lookAt: new THREE.Vector3(0, 1, -40) }, // Approaching Character
  { progress: 0.7, position: new THREE.Vector3(0, 3, -60), lookAt: new THREE.Vector3(0, 2, -80) }, // Futuristic / Projects
  { progress: 0.85, position: new THREE.Vector3(0, 2, -100), lookAt: new THREE.Vector3(0, 1.5, -110) }, // Developer Room (Desk)
  { progress: 0.92, position: new THREE.Vector3(0, 1, -135), lookAt: new THREE.Vector3(0, 0.5, -145) }, // READY TO PLAY?
  { progress: 1.0, position: new THREE.Vector3(0, 1, -135), lookAt: new THREE.Vector3(0, 0.5, -155) }, // GAME OVER -> NOT YET
];

export const CinematicCamera = () => {
  const { camera } = useThree();
  const scrollProgress = useStore((state) => state.scrollProgress);
  const lookAtTarget = useRef(new THREE.Vector3(0, 0.5, 0));
  
  // Mouse position for subtle parallax
  const mousePos = useRef(new THREE.Vector2());

  // Listen for mouse move
  useMemo(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_state, delta) => {
    // 1. Find the current keyframe segment based on scrollProgress
    let startIndex = 0;
    let endIndex = 1;

    for (let i = 0; i < cameraKeyframes.length - 1; i++) {
      if (scrollProgress >= cameraKeyframes[i].progress && scrollProgress <= cameraKeyframes[i + 1].progress) {
        startIndex = i;
        endIndex = i + 1;
        break;
      }
    }
    
    // If we're past the last keyframe, clamp to the last one
    if (scrollProgress >= cameraKeyframes[cameraKeyframes.length - 1].progress) {
      startIndex = cameraKeyframes.length - 2;
      endIndex = cameraKeyframes.length - 1;
    }

    const startFrame = cameraKeyframes[startIndex];
    const endFrame = cameraKeyframes[endIndex];

    // 2. Calculate interpolation factor (t) between the two keyframes
    const range = endFrame.progress - startFrame.progress;
    // Prevent division by zero
    const localProgress = range > 0 ? (scrollProgress - startFrame.progress) / range : 0;
    
    // Use an easing function for smoother transitions (optional, but good for camera)
    // const t = localProgress < 0.5 ? 2 * localProgress * localProgress : -1 + (4 - 2 * localProgress) * localProgress;
    const t = localProgress; // Linear for now, GSAP scrub handles smoothness

    // 3. Interpolate position and lookAt
    const targetPos = new THREE.Vector3().lerpVectors(startFrame.position, endFrame.position, t);
    const targetLookAt = new THREE.Vector3().lerpVectors(startFrame.lookAt, endFrame.lookAt, t);

    // 4. Add subtle mouse parallax
    const parallaxStrength = 0.5;
    targetPos.x += mousePos.current.x * parallaxStrength;
    targetPos.y += mousePos.current.y * parallaxStrength;

    // 5. Apply to camera with damping for smoothness
    camera.position.lerp(targetPos, 5 * delta);
    lookAtTarget.current.lerp(targetLookAt, 5 * delta);
    
    camera.lookAt(lookAtTarget.current);
  });

  return null;
};
