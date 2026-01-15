import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, ExternalLink, Code, Database, Globe, Brain } from "lucide-react";

export default function ProjectCard3D({ 
  project, 
  className = "",
  tiltIntensity = 12 
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const getCategoryIcon = (category) => {
    const icons = {
      "Frontend": Code,
      "Backend": Database,
      "Full-Stack": Globe,
      "AI/ML": Brain,
      "Blockchain": Database
    };
    return icons[category] || Code;
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Frontend": "from-blue-500 to-cyan-500",
      "Backend": "from-green-500 to-emerald-500", 
      "Full-Stack": "from-violet-500 to-purple-500",
      "AI/ML": "from-orange-500 to-red-500",
      "Blockchain": "from-pink-500 to-rose-500"
    };
    return colors[category] || "from-violet-500 to-cyan-500";
  };

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

  const CategoryIcon = getCategoryIcon(project.category);
  const categoryColors = getCategoryColor(project.category);

  return (
    <motion.div
      ref={cardRef}
      className={`group ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/20 hover:border-violet-500/40 transition-all duration-300"
        style={{
          transformStyle: "preserve-3d",
          rotateX: -mousePosition.y,
          rotateY: mousePosition.x,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        whileHover={{
          scale: 1.02,
          z: 20
        }}
      >
        {/* Project Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          {project.featured && (
            <motion.div
              className="absolute top-4 right-4 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-xs text-white font-medium">
                Featured
              </span>
            </motion.div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-gray-800/50 border border-gray-700/50" />
              <p className="text-sm">Project Screenshot</p>
            </div>
          </div>
          
          {/* Hover overlay with depth */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ transform: "translateZ(10px)" }}
          >
            <div className="absolute bottom-4 left-4 right-4">
              <Link 
                to={`/projects/${project.id}`}
                className="block w-full py-2 bg-violet-600 hover:bg-violet-700 text-white text-center rounded-lg transition-colors"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-6" style={{ transform: "translateZ(5px)" }}>
          {/* Category and Title */}
          <div className="flex items-center gap-3 mb-3">
            <motion.div 
              className={`p-1.5 rounded bg-gradient-to-r ${categoryColors}/20`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <CategoryIcon className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-sm text-gray-400">{project.category}</span>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 3).map((tech, techIndex) => (
              <motion.span 
                key={techIndex}
                className="px-2 py-1 rounded bg-gray-800/50 text-xs text-gray-300 border border-gray-700/50 hover:border-violet-500/50 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-1 rounded bg-gray-800/50 text-xs text-gray-400 border border-gray-700/50">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <motion.a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-gray-700/50 hover:border-violet-500/50 text-gray-400 hover:text-violet-300 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              Code
            </motion.a>
            <motion.a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-gray-700/50 hover:border-violet-500/50 text-gray-400 hover:text-violet-300 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </motion.a>
          </div>
        </div>

        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: "linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981, #8b5cf6)",
            padding: "2px",
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full rounded-2xl bg-transparent" />
        </motion.div>

        {/* Depth shadow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.4)",
            transform: "translateZ(-10px)"
          }}
        />
      </motion.div>
    </motion.div>
  );
}
