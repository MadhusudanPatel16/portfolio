import { useEffect, useState } from "react";
import Container from "../components/common/Container";
import MotionWrap from "../components/core/MotionWrap";
import SectionWrapper from "../components/layout/SectionWrapper";
import axiosClient from "../api/axiosClient";

export default function About() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          profileRes,
          projectsRes,
          clientsRes,
          skillsRes,
        ] = await Promise.all([
          axiosClient.get("/profile"),
          axiosClient.get("/projects"),
          axiosClient.get("/clients"),
          axiosClient.get("/skills"),
        ]);

        setProfile(profileRes.data);

        // 🔥 KPI calculation (REAL DATA)
        setStats([
          {
            label: "Projects Completed",
            value: `${projectsRes.data.length}+`,
          },
          {
            label: "Years Experience",
            value: "1+", // or calculate from start year
          },
          {
            label: "Happy Clients",
            value: `${clientsRes.data.length}+`,
          },
          {
            label: "Technologies",
            value: `${skillsRes.data.length}+`,
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SectionWrapper id="about">
      <Container>
        <MotionWrap delay={0.1}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Passionate about creating exceptional digital experiences
              </p>
              <a href="/about" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Explore more
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <MotionWrap delay={0.2}>
                <div>
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    {profile?.about || ""}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      What I Do
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {profile?.what_i_do?.map((role, index) => (
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

              {/* Right – KPIs (UNCHANGED UI) */}
              <MotionWrap delay={0.3}>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
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
