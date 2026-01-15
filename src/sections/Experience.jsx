import { motion } from "framer-motion";
import { Briefcase, Calendar, Code, Users, Lightbulb, Rocket } from "lucide-react";
import MotionWrap from "../components/core/MotionWrap";
import GlassCard from "../components/core/GlassCard";

const experienceData = [
  {
    year: "2024",
    role: "Full Stack Developer",
    company: "Tech Startup Inc.",
    type: "full-time",
    description: "Built scalable web applications and led development team",
    achievements: [
      "Architectured microservices system handling 10K+ requests/sec",
      "Reduced page load time by 60% through optimization",
      "Mentored team of 5 junior developers"
    ],
    tech: ["React", "Node.js", "AWS", "PostgreSQL", "Docker"],
    icon: Briefcase,
    category: "professional"
  },
  {
    year: "2023",
    role: "Frontend Developer Intern",
    company: "Digital Agency Pro",
    type: "internship",
    description: "Developed responsive web applications for enterprise clients",
    achievements: [
      "Built 3 client projects from design to deployment",
      "Implemented component library used across all projects",
      "Improved accessibility scores from 75% to 95%"
    ],
    tech: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
    icon: Code,
    category: "internship"
  },
  {
    year: "2022 - 2023",
    role: "Freelance Web Developer",
    company: "Self-Employed",
    type: "freelance",
    description: "Provided web development services to small businesses",
    achievements: [
      "Completed 15+ freelance projects",
      "Managed client relationships and project timelines",
      "Generated $50K+ revenue in first year"
    ],
    tech: ["Next.js", "MongoDB", "Stripe", "Vercel"],
    icon: Rocket,
    category: "freelance"
  },
  {
    year: "2021 - 2022",
    role: "Open Source Contributor",
    company: "GitHub Community",
    type: "open-source",
    description: "Contributed to popular open source projects",
    achievements: [
      "500+ contributions across 20+ repositories",
      "Maintained 2 popular npm packages with 10K+ downloads",
      "Speaker at local tech meetups"
    ],
    tech: ["JavaScript", "React", "Node.js", "GraphQL"],
    icon: Users,
    category: "open-source"
  },
  {
    year: "2020",
    role: "Personal Projects & Learning",
    company: "Self-Directed",
    type: "learning",
    description: "Intensive self-learning and project building phase",
    achievements: [
      "Built 20+ personal projects to master concepts",
      "Completed 100+ hours of online courses",
      "Started tech blog with 50+ articles"
    ],
    tech: ["HTML", "CSS", "JavaScript", "React", "Python"],
    icon: Lightbulb,
    category: "learning"
  }
];

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -50,
    scale: 0.95
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
      duration: 1.2,
      ease: "easeInOut",
      delay: 0.3
    }
  }
};

const getCategoryColor = (category) => {
  const colors = {
    professional: "from-violet-500 to-purple-500",
    internship: "from-blue-500 to-cyan-500", 
    freelance: "from-green-500 to-emerald-500",
    "open-source": "from-orange-500 to-red-500",
    learning: "from-pink-500 to-rose-500"
  };
  return colors[category] || "from-violet-500 to-cyan-500";
};

export default function Experience() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <MotionWrap delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Professional Journey
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From learning the basics to building production-ready applications
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
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-violet-500 origin-top"
            variants={lineVariants}
          />

          {/* Timeline items */}
          <div className="space-y-12">
            {experienceData.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;
              const categoryColors = getCategoryColor(item.category);
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:justify-between`}
                >
                  {/* Timeline dot with category color */}
                  <motion.div
                    className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${categoryColors} border-4 border-gray-900 z-10`}
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} ml-20 md:ml-0`}>
                    <MotionWrap delay={index * 0.1}>
                      <GlassCard className="p-6 group hover:scale-[1.02] transition-all duration-300">
                        {/* Header with icon, year and type */}
                        <div className={`flex items-center justify-between mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                          <div className={`flex items-center gap-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${categoryColors}/20 group-hover:from-opacity-30 transition-colors`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className={`flex items-center gap-2 text-sm ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-400">{item.year}</span>
                              </div>
                              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white/10 text-xs text-gray-300 border border-white/20">
                                {item.type}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Role and company */}
                        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">
                          {item.role}
                        </h3>
                        <p className="text-gray-400 mb-3">{item.company}</p>
                        
                        {/* Description */}
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Achievements */}
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-300 mb-2">Key Achievements:</p>
                          <ul className="space-y-1">
                            {item.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="text-sm text-gray-400 flex items-start gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${categoryColors} mt-2 flex-shrink-0`} />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-2 py-1 rounded bg-gray-800/50 text-xs text-gray-300 border border-gray-700/50 hover:border-violet-500/50 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
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
