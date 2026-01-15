import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import MotionWrap from "../core/MotionWrap";
import GlassCard from "../core/GlassCard";

const educationData = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institute: "University of Engineering & Technology",
    year: "2020 - 2024",
    specialization: "Full Stack Development & Machine Learning",
    achievements: [
      "Dean's List for 3 consecutive semesters",
      "Led 10+ student projects",
      "Published research paper on AI optimization"
    ],
    icon: GraduationCap,
    level: "undergraduate",
    gpa: "3.8/4.0"
  },
  {
    degree: "Full Stack Web Development",
    institute: "Coding Bootcamp Pro",
    year: "2023",
    specialization: "MERN Stack & Cloud Architecture",
    achievements: [
      "Top 5% of cohort",
      "Built 5 production-ready apps",
      "Mentored 15+ junior developers"
    ],
    icon: BookOpen,
    level: "certification",
    gpa: "98%"
  },
  {
    degree: "Advanced React & TypeScript",
    institute: "Tech Academy Online",
    year: "2024",
    specialization: "Performance Optimization & Architecture",
    achievements: [
      "Completed advanced patterns course",
      "Built reusable component library",
      "Contributed to open source projects"
    ],
    icon: Award,
    level: "certification",
    gpa: "95%"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function EducationSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % educationData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + educationData.length) % educationData.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const currentEducation = educationData[currentIndex];
  const Icon = currentEducation.icon;

  const getCategoryColor = (level) => {
    const colors = {
      "undergraduate": "from-blue-500 to-cyan-500",
      "certification": "from-green-500 to-emerald-500"
    };
    return colors[level] || "from-violet-500 to-cyan-500";
  };

  const categoryColors = getCategoryColor(currentEducation.level);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <MotionWrap delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Education Journey
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              My academic background and continuous learning path
            </p>
          </div>
        </MotionWrap>

        {/* 3D Slider */}
        <MotionWrap delay={0.3}>
          <div className="relative">
            <div className="perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300, rotateY: 45 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -300, rotateY: -45 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <GlassCard className="p-8 md:p-12 hover:scale-[1.02] transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${categoryColors}/20`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-400">{currentEducation.year}</span>
                          <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300 border border-white/20">
                            {currentEducation.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {currentEducation.degree}
                        </h3>
                        <p className="text-lg text-violet-400 mb-4">{currentEducation.institute}</p>
                        
                        <div className="mb-6">
                          <p className="text-sm text-gray-400 mb-2">Specialization</p>
                          <p className="text-gray-300">{currentEducation.specialization}</p>
                        </div>

                        <div className="mb-6">
                          <p className="text-sm text-gray-400 mb-2">Performance</p>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">{currentEducation.gpa}</span>
                            <span className="text-gray-400">GPA</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                        <ul className="space-y-3">
                          {currentEducation.achievements.map((achievement, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 mt-2 flex-shrink-0" />
                              <span className="text-gray-300">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-8">
              <motion.button
                onClick={prevSlide}
                className="p-3 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-violet-400 hover:border-violet-500/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {educationData.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? "bg-violet-400" : "bg-gray-600"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                className="p-3 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-violet-400 hover:border-violet-500/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Auto-play Toggle */}
            <div className="flex justify-center mt-4">
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 text-sm text-gray-400 hover:text-violet-400 hover:border-violet-500/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAutoPlaying ? "Pause" : "Play"} Auto-scroll
              </motion.button>
            </div>
          </div>
        </MotionWrap>

        {/* Quick Preview Cards */}
        <MotionWrap delay={0.5}>
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <GlassCard 
                  className={`p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 ${
                    index === currentIndex ? "ring-2 ring-violet-500/50" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(edu.level)}/20`}>
                      <edu.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-gray-400">{edu.year}</span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-gray-400 mb-2">{edu.institute}</p>
                  <p className="text-xs text-violet-400">{edu.gpa} GPA</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}