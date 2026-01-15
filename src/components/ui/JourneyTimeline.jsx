import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Play,
  Pause
} from "lucide-react";
import GlassCard from "../core/GlassCard";
import axiosClient from "../../api/axiosClient";
 // ✅ added

export default function JourneyTimeline() {
  const [activeType, setActiveType] = useState("professional");
  const [journeyData, setJourneyData] = useState([]); // ✅ API data
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true);

  /* ===================== FETCH DATA ===================== */
  useEffect(() => {
    setLoading(true);

    axiosClient
      .get(`/journeys?type=${activeType}`)
      .then((res) => {
        setJourneyData(res.data);
        setIndex(0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeType]);

  const current = journeyData[index];

  /* ===================== AUTO PLAY ===================== */
  useEffect(() => {
    if (!autoPlay || journeyData.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % journeyData.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [autoPlay, journeyData.length]);

  if (loading || !current) return null;

  return (
    <section id="journey" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My Journey
          </h2>
          <p className="text-gray-400 mt-4">
            Education and professional experience timeline
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-center gap-4 mb-12">
          <div className="flex bg-white/10 rounded-full p-1">
            <button
              onClick={() => {
                setActiveType("professional");
                setIndex(0);
              }}
              className={`px-6 py-2 rounded-full ${
                activeType === "professional"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-400"
              }`}
            >
              Professional
            </button>
            <button
              onClick={() => {
                setActiveType("education");
                setIndex(0);
              }}
              className={`px-6 py-2 rounded-full ${
                activeType === "education"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-400"
              }`}
            >
              Education
            </button>
          </div>

          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="p-3 bg-white/10 rounded-full hover:bg-white/20"
          >
            {autoPlay ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-12 gap-10 items-start">
          {/* TIMELINE DOTS */}
          <div className="col-span-2 flex flex-col items-center relative">
            <div className="absolute h-full w-[2px] bg-white/10" />

            {journeyData.map((item, i) => (
              <button
                key={item._id} // ✅ backend id
                onClick={() => {
                  setIndex(i);
                  setAutoPlay(false);
                }}
                className={`z-10 mb-10 w-4 h-4 rounded-full transition-all ${
                  i === index
                    ? "bg-emerald-400 scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* FOCUSED CARD */}
          <div className="col-span-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current._id}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="p-10 max-w-4xl">
                  {/* HEADER */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white">
                        {current.title}
                      </h3>
                      <p className="text-emerald-400 mt-1">
                        {current.institution}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {current.year}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-gray-300 mb-8">
                    {current.description}
                  </p>

                  {/* ACHIEVEMENTS */}
                  <motion.ul
                    className="space-y-3 mb-8"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.08 } }
                    }}
                  >
                    {current.achievements.map((item, i) => (
                      <motion.li
                        key={i}
                        className="text-gray-300 flex items-center gap-3"
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          show: { opacity: 1, x: 0 }
                        }}
                      >
                        <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* TECH STACK */}
                  <div className="flex flex-wrap gap-3">
                    {current.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
