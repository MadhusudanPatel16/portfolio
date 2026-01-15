import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Filter, TrendingUp, Users, Target, Lightbulb, BarChart3, Clock, Award } from "lucide-react";
import MotionWrap from "../components/core/MotionWrap";
import GlassCard from "../components/core/GlassCard";

const caseStudiesData = [
  {
    id: "ecommerce-transformation",
    title: "E-Commerce Platform Transformation",
    company: "RetailTech Solutions",
    category: "Digital Transformation",
    duration: "6 months",
    teamSize: "8 members",
    thumbnail: "ecommerce-case",
    overview: "Complete overhaul of legacy e-commerce platform resulting in 300% increase in conversion rates.",
    problem: "The client was struggling with a 10-year-old e-commerce platform that was slow, difficult to maintain, and had a 2% conversion rate. The technology stack was outdated, and the user experience was poor.",
    solution: "Led the complete migration from a monolithic PHP application to a modern MERN stack with microservices architecture. Implemented real-time inventory management, advanced search capabilities, and a seamless mobile experience.",
    process: [
      "Conducted comprehensive user research and competitive analysis",
      "Designed microservices architecture for scalability",
      "Implemented agile development methodology with 2-week sprints",
      "Created automated testing pipeline with 90% code coverage",
      "Gradual migration strategy to minimize business disruption"
    ],
    results: [
      "300% increase in conversion rates (2% to 8%)",
      "60% reduction in page load times",
      "99.9% uptime achieved",
      "40% reduction in operational costs",
      "Customer satisfaction score improved from 3.2 to 4.7/5"
    ],
    techStack: ["React", "Node.js", "MongoDB", "Redis", "Docker", "AWS", "GraphQL"],
    challenges: [
      "Migrating 10 years of historical data without data loss",
      "Maintaining business operations during transition",
      "Training team on new technologies and processes",
      "Handling 10x traffic increase after launch"
    ],
    learnings: [
      "Importance of gradual migration strategies",
      "Value of comprehensive automated testing",
      "Critical role of performance monitoring",
      "Need for proper team training and documentation"
    ]
  },
  {
    id: "ai-customer-support",
    title: "AI-Powered Customer Support System",
    company: "ServiceHub Inc.",
    category: "AI/ML Implementation",
    duration: "4 months",
    teamSize: "5 members",
    thumbnail: "ai-support-case",
    overview: "Implementation of AI chatbot reducing support costs by 70% while improving customer satisfaction.",
    problem: "Company was spending $50K/month on customer support with 24-hour response times and declining customer satisfaction scores due to inconsistent support quality.",
    solution: "Developed an AI-powered customer support system using natural language processing to handle 80% of customer inquiries automatically, with seamless human handoff for complex issues.",
    process: [
      "Analyzed 50,000+ support tickets to identify patterns",
      "Trained custom NLP model for industry-specific terminology",
      "Implemented multi-language support (English, Spanish, French)",
      "Created comprehensive knowledge base integration",
      "Developed real-time sentiment analysis for priority routing"
    ],
    results: [
      "70% reduction in support costs ($50K to $15K/month)",
      "95% of inquiries resolved within 5 minutes",
      "Customer satisfaction improved from 3.5 to 4.6/5",
      "Support team productivity increased by 300%",
      "24/7 support availability achieved"
    ],
    techStack: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL", "Docker", "AWS"],
    challenges: [
      "Training accurate NLP model for technical support",
      "Ensuring data privacy and compliance",
      "Handling edge cases and complex inquiries",
      "Maintaining human touch in automated responses"
    ],
    learnings: [
      "Critical importance of quality training data",
      "Value of human-AI collaboration patterns",
      "Need for continuous model improvement",
      "Importance of fallback mechanisms"
    ]
  },
  {
    id: "mobile-app-scalability",
    title: "Mobile App Performance Optimization",
    company: "FitLife Studios",
    category: "Performance Optimization",
    duration: "3 months",
    teamSize: "4 members",
    thumbnail: "mobile-scalability-case",
    overview: "Scaled mobile application to handle 1M+ users with 99.9% uptime and sub-second response times.",
    problem: "Mobile app was experiencing frequent crashes during peak hours, with 30-second load times and 60% user abandonment rate. Architecture couldn't handle growth beyond 100K users.",
    solution: "Redesigned backend architecture with horizontal scaling, implemented caching strategies, optimized database queries, and introduced real-time performance monitoring.",
    process: [
      "Conducted comprehensive performance audit",
      "Implemented database sharding and read replicas",
      "Added Redis caching layer with intelligent invalidation",
      "Optimized API responses and reduced payload sizes",
      "Implemented real-time monitoring and alerting system"
    ],
    results: [
      "99.9% uptime achieved (from 85%)",
      "Load time reduced to 1.2 seconds (from 30 seconds)",
      "Successfully scaled to 1M+ concurrent users",
      "User abandonment reduced by 85%",
      "App store rating improved from 2.8 to 4.5/5"
    ],
    techStack: ["React Native", "Node.js", "MongoDB", "Redis", "Kubernetes", "AWS", "Datadog"],
    challenges: [
      "Maintaining service during migration",
      "Database consistency across distributed systems",
      "Real-time performance monitoring at scale",
      "Balancing cost vs performance optimizations"
    ],
    learnings: [
      "Importance of performance monitoring from day one",
      "Value of caching strategies at different levels",
      "Critical role of database optimization",
      "Need for automated scaling policies"
    ]
  }
];

