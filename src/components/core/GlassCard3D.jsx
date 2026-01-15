import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function GlassCard3D({ children, className = "", tiltIntensity = 15 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ 
      x: x * tiltIntensity, 
      y: y * tiltIntensity 
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative rounded-2xl
        bg-white/5 backdrop-blur
        border border-white/10
        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
        transition-all duration-300
        hover:bg-white/10
        hover:border-violet-500/40
        hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.6)]
        ${className}
      `}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div
        style={{
          rotateX: -mousePosition.y,
          rotateY: mousePosition.x,
          transformStyle: "preserve-3d",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {children}
      </motion.div>
      
      {/* Animated gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 pointer-events-none"
        style={{
          background: "linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981, #8b5cf6)",
          padding: "1px",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full rounded-2xl bg-gray-900" />
      </motion.div>
    </motion.div>
  );
}
