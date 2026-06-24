import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // We MUST use useMotionTemplate to interpolate MotionValues into a CSS string!
  const gradientX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const gradientY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const highlightBackground = useMotionTemplate`radial-gradient(circle at ${gradientX} ${gradientY}, rgba(255,255,255,0.1) 0%, transparent 50%)`;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className={className}
    >
      <div 
        style={{ 
          transform: "translateZ(50px)",
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        {children}

        {/* Dynamic Highlight overlay simulating light reflection */}
        {isHovered && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: highlightBackground,
              pointerEvents: 'none',
              zIndex: 10,
              borderRadius: 'inherit'
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default TiltCard;
