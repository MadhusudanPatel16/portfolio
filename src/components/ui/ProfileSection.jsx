import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageSlider from '../core/ImageSlider';

export default function ProfileSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sliderImages = [
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1559028006-8488655979d7?w=1200&h=800&fit=crop"
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const skillTags = [
    "React", "Node.js", "Laravel", "MongoDB", "Tailwind CSS", "TypeScript"
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          <ImageSlider images={sliderImages} autoSlide={true} slideInterval={5000} />
        </div>
        
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        {/* Gradient Orbs */}
        <div 
          className="absolute z-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div 
          className="absolute z-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          style={{
            right: `${-mousePosition.x * 0.05}px`,
            bottom: `${-mousePosition.y * 0.05}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute z-20 inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-30 max-w-6xl mx-auto px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  M
                </span>
              </div>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 blur-xl opacity-50 animate-pulse" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
          variants={itemVariants}
        >
          <span className="block text-white">I'm Madhusudan</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Full-Stack Developer & UI/UX Enthusiast
        </motion.h2>

        {/* Supporting Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          variants={itemVariants}
        >
          I build scalable web applications using modern JavaScript and PHP. 
          I help businesses grow by turning ideas into real products that users love.
        </motion.p>

        {/* Skill Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={itemVariants}
        >
          {skillTags.map((skill, index) => (
            <span
              key={skill}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-gray-300 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
            >
              {skill}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          variants={containerVariants}
        >
          <motion.a
            href="#projects"
            className="inline-block px-8 py-4 rounded-full bg-emerald-500 text-black font-semibold text-lg hover:bg-emerald-400 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
          
          <motion.a
            href="#contact"
            className="inline-block px-8 py-4 rounded-full border-2 border-emerald-500 text-emerald-400 font-semibold text-lg hover:bg-emerald-500 hover:text-black transition-all duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: [20, 30, 20],
          transition: {
            opacity: { delay: 1.2, duration: 0.6 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        }}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm font-medium">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border border-emerald-500/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 border border-cyan-500/20 rounded-lg"
        animate={{
          x: [0, 20, 0],
          rotate: [0, -180, -360]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
}
