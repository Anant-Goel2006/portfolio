import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import styles from './Hero.module.css';

// Premium Royal 3D Design covering the background
const RoyalGeometry = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      // Majestic, slow, continuous rotation
      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.rotation.x = time * 0.1;
      
      // Interactive tilting tracking the cursor for that premium feel
      groupRef.current.rotation.y += (state.pointer.x * 0.3 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-state.pointer.y * 0.3 - groupRef.current.rotation.x) * 0.05;
    }
  });

  // Premium Royal Gold Material
  const royalGold = (
    <meshPhysicalMaterial 
      color="#d4af37" 
      emissive="#2a1d00"
      metalness={1.0} 
      roughness={0.15} 
      clearcoat={1.0}
      clearcoatRoughness={0.1}
    />
  );

  return (
    <group ref={groupRef} scale={1.8}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Massive Royal Torus Knot */}
        <mesh>
          <torusKnotGeometry args={[2, 0.5, 300, 40, 3, 5]} />
          {royalGold}
        </mesh>
      </Float>
      
      {/* Outer elegant slow-rotating ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.8, 0.01, 32, 100]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.4} />
      </mesh>
      
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[3.8, 0.01, 32, 100]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      {/* Massive 3D Canvas spanning the entire hero section */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'auto', overflow: 'hidden' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={1.5} />
          <spotLight position={[10, 20, 10]} intensity={5} color="#ffffff" />
          <spotLight position={[-10, -20, -10]} intensity={3} color="#d4af37" />
          <React.Suspense fallback={null}>
            <RoyalGeometry />
          </React.Suspense>
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className={`container ${styles.content}`} style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        
        <motion.div 
          className={styles.center}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          style={{ pointerEvents: 'auto' }}
        >
          <motion.div 
            className="mono"
            style={{ letterSpacing: '0.5em', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', fontSize: '12px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            A Portfolio Production
          </motion.div>
          
          <h1 className={styles.name} style={{ position: 'relative', zIndex: 20, color: '#ffffff', fontWeight: '900' }}>
            ANANT<br/>GOEL
          </h1>
          
          <motion.p 
            className={styles.desc}
            style={{ position: 'relative', zIndex: 20 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Data Analyst & Data Science undergraduate turning raw data into actionable insights through Python, SQL, Machine Learning, and compelling visualizations.
          </motion.p>

          <motion.div 
            className={styles.ctas}
            style={{ position: 'relative', zIndex: 20 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <a href="#about" className="btn btn-primary">
              EXPLORE
            </a>
            {/* 
            <a href="/Resume_Updated.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
              Download Resume
            </a>
            */}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
