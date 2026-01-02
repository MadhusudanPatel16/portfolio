import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TechSkillsGrid() {
  const techSkills = [
    { name: "React", level: 90, icon: "⚛️", color: "from-cyan-400 to-blue-500" },
    { name: "Node.js", level: 85, icon: "🟢", color: "from-green-400 to-emerald-500" },
    { name: "Express", level: 85, icon: "🚀", color: "from-gray-400 to-slate-500" },
    { name: "MongoDB", level: 80, icon: "🍃", color: "from-green-500 to-lime-500" },
    { name: "Laravel", level: 85, icon: "🔺", color: "from-red-400 to-orange-500" },
    { name: "MySQL", level: 78, icon: "🐬", color: "from-blue-400 to-cyan-500" },
    { name: "Tailwind CSS", level: 90, icon: "🎨", color: "from-teal-400 to-cyan-500" },
    { name: "JavaScript", level: 92, icon: "📜", color: "from-yellow-400 to-amber-500" },
    { name: "TypeScript", level: 82, icon: "🔷", color: "from-blue-500 to-indigo-500" },
    { name: "Vue.js", level: 75, icon: "💚", color: "from-emerald-400 to-green-500" },
    { name: "PostgreSQL", level: 78, icon: "🐘", color: "from-blue-500 to-indigo-600" },
    { name: "Docker", level: 70, icon: "🐳", color: "from-blue-400 to-sky-500" },
  ];

  const getSkillColor = (level) => {
    if (level >= 85) return "bg-emerald-500";
    if (level >= 75) return "bg-cyan-500";
    return "bg-blue-500";
  };

  return (
    <section id="skills" className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Tech Stack & Skills
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hover over cards to see proficiency levels
          </p>
        </div>

        {/* Grid of Flip Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techSkills.map((tech, index) => (
            <FlipCard key={tech.name} tech={tech} index={index} getSkillColor={getSkillColor} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ tech, index, getSkillColor }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative h-40 w-full perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-500 preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of Card - Tech Name & Logo */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-3 shadow-lg backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Tech Icon */}
          <div className="text-4xl md:text-5xl">
            {tech.icon}
          </div>
          
          {/* Tech Name */}
          <span className="text-sm md:text-base font-semibold text-white text-center px-2">
            {tech.name}
          </span>
        </div>

        {/* Back of Card - Progress Bar */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${tech.color} border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center p-4 shadow-lg backface-hidden`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Tech Name */}
          <span className="text-sm font-bold text-white mb-2 text-center">
            {tech.name}
          </span>
          
          {/* Skill Level Percentage */}
          <div className="text-3xl font-bold text-white mb-3">
            {tech.level}%
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isFlipped ? `${tech.level}%` : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          
          {/* Proficiency Label */}
          <span className="text-xs text-white/80 mt-2">Proficiency</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
