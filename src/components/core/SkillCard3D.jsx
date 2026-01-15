import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function SkillCard3D({ 
  skill, 
  level, 
  icon: Icon, 
  color = "from-violet-500 to-cyan-500",
  className = "" 
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ 
      x: x * 10, 
      y: y * 10 
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative h-32 cursor-pointer
        ${className}
      `}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          rotateY: isFlipped ? 180 : 0,
          rotateX: -mousePosition.y,
          rotateZ: mousePosition.x,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/20 flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className={`p-3 rounded-lg bg-gradient-to-r ${color}/20 mb-3`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <h3 className="text-white font-semibold text-sm mb-2">{skill}</h3>
          
          {/* Progress bar */}
          <div className="w-full max-w-[100px] h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          
          <span className="text-xs text-gray-400 mt-1">{level}%</span>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 backdrop-blur border border-violet-500/30 flex flex-col items-center justify-center p-4"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <h4 className="text-white font-semibold text-sm mb-2 text-center">Experience</h4>
          <p className="text-gray-300 text-xs text-center leading-relaxed">
            {level >= 90 ? "Expert level with years of production experience" :
             level >= 70 ? "Advanced proficiency with multiple projects" :
             level >= 50 ? "Intermediate level with practical experience" :
             "Beginner with foundational knowledge"}
          </p>
          
          <div className="mt-3 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < Math.floor(level / 20) 
                    ? "bg-gradient-to-r from-violet-400 to-cyan-400" 
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 2}% ${50 + mousePosition.y * 2}%, rgba(139, 92, 246, 0.3), transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
