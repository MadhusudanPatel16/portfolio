import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosClient from '../../api/axiosClient';

const ASSET_URL = import.meta.env.VITE_ASSET_BASE_URL || "http://localhost:5000";

export default function TechSkillsGrid() {
  const [techSkills, setTechSkills] = useState([]);

  useEffect(() => {
    axiosClient.get('/skills')
      .then(res => {
        const mapped = res.data.map(skill => ({
          name: skill.name,
          level: skill.proficiency,
          logo: skill.logo,
          color: getColor(skill.proficiency),
        }));
        setTechSkills(mapped);
      })
      .catch(console.error);
  }, []);

  return (
    <section
      id="skills"
      className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Tech Stack & Skills
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hover over cards to see proficiency levels
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techSkills.map((tech, index) => (
            <FlipCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= FLIP CARD (LOGO ADDED, UI SAME) ================= */

function FlipCard({ tech, index }) {
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
        {/* FRONT (LOGO) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-3 shadow-lg backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={`${ASSET_URL}/uploads/skills/${tech.logo}`}
            alt={tech.name}
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />

          <span className="text-sm md:text-base font-semibold text-white text-center px-2">
            {tech.name}
          </span>
        </div>

        {/* BACK (UNCHANGED) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${tech.color} border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center p-4 shadow-lg backface-hidden`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <span className="text-sm font-bold text-white mb-2 text-center">
            {tech.name}
          </span>

          <div className="text-3xl font-bold text-white mb-3">
            {tech.level}%
          </div>

          <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isFlipped ? `${tech.level}%` : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          <span className="text-xs text-white/80 mt-2">Proficiency</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================= HELPERS ================= */

const getColor = (level) => {
  if (level >= 90) return "from-emerald-400 to-green-500";
  if (level >= 80) return "from-cyan-400 to-blue-500";
  return "from-blue-400 to-indigo-500";
};
