import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Calendar, MapPin, Mail, Phone, Github, Linkedin, Globe, Award, BookOpen, Briefcase } from "lucide-react";
import MotionWrap from "../components/core/MotionWrap";
import GlassCard from "../components/core/GlassCard";

const experienceData = [
  {
    title: "Full Stack Developer",
    company: "Tech Startup Inc.",
    location: "San Francisco, CA",
    period: "2024 - Present",
    responsibilities: [
      "Architect and develop scalable web applications using MERN stack",
      "Lead a team of 5 developers in agile development environment",
      "Implement real-time features using WebSocket and Socket.io",
      "Optimize application performance, reducing load times by 60%",
      "Mentor junior developers and conduct code reviews"
    ],
    achievements: [
      "Increased user engagement by 40% through UX improvements",
      "Reduced server costs by 30% through optimization",
      "Successfully launched 3 major product features"
    ]
  },
  {
    title: "Frontend Developer Intern",
    company: "Digital Agency Pro",
    location: "New York, NY",
    period: "2023",
    responsibilities: [
      "Developed responsive web applications for enterprise clients",
      "Created reusable component library using React and TypeScript",
      "Collaborated with design team to implement pixel-perfect UI",
      "Improved accessibility scores across all client projects"
    ],
    achievements: [
      "Completed 5 client projects from design to deployment",
      "Improved accessibility scores from 75% to 95%",
      "Received outstanding performance review"
    ]
  }
];

const educationData = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "University of Engineering & Technology",
    location: "Boston, MA",
    period: "2020 - 2024",
    gpa: "3.8/4.0",
    achievements: [
      "Dean's List for 6 consecutive semesters",
      "Published research paper on AI optimization",
      "Led university coding club with 200+ members",
      "Graduated Magna Cum Laude"
    ]
  },
  {
    degree: "Full Stack Web Development",
    institution: "Coding Bootcamp Pro",
    location: "Online",
    period: "2023",
    gpa: "98%",
    achievements: [
      "Top 5% of graduating cohort",
      "Built 5 production-ready applications",
      "Mentored 15+ junior developers",
      "Received excellence in full-stack development award"
    ]
  }
];

const skillsData = {
  "Frontend": [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "TailwindCSS", level: 85 },
    { name: "Next.js", level: 80 }
  ],
  "Backend": [
    { name: "Node.js", level: 90 },
    { name: "Express.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "MongoDB", level: 85 },
    { name: "PostgreSQL", level: 80 }
  ],
  "Tools & Others": [
    { name: "Git", level: 90 },
    { name: "Docker", level: 75 },
    { name: "AWS", level: 70 },
    { name: "Figma", level: 80 },
    { name: "Agile/Scrum", level: 85 }
  ]
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Resume() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div variants={fadeInVariants} initial="hidden" animate="visible">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Resume
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                A comprehensive overview of my professional experience, education, and technical skills.
              </p>
              
              <motion.a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                Download PDF
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <MotionWrap delay={0.2}>
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-violet-400" />
                    <span className="text-gray-300">john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-violet-400" />
                    <span className="text-gray-300">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-violet-400" />
                    <span className="text-gray-300">San Francisco, CA</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-violet-400" />
                    <a href="https://github.com/johndoe" className="text-gray-300 hover:text-violet-300 transition-colors">
                      github.com/johndoe
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-violet-400" />
                    <a href="https://linkedin.com/in/johndoe" className="text-gray-300 hover:text-violet-300 transition-colors">
                      linkedin.com/in/johndoe
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-violet-400" />
                    <a href="https://johndoe.dev" className="text-gray-300 hover:text-violet-300 transition-colors">
                      johndoe.dev
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </MotionWrap>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <MotionWrap delay={0.3}>
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Professional Summary</h2>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                Results-driven Full Stack Developer with 2+ years of experience building scalable web applications 
                and leading development teams. Passionate about creating exceptional user experiences and writing 
                clean, maintainable code. Strong background in React, Node.js, and modern web technologies with 
                a proven track record of delivering high-impact projects.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Seeking opportunities to leverage technical expertise and leadership skills to contribute to innovative 
                projects and continue growing as a developer while making meaningful impact on users' lives.
              </p>
            </GlassCard>
          </MotionWrap>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <MotionWrap delay={0.4}>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Professional Experience</h2>
            
            <div className="space-y-8">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <GlassCard className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-2">{exp.title}</h3>
                        <p className="text-lg text-violet-400 mb-2">{exp.company}</p>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exp.period}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-violet-400" />
                          Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-violet-400" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </MotionWrap>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <MotionWrap delay={0.5}>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Education</h2>
            
            <div className="space-y-8">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={fadeInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <GlassCard className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-2">{edu.degree}</h3>
                        <p className="text-lg text-violet-400 mb-2">{edu.institution}</p>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {edu.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {edu.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            GPA: {edu.gpa}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-violet-400" />
                        Achievements
                      </h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </MotionWrap>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <MotionWrap delay={0.6}>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Skills</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(skillsData).map(([category, skills]) => (
                <GlassCard key={category} className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">{category}</h3>
                  
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 text-sm">{skill.name}</span>
                          <span className="text-violet-400 text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </MotionWrap>
        </div>
      </section>
    </div>
  );
}