const categories = ["All", "Digital Transformation", "AI/ML Implementation", "Performance Optimization"];

const getCategoryIcon = (category) => {
  const icons = {
    "Digital Transformation": TrendingUp,
    "AI/ML Implementation": Lightbulb,
    "Performance Optimization": BarChart3
  };
  return icons[category] || Target;
};

const getCategoryColor = (category) => {
  const colors = {
    "Digital Transformation": "from-blue-500 to-cyan-500",
    "AI/ML Implementation": "from-purple-500 to-pink-500",
    "Performance Optimization": "from-green-500 to-emerald-500"
  };
  return colors[category] || "from-violet-500 to-cyan-500";
};

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredStudies = selectedCategory === "All" 
    ? caseStudiesData 
    : caseStudiesData.filter(study => study.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Case Studies
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Deep dives into real-world projects, showcasing technical decisions, business impact, and lessons learned.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <MotionWrap delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Filter className="w-5 h-5 text-gray-400" />
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-violet-600 border-violet-500 text-white"
                      : "bg-gray-800/50 border-gray-700/50 text-gray-400 hover:border-violet-500/50 hover:text-violet-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </MotionWrap>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {filteredStudies.map((study, index) => {
              const CategoryIcon = getCategoryIcon(study.category);
              const categoryColors = getCategoryColor(study.category);
              
              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="overflow-hidden">
                    {/* Header */}
                    <div className="p-8 border-b border-gray-800">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${categoryColors}/20`}>
                              <CategoryIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm text-gray-400">{study.category}</span>
                          </div>
                          
                          <h3 className="text-3xl font-bold text-white mb-2">{study.title}</h3>
                          <p className="text-lg text-violet-400 mb-4">{study.company}</p>
                          <p className="text-gray-300 leading-relaxed">{study.overview}</p>
                        </div>
                        
                        <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-8">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            {study.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Users className="w-4 h-4" />
                            {study.teamSize}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Problem */}
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-red-400" />
                            The Problem
                          </h4>
                          <p className="text-gray-300 leading-relaxed">{study.problem}</p>
                        </div>

                        {/* Solution */}
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-green-400" />
                            The Solution
                          </h4>
                          <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                        </div>
                      </div>

                      {/* Process */}
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-white mb-4">Our Process</h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {study.process.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                              <p className="text-gray-300 text-sm">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Results */}
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-400" />
                          Key Results
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                              <p className="text-gray-300 text-sm">{result}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-white mb-4">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {study.techStack.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-3 py-1 rounded bg-gray-800/50 text-sm text-gray-300 border border-gray-700/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Challenges & Learnings */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Challenges</h4>
                          <ul className="space-y-2">
                            {study.challenges.map((challenge, challengeIndex) => (
                              <li key={challengeIndex} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                                <p className="text-gray-300 text-sm">{challenge}</p>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Key Learnings</h4>
                          <ul className="space-y-2">
                            {study.learnings.map((learning, learningIndex) => (
                              <li key={learningIndex} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                <p className="text-gray-300 text-sm">{learning}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {filteredStudies.length === 0 && (
            <MotionWrap delay={0.4}>
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No case studies found in the "{selectedCategory}" category.
                </p>
              </div>
            </MotionWrap>
          )}
        </div>
      </section>
    </div>
  );
}
