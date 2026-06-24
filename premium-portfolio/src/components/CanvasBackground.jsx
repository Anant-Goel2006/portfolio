import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const RotatingGalaxy = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      // Extremely majestic, slow rotation across axes
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.01;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dense, beautiful galaxy of stars with no wires */}
      <Stars 
        radius={100} 
        depth={50} 
        count={8000} // High count for a dense, beautiful galaxy
        factor={6} 
        saturation={0} 
        fade 
        speed={2} 
      />
    </group>
  );
};

const CanvasBackground = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, pointerEvents: 'none', overflow: 'hidden', opacity: 0.5 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Pitch black background to make the stars pop perfectly */}
        <color attach="background" args={['#010103']} />
        
        <React.Suspense fallback={null}>
          <RotatingGalaxy />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default CanvasBackground;
