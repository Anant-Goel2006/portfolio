import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './HangingIDCard.module.css';

const HangingIDCard = ({ imageSrc, name, title }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Loose spring configuration for a realistic pendulum swing
  const springConfig = { stiffness: 100, damping: 10, mass: 1.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Swing left/right
  const rotateZ = useTransform(springX, [-1, 1], ["-12deg", "12deg"]);
  // Twist left/right
  const rotateY = useTransform(springX, [-1, 1], ["-20deg", "20deg"]);
  // Tilt forward/back
  const rotateX = useTransform(springY, [-1, 1], ["15deg", "-15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center, normalized from -1 to 1
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    // Reset back to resting position
    x.set(0);
    y.set(0);
  };

  return (
    <div className={styles.container}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={styles.cardContainer}
        style={{
          rotateX,
          rotateY,
          rotateZ,
          transformOrigin: 'top center'
        }}
      >
        {/* The lanyard strap extending upward */}
        <div className={styles.strap}></div>
        
        {/* The actual ID badge */}
        <div className={styles.badge}>
          <div className={styles.clip}></div>
          <div className={styles.hole}></div>
          
          <img src={imageSrc} alt={name} className={styles.photo} />
          
          <div className={styles.details}>
            <h4>{name}</h4>
            <p>{title}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HangingIDCard;
