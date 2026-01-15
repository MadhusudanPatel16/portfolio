import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Code, Lightbulb, Target, Users, Award, BookOpen, Zap, Github, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import MotionWrap from "../components/core/MotionWrap";
import GlassCard from "../components/core/GlassCard";

const valuesData = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code that follows best practices."
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Approaching challenges with analytical thinking and creative solutions."
  },
  {
    icon: Target,
    title: "User-Centered",
    description: "Building products that solve real problems and provide exceptional user experiences."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively in teams and communicating ideas clearly."
  }
];

const philosophyData = [
  {
    title: "Continuous Learning",
    description: "Technology evolves rapidly, and I believe in staying curious and constantly expanding my knowledge base.",
    icon: BookOpen
  },
  {
    title: "Pragmatic Approach",
    description: "Choosing the right tools for the job rather than following trends blindly.",
    icon: Zap
  },
  {
    title: "Quality First",
    description: "Building robust applications that can scale and maintain performance over time.",
    icon: Award
  }
];

const statsData = [
  { number: "50+", label: "Projects Completed" },
  { number: "3+", label: "Years Experience" },
  { number: "10K+", label: "Hours Coded" },
  { number: "100%", label: "Client Satisfaction" }
];

const recentWorkData = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack application with real-time inventory and payment processing",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "#"
  },
  {
    title: "AI Chatbot System",
    description: "Intelligent customer support system with NLP capabilities",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
    link: "#"
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile application with offline capabilities",
    tech: ["React Native", "Firebase", "Redux"],
    link: "#"
  }
];

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

export default function About() {
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
                About Me
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                My journey as a developer, my approach to problem-solving, and what drives me to create meaningful digital experiences.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <MotionWrap delay={0.3}>
            <div className="grid md:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="p-6 text-center hover:scale-[1.02] transition-transform duration-300">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</h3>
                    <p className="text-gray-400">{stat.label}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </MotionWrap>
        </div>
      </section>

      {/* My Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <MotionWrap delay={0.4}>
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">My Story</h2>
              
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2 space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    My journey into software development began with a curiosity about how things work on the internet. 
                    What started as experimenting with HTML and CSS quickly evolved into a passion for creating 
                    interactive and impactful digital experiences.
                  </p>
                  
                  <p>
                    Throughout my career, I've had the opportunity to work on diverse projects - from e-commerce 
                    platforms serving thousands of users to AI-powered applications that automate complex processes. 
                    Each project has taught me valuable lessons about scalability, user experience, and the importance 
                    of writing clean, maintainable code.
                  </p>
                  
                  <p>
                    I believe that great software is not just about writing code that works - it's about understanding 
                    the problems users face and crafting solutions that make their lives better. This user-centered 
                    approach guides every decision I make, from architecture design to the smallest UI details.
                  </p>
                </div>
                
                <div className="text-center">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Working"
                    className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-violet-500/30"
                  />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <Mail className="w-4 h-4" />
                      john.doe@example.com
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <Phone className="w-4 h-4" />
                      +1 (555) 123-4567
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      San Francisco, CA
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </MotionWrap>
        </div>
      </section>

      {/* Recent Work Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <MotionWrap delay={0.5}>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Recent Work</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {recentWorkData.map((work, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform duration-300">
                    <h3 className="text-xl font-semibold text-white mb-3">{work.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{work.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {work.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 rounded bg-violet-500/20 text-violet-300 text-xs border border-violet-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href={work.link}
                      className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors text-sm"
                    >
                      View Project <ExternalLink className="w-4 h-4" />
                    </a>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </MotionWrap>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <MotionWrap delay={0.3}>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Values</h2>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {valuesData.map((value, index) => {
                const Icon = value.icon;
                
                return (
                  <motion.div
                    key={index}
                    variants={fadeInVariants}
                  >
                    <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform duration-300">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-violet-400" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {value.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </MotionWrap>
        </div>
      </section>

      {/* Development Philosophy */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <MotionWrap delay={0.4}>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Development Philosophy</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {philosophyData.map((item, index) => {
                const Icon = item.icon;
                
                return (
                  <MotionWrap key={index} delay={index * 0.1}>
                    <GlassCard className="p-6 h-full">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-3">
                            {item.title}
                          </h3>
                          
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </MotionWrap>
                );
              })}
            </div>
          </MotionWrap>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <MotionWrap delay={0.5}>
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Tools Philosophy</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="leading-relaxed">
                  I believe in choosing the right tool for the job rather than being dogmatic about any particular 
                  technology stack. My approach to tool selection is based on:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Frontend Excellence</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                        React ecosystem for component-based architecture
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                        TypeScript for type safety and better developer experience
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                        Modern CSS solutions (Tailwind, CSS-in-JS) for maintainable styles
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Backend Strength</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        Node.js for full-stack JavaScript development
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        Python for data processing and machine learning tasks
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        Cloud services for scalable and reliable deployment
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </GlassCard>
          </MotionWrap>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <MotionWrap delay={0.6}>
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Beyond Code</h2>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge through technical writing. I believe in the power of community and the importance 
                  of giving back to the developer ecosystem that has given me so much.
                </p>
                
                <p>
                  I'm also passionate about mentoring junior developers and helping them navigate their career paths. 
                  Seeing others grow and succeed brings me immense satisfaction, and I actively participate in 
                  coding bootcamps and tech meetups whenever possible.
                </p>
                
                <div className="pt-6 border-t border-gray-800">
                  <p className="text-violet-400 font-medium">
                    "The best code is not just functional - it's elegant, maintainable, and makes a real difference in people's lives."
                  </p>
                </div>
              </div>
            </GlassCard>
          </MotionWrap>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <MotionWrap delay={0.7}>
            <GlassCard className="p-8 text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-gray-400 mb-6">
                Whether you have a project in mind or just want to chat about technology, I'd love to hear from you.
              </p>
              
              <div className="flex gap-4 justify-center">
                <Link 
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                >
                  View My Work
                </Link>
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-violet-500/50 hover:border-violet-500 rounded-lg transition-colors"
                >
                  Get In Touch
                </Link>
              </div>
            </GlassCard>
          </MotionWrap>
        </div>
      </section>
    </div>
  );
}