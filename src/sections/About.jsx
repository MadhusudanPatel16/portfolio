import Container from "../components/common/Container";
import MotionWrap from "../components/core/MotionWrap";
import SectionWrapper from "../components/layout/SectionWrapper";
import { about } from "../data/about.js";

export default function About() {
  return (
    <SectionWrapper id="about">
      <Container>
        <MotionWrap delay={0.1}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {about.title}
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {about.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left side - Description */}
              <MotionWrap delay={0.2}>
                <div>
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    {about.description}
                  </p>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">What I Do</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {about.roles.map((role, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                          <span className="text-gray-300">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionWrap>

              {/* Right side - Stats */}
              <MotionWrap delay={0.3}>
                <div className="grid grid-cols-2 gap-6">
                  {about.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </MotionWrap>
            </div>
          </div>
        </MotionWrap>
      </Container>
    </SectionWrapper>
  );
}
