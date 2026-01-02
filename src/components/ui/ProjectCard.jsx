import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/10 
                 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-emerald-500/50 
                 transition-all duration-500 cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 
                     group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <a
              href={project.liveUrl}
              className="flex-1 px-3 py-2 bg-emerald-500 text-black text-sm font-medium 
                       rounded-lg hover:bg-emerald-400 transition-colors text-center"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              className="flex-1 px-3 py-2 border border-white/30 text-white text-sm font-medium 
                       rounded-lg hover:bg-white/10 transition-colors text-center"
              onClick={(e) => e.stopPropagation()}
            >
              Code
            </a>
          </div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-black 
                          text-xs font-bold rounded-full">
            Featured
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm 
                        text-white text-xs font-medium rounded-full">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 
                       transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs 
                       font-medium rounded-md border border-emerald-500/20"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 bg-white/10 text-gray-400 text-xs 
                           font-medium rounded-md">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                      pointer-events-none" />
    </motion.div>
  );
}
