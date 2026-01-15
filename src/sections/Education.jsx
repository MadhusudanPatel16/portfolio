import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import MotionWrap from "../components/core/MotionWrap";
import GlassCard from "../components/core/GlassCard";

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
    level: "undergraduate"
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
    level: "certification"
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
    level: "certification"
  }
];

const timelineVariants = {
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
    x: -50,
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

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
      delay: 0.3
    }
  }
};

export default function Education() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <MotionWrap delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Education Journey
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Continuous learning and specialization in modern web technologies
            </p>
          </div>
        </MotionWrap>

        <motion.div 
          className="relative"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 to-cyan-500 origin-top"
            variants={lineVariants}
          />

          {/* Timeline items */}
          <div className="space-y-12">
            {educationData.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:justify-between`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 border-4 border-gray-900 z-10"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} ml-20 md:ml-0`}>
                    <MotionWrap delay={index * 0.1}>
                      <GlassCard className="p-6 group hover:scale-[1.02] transition-transform duration-300">
                        {/* Icon and year header */}
                        <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                          <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 group-hover:from-violet-500/30 group-hover:to-cyan-500/30 transition-colors">
                            <Icon className="w-5 h-5 text-violet-400" />
                          </div>
                          <div className={`flex items-center gap-2 text-sm ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-400">{item.year}</span>
                          </div>
                        </div>

                        {/* Degree and institute */}
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                          {item.degree}
                        </h3>
                        <p className="text-gray-400 mb-3">{item.institute}</p>
                        
                        {/* Specialization */}
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm border border-violet-500/30">
                            {item.specialization}
                          </span>
                        </div>

                        {/* Achievements */}
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-300">Key Achievements:</p>
                          <ul className="space-y-1">
                            {item.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="text-sm text-gray-400 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </GlassCard>
                    </MotionWrap>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
