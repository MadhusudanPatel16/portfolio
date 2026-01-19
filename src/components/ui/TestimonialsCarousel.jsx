import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, Users } from "lucide-react";
import MotionWrap from "../core/MotionWrap";
import GlassCard from "../core/GlassCard";
import axiosClient from "../../api/axiosClient";

/* ===================== ANIMATION CONFIG (UNCHANGED) ===================== */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function TestimonialsCarousel() {
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  /* ===================== FETCH TESTIMONIALS ===================== */
  useEffect(() => {
    axiosClient
      .get("/clients")
      .then((res) => {
        const formatted = res.data.map((item) => ({
          id: item._id,
          name: item.name,
          position: item.role,
          company: item.company,
          testimonial: item.message.replace(/"/g, ""),
          rating: item.rating,
          avatar: item.avatar
            ? item.avatar
            : item.name
                .split(" ")
                .map((n) => n[0])
                .join(""),
          project: "Client Project",
          date: new Date(item.createdAt).getFullYear(),
          tags: ["Client", "Review"]
        }));

        setTestimonialsData(formatted);
      })
      .catch(console.error);
  }, []);

  /* ===================== NAVIGATION ===================== */
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  /* ===================== AUTO PLAY ===================== */
  useEffect(() => {
    if (!isAutoPlaying || testimonialsData.length <= 1) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, testimonialsData.length]);

  /* ===================== SAFE GUARD ===================== */
  if (!testimonialsData.length) return null;

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

        {/* ===================== MAIN CAROUSEL ===================== */}
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
                  {/* CONTENT */}
                  <div className="md:col-span-2">
                    <Quote className="w-12 h-12 text-violet-400 mb-4" />

                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6">
                      "{currentTestimonial.testimonial}"
                    </p>

                    <div className="flex gap-1 mb-4">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center overflow-hidden">
                        {currentTestimonial.avatar.startsWith("http") ? (
                          <img
                            src={currentTestimonial.avatar}
                            alt={currentTestimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-bold">
                            {currentTestimonial.avatar}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-gray-400">
                          {currentTestimonial.position}
                        </p>
                        <p className="text-sm text-violet-400">
                          {currentTestimonial.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span>Project: {currentTestimonial.project}</span>
                      <span>•</span>
                      <span>{currentTestimonial.date}</span>
                    </div>

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

                  {/* AVATAR + STATS */}
                  <div className="text-center">
                    <motion.div
                      className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 p-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                        {currentTestimonial.avatar.startsWith("http") ? (
                          <img
                            src={currentTestimonial.avatar}
                            alt={currentTestimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl font-bold text-white">
                            {currentTestimonial.avatar}
                          </span>
                        )}
                      </div>
                    </motion.div>

                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <Users className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">
                          {testimonialsData.length}
                        </p>
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

            {/* CONTROLS */}
            <div className="flex justify-between items-center mt-8">
              <motion.button onClick={prevTestimonial} whileHover={{ scale: 1.1 }}>
                <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-violet-400" />
              </motion.button>

              <div className="flex gap-2">
                {testimonialsData.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? "bg-violet-400" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              <motion.button onClick={nextTestimonial} whileHover={{ scale: 1.1 }}>
                <ChevronRight className="w-6 h-6 text-gray-400 hover:text-violet-400" />
              </motion.button>
            </div>

            <div className="flex justify-center mt-4">
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-violet-400"
              >
                {isAutoPlaying ? "Pause" : "Play"} Auto-scroll
              </motion.button>
            </div>
          </div>
        </MotionWrap>

        {/* ===================== EXTRA GRID ===================== */}
        <MotionWrap delay={0.5}>
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">
              More Reviews
            </h3>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonialsData.slice(1, 4).map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  className="group"
                >
                  <GlassCard className="p-6 hover:scale-[1.02] transition-transform">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      "{testimonial.testimonial}"
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center overflow-hidden">
                        {testimonial.avatar.startsWith("http") ? (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-xs font-bold">
                            {testimonial.avatar}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {testimonial.position}
                        </p>
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
