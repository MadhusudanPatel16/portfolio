import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, Users } from "lucide-react";
import MotionWrap from "../core/MotionWrap";
import GlassCard from "../core/GlassCard";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CTO at TechStart Inc.",
    company: "TechStart Inc.",
    avatar: "SJ",
    rating: 5,
    testimonial: "Working with John was an absolute game-changer for our startup. He transformed our outdated codebase into a modern, scalable application that can handle 10x the traffic. His technical expertise and problem-solving skills are exceptional.",
    project: "E-Commerce Platform Redesign",
    date: "2024",
    tags: ["Full-Stack", "Performance", "Leadership"]
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager",
    company: "Digital Agency Pro",
    avatar: "MC",
    rating: 5,
    testimonial: "John's attention to detail and commitment to quality is unmatched. He not only delivered exceptional code but also provided valuable insights that improved our overall product strategy. A true professional who exceeds expectations.",
    project: "Client Dashboard Development",
    date: "2023",
    tags: ["Frontend", "UX", "Collaboration"]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Founder",
    company: "FitLife Studios",
    avatar: "ER",
    rating: 5,
    testimonial: "John helped us scale our mobile app from 10K to 1M+ users without any downtime. His expertise in performance optimization and system architecture was crucial to our success. Highly recommended!",
    project: "Mobile App Scaling",
    date: "2024",
    tags: ["Backend", "Scalability", "DevOps"]
  },
  {
    id: 4,
    name: "David Kim",
    position: "Senior Developer",
    company: "ServiceHub Inc.",
    avatar: "DK",
    rating: 5,
    testimonial: "As a mentor, John is outstanding. He guided our team through complex technical challenges and helped us level up our skills. His patience and ability to explain complex concepts simply is remarkable.",
    project: "Team Mentorship",
    date: "2023",
    tags: ["Mentorship", "Team Lead", "Knowledge Sharing"]
  },
  {
    id: 5,
    name: "Lisa Thompson",
    position: "Marketing Director",
    company: "RetailTech Solutions",
    avatar: "LT",
    rating: 5,
    testimonial: "John's AI-powered customer support system reduced our costs by 70% while improving customer satisfaction. He's not just a developer - he's a strategic partner who understands business needs.",
    project: "AI Support System",
    date: "2024",
    tags: ["AI/ML", "Innovation", "Business Impact"]
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
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <MotionWrap delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Client Testimonials
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              What clients and colleagues say about working with me
            </p>
          </div>
        </MotionWrap>

        {/* Main Carousel */}
        <MotionWrap delay={0.3}>
          <div className="relative">
            <GlassCard className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-3 gap-8 items-center"
                >
                  {/* Testimonial Content */}
                  <div className="md:col-span-2">
                    <div className="mb-6">
                      <Quote className="w-12 h-12 text-violet-400 mb-4" />
                      
                      <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6">
                        "{currentTestimonial.testimonial}"
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      {/* Client Info */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center">
                          <span className="text-white font-bold">{currentTestimonial.avatar}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{currentTestimonial.name}</h4>
                          <p className="text-gray-400">{currentTestimonial.position}</p>
                          <p className="text-sm text-violet-400">{currentTestimonial.company}</p>
                        </div>
                      </div>
                      
                      {/* Project Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <span>Project: {currentTestimonial.project}</span>
                        <span>•</span>
                        <span>{currentTestimonial.date}</span>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {currentTestimonial.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs border border-violet-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Avatar and Stats */}
                  <div className="text-center">
                    <motion.div
                      className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 p-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{currentTestimonial.avatar}</span>
                      </div>
                    </motion.div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <Users className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{testimonialsData.length}</p>
                        <p className="text-sm text-gray-400">Happy Clients</p>
                      </div>
                      
                      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">5.0</p>
                        <p className="text-sm text-gray-400">Average Rating</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </GlassCard>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-8">
              <motion.button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-violet-400 hover:border-violet-500/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonialsData.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-violet-400" : "bg-gray-600"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextTestimonial}
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

        {/* Additional Testimonials Grid */}
        <MotionWrap delay={0.5}>
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">More Reviews</h3>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonialsData.slice(1, 4).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  className="group"
                >
                  <GlassCard className="p-6 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      "{testimonial.testimonial}"
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{testimonial.name}</p>
                        <p className="text-xs text-gray-400">{testimonial.position}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
