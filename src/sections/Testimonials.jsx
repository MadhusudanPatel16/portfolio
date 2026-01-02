import Container from "../components/common/Container";
import SectionWrapper from "../components/layout/SectionWrapper";
import MotionWrap from "../components/core/MotionWrap";
import { testimonials, clients } from "../data/testimonials.js";
import { useState } from 'react';

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <SectionWrapper id="testimonials">
      <Container>
        <MotionWrap delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Client Testimonials
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              What my clients say about working with me
            </p>
          </div>
        </MotionWrap>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <MotionWrap key={testimonial.id} delay={0.2 + index * 0.1}>
              <div
                className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeTestimonial === index
                    ? 'bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
                onClick={() => setActiveTestimonial(index)}
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-emerald-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-gray-300 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonial.position} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </MotionWrap>
          ))}
        </div>

        {/* Client Logos */}
        <MotionWrap delay={0.5}>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-white mb-8">
              Trusted By Leading Companies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {clients.map((client, index) => (
                <MotionWrap key={client.name} delay={0.6 + index * 0.05}>
                  <a
                    href={client.url}
                    className="group flex items-center justify-center p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-8 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </a>
                </MotionWrap>
              ))}
            </div>
          </div>
        </MotionWrap>

        {/* Call to Action */}
        <MotionWrap delay={0.8}>
          <div className="text-center">
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to start your next project?
              </h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Let's collaborate and bring your ideas to life with exceptional code and design.
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-4 rounded-full bg-emerald-500 text-black font-semibold text-lg hover:bg-emerald-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </MotionWrap>
      </Container>
    </SectionWrapper>
  );
}
