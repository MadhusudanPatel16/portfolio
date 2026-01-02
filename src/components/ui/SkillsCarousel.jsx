import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SkillsCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  const skills = [
    { name: "React Development", level: 90, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "UI/UX Design", level: 80, category: "Design" },
    { name: "MongoDB", level: 75, category: "Database" },
    { name: "Laravel", level: 85, category: "Backend" },
    { name: "Tailwind CSS", level: 90, category: "Frontend" },
    { name: "API Design", level: 88, category: "Backend" },
    { name: "TypeScript", level: 82, category: "Frontend" },
    { name: "PostgreSQL", level: 78, category: "Database" },
    { name: "Vue.js", level: 75, category: "Frontend" },
    { name: "Docker", level: 70, category: "DevOps" },
    { name: "GraphQL", level: 80, category: "Backend" }
  ];

  // Duplicate the skills for infinite scroll effect
  const duplicatedSkills = [...skills, ...skills];

  const getSkillColor = (level) => {
    if (level >= 85) return "bg-emerald-500";
    if (level >= 75) return "bg-cyan-500";
    return "bg-blue-500";
  };

  return (
    <section id="skills" className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5" />
      
      <div className="relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional competencies with continuous learning and growth
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

          {/* Infinite Scrolling Carousel */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: isPaused ? 0 : "-50%"
              }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }
              }}
              ref={carouselRef}
            >
              {duplicatedSkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  className="flex-shrink-0 w-72 md:w-80"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm p-6 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                    {/* Skill Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {skill.name}
                        </h3>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">
                          {skill.category}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-cyan-400">
                        {skill.level}%
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">Proficiency</span>
                        <span className="text-xs text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${getSkillColor(skill.level)} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ 
                            duration: 1.5, 
                            delay: index * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </div>

                    {/* Skill Level Indicator */}
                    <div className="flex items-center gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${
                            i < Math.floor(skill.level / 20)
                              ? 'bg-cyan-400/60'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Skills Categories */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            {["Frontend", "Backend", "Database", "Design", "DevOps"].map((category) => (
              <span
                key={category}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Subtle hint text */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Hover to pause • View skill levels and categories
          </p>
        </div>
      </div>
    </section>
  );
}
