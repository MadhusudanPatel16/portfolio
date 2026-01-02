import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TechCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  const techStack = [
    { name: "React", icon: "M20.25 12.25a2.625 2.625 0 10-5.25 0 2.625 2.625 0 105.25 0zm-15-2.125a2.625 2.625 0 10-5.25 0 2.625 2.625 0 105.25 0zM13.5 6a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zM10.5 15.75a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm5.625-2.375a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z" },
    { name: "Node.js", icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" },
    { name: "Express", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
    { name: "MongoDB", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
    { name: "Laravel", icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" },
    { name: "MySQL", icon: "M4 6h16v12H4z M12 2v20 M8 10h8 M8 14h8" },
    { name: "Tailwind CSS", icon: "M4 4h16v16H4z M8 8h8 M8 12h8 M8 16h8" },
    { name: "JavaScript", icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" },
    { name: "TypeScript", icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" },
    { name: "Vue.js", icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" },
    { name: "PostgreSQL", icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" },
    { name: "Docker", icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" }
  ];

  // Duplicate the tech stack for infinite scroll effect
  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5" />
      
      <div className="relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Technologies I Work With
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Modern tools and frameworks for building exceptional digital experiences
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-20 pointer-events-none" />

          {/* Infinite Scrolling Carousel */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{
                x: isPaused ? 0 : "-50%"
              }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }
              }}
              ref={carouselRef}
            >
              {duplicatedTechStack.map((tech, index) => (
                <motion.div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-3 hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20">
                    {/* Tech Icon */}
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                      <svg 
                        className="w-full h-full text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d={tech.icon} />
                      </svg>
                    </div>
                    
                    {/* Tech Name */}
                    <span className="text-sm md:text-base font-medium text-gray-300 hover:text-white transition-colors duration-300 text-center px-2">
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Subtle hint text */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Hover to pause • Scroll to explore more
          </p>
        </div>
      </div>
    </section>
  );
}
