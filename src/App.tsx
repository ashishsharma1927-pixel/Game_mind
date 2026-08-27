import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preload, Loader } from '@react-three/drei';
import { useStore } from './store/useStore';
import { CinematicCamera } from './components/3d/camera/CinematicCamera';
import { Hero } from './components/3d/scenes/Hero';
import { ForestWorld } from './components/3d/scenes/ForestWorld';
import { ProjectsWorld } from './components/3d/scenes/ProjectsWorld';
import { DeveloperRoom } from './components/3d/scenes/DeveloperRoom';
import { Portfolio } from './components/html/Portfolio';

gsap.registerPlugin(ScrollTrigger);

// Minimal UI Components
const Navbar = () => (
  <nav className="navbar ui-content">
    <div className="nav-brand">
      <img src="./logo.jpg" alt="GAMER_MIND Logo" className="brand-logo" />
    </div>
  </nav>
);

const CinematicScene = () => {
  return (
    <>
      <color attach="background" args={['#030303']} />

      {/* Global Volumetric Fog Placeholder */}
      <fog attach="fog" args={['#030303', 2, 25]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <CinematicCamera />

      {/* 0. Hero (z: 0) */}
      <Hero />

      <ForestWorld />

      <ProjectsWorld />

      <DeveloperRoom />

      <Preload all />
    </>
  );
};

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setScrollProgress = useStore((state) => state.setScrollProgress);

  useEffect(() => {
    // Global ScrollTimeline setup
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [setScrollProgress]);

  return (
    <div className="app-wrapper">
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <CinematicScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Loading Overlay */}
      <Loader
        containerStyles={{ background: '#030303' }}
        innerStyles={{ width: '300px', background: 'rgba(0,255,204,0.2)' }}
        barStyles={{ background: '#00ffcc' }}
        dataInterpolation={(p) => `LOADING SYSTEMS ${p.toFixed(0)}%`}
      />

      {/* UI Layer */}
      <div className="ui-layer">
        <Navbar />
      </div>

      {/* GSAP Scroll Container */}
      <div className="scroll-container" ref={containerRef}>
        {/* We keep this empty, its only purpose is to create scrollable space */}
      </div>

      {/* Traditional Portfolio Site (Appears after cinematic scroll) */}
      <Portfolio />
    </div>
  );
}

export default App;
