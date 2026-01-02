import Container from "../components/common/Container";
import MotionWrap from "../components/core/MotionWrap";
import ImageSlider from "../components/core/ImageSlider";
import { motion } from "framer-motion";
import { hero } from "../data/hero.js";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen relative flex items-center">
      {/* Background slider */}
      <div className="absolute inset-0 z-0">
        <ImageSlider images={hero.sliderImages} autoSlide={true} slideInterval={4000} />
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <Container className="relative z-20">
        <MotionWrap delay={0.2}>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
              {hero.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-12 leading-relaxed">
              {hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#projects"
                className="inline-block px-8 py-4 rounded-full
                         bg-emerald-500 text-black font-semibold text-lg
                         hover:bg-emerald-400 transform hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-emerald-500/25"
              >
                {hero.cta}
              </a>
              
              <a
                href="#contact"
                className="inline-block px-8 py-4 rounded-full
                         border-2 border-white/30 text-white font-semibold text-lg
                         hover:bg-white/10 hover:border-white/50 transform hover:scale-105
                         transition-all duration-300 backdrop-blur-sm"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </MotionWrap>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
