import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ImageSlider from "../core/ImageSlider";
import axiosClient from "../../api/axiosClient";

export default function ProfileSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [profile, setProfile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);

  const sliderImages = profile?.background_image 
  ? [profile.background_image]
  : [
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1559028006-8488655979d7?w=1200&h=800&fit=crop",
  ];

  /* ---------------- Mouse movement (optional visual effects) ---------------- */
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <ImageSlider images={sliderImages} autoSlide slideInterval={5000} />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-30 max-w-6xl mx-auto px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        {/* <motion.div className="mb-8" variants={itemVariants}>
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                {profile?.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {profile?.name?.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute inset-0 rounded-full blur-xl bg-emerald-400/40 animate-pulse" />
          </div>
        </motion.div> */}

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-4 mt-32"
          variants={itemVariants}
        >
          I'm {profile?.name}
        </motion.h1>

        {/* Headline */}
        <motion.h2
          className="text-2xl md:text-3xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          {profile?.headline}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          variants={itemVariants}
        >
          {profile?.description}
        </motion.p>

        {/* Skills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={itemVariants}
        >
          {profile?.what_i_do?.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-gray-300 text-sm hover:bg-emerald-500/20 transition"
            >
              {skill}
            </span>
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

          {/* Resume Download */}
          {resumeUrl && (
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-lg hover:bg-emerald-500 hover:text-black transition"
              variants={buttonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
