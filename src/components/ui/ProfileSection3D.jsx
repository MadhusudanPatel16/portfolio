import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ImageSlider from "../core/ImageSlider";
import axiosClient from "../../api/axiosClient";

export default function ProfileSection3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [profile, setProfile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const cardRef = useRef(null);

  // Base URL for backend images
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const sliderImages = profile?.background_image 
    ? [profile.background_image]
    : [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1559028006-8488655979d7?w=1200&h=800&fit=crop",
    ];

  /* ---------------- Mouse movement for 3D tilt ---------------- */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      setMousePosition({ x: x * 15, y: y * 15 }); // Limit tilt to 15 degrees
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------- Fetch Profile Data ---------------- */
  useEffect(() => {
    axiosClient
      .get("/profile")
      .then((res) => setProfile(res.data))
      .catch(console.error);
  }, []);

  /* ---------------- Fetch Resume ---------------- */
  useEffect(() => {
    axiosClient
      .get("/resume")
      .then((res) => setResumeUrl(res.data.downloadUrl))
      .catch(() => setResumeUrl(null));
  }, []);

  /* ---------------- Animations ---------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.8 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Parallax Background */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ y: scrollY * 0.5 }}
          className="absolute inset-0"
        >
          <ImageSlider images={sliderImages} autoSlide slideInterval={5000} />
        </motion.div>
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Noise/grain overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full bg-white" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>

      {/* 3D Hero Card with Profile Image */}
      <motion.div
        ref={cardRef}
        className="relative z-30 max-w-4xl mx-auto px-6 lg:px-8"
        style={{
          perspective: "1000px",
        }}
      >
        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
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
          {/* Profile Image Section */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={profile?.avatar ? profile.avatar : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face"}
              alt="Profile Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Floating avatar overlay */}
            <motion.div 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              variants={floatingVariants}
              initial="initial"
              animate="animate"
            >
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/20 overflow-hidden">
                  <img
                    src={profile?.avatar ? profile.avatar : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full blur-xl bg-violet-400/40 animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Name */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
              variants={itemVariants}
              style={{
                transform: "translateZ(30px)"
              }}
            >
              I'm {profile?.name || "Loading..."}
            </motion.h1>

            {/* Headline */}
            <motion.h2
              className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent text-center"
              variants={itemVariants}
              style={{
                transform: "translateZ(20px)"
              }}
            >
              {profile?.headline || "Loading..."}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-gray-300 text-center mb-8 leading-relaxed"
              variants={itemVariants}
              style={{
                transform: "translateZ(10px)"
              }}
            >
              {profile?.description || "Loading..."}
            </motion.p>

            {/* Skills */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-12"
              variants={itemVariants}
            >
              {profile?.what_i_do?.map((skill) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-gray-300 text-sm hover:bg-emerald-500/20 transition"
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    borderColor: "rgb(16, 185, 129)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={containerVariants}
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 rounded-full bg-emerald-500 text-black font-semibold text-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>

              <motion.a
                href="#contact"
                className="px-8 py-4 rounded-full border-2 border-emerald-500 text-emerald-400 font-semibold text-lg hover:bg-emerald-500 hover:text-black transition"
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>

              <motion.a
                href="/resume"
                className="px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-lg hover:bg-emerald-500 hover:text-black transition"
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Add CSS animation for spinning gradient */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
