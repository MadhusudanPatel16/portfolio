import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Database, Server } from "lucide-react";
import MotionWrap from "../core/MotionWrap";
import GlassCard from "../core/GlassCard";
import axiosClient from "../../api/axiosClient";


/* ===================== STATIC CONFIG (UNCHANGED) ===================== */

const categoryIcons = {
  "All": Code,
  "Frontend": Code,
  "Backend": Server,
  "Tools & DevOps": Database
};

const categoryColors = {
  "All": "from-pink-500 to-rose-500",
  "Frontend": "from-blue-500 to-cyan-500",
  "Backend": "from-green-500 to-emerald-500",
  "Tools & DevOps": "from-violet-500 to-purple-500"
};

const CATEGORY_MAP = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools & DevOps",
  devops: "Tools & DevOps"
};


export default function TechSkillsCompact() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [skillsData, setSkillsData] = useState({}); // ✅ API DATA
  const [animatedSkill, setAnimatedSkill] = useState(null);

  /* ===================== FETCH SKILLS ===================== */
  useEffect(() => {
    axiosClient.get("/skills")
      .then((res) => {
        const grouped = res.data.reduce(
          (acc, skill) => {
            const rawCategory = skill.category?.toLowerCase();
            const category = CATEGORY_MAP[rawCategory] || "Frontend";

            // 🔹 All skills
            acc.All.push(skill);

            // 🔹 Category-wise
            if (!acc[category]) acc[category] = [];
            acc[category].push(skill);

            return acc;
          },
          { All: [] } // 👈 initialize All
        );

        setSkillsData(grouped);
        setActiveCategory("All"); // 👈 show all first
      })
      .catch(console.error);
  }, []);



  if (!skillsData[activeCategory]) return null;
  ;
  return (
    <section id="skills" className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />

      <div className="max-w-6xl mx-auto relative z-10">
        <MotionWrap delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical Skills
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hover over skills to see proficiency levels
            </p>
          </div>
        </MotionWrap>

        {/* CATEGORY TABS */}
        <MotionWrap delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(skillsData).map((category) => {
              const Icon = categoryIcons[category];
              const colors = categoryColors[category];
              const isActive = activeCategory === category;

              return (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${isActive
                      ? "bg-gradient-to-r text-white border-transparent"
                      : "bg-gray-800/50 text-gray-400 border-gray-700/50 hover:border-violet-500/50 hover:text-violet-300"
                    } ${isActive ? colors : ""}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  {category}
                </motion.button>
              );
            })}
          </div>
        </MotionWrap>

        {/* SKILLS GRID */}
        <MotionWrap delay={0.4}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillsData[activeCategory]
              .sort((a, b) => a.order - b.order)
              .map((skill, index) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => {
                    setHoveredSkill(skill._id);
                    setAnimatedSkill(skill._id); // trigger re-animation
                  }}

                  onMouseLeave={() => {
                    setHoveredSkill(null);
                    setAnimatedSkill(null);
                  }}
                  className="group"
                >
                  <GlassCard className="p-6 text-center hover:scale-[1.02] transition-all duration-300 cursor-pointer">

                    {/* ✅ LOGO ADDED (ONLY VISUAL CHANGE) */}
                    <img
                      src={`${skill.logo}`}
                      alt={skill.name}
                      className="w-12 h-12 mx-auto mb-4 object-contain"
                    />

                    <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-violet-300 transition-colors">
                      {skill.name}
                      {hoveredSkill === skill._id && (
                        <span className="ml-2 text-xs text-green-400">✓</span>
                      )}
                    </h3>

                    {/* Progress Bar */}
                    <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden mb-2">
                      <motion.div
                        key={animatedSkill === skill._id ? "animate" : "static"}
                        className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>

                    {/* Percentage */}
                    <div
                      className="text-2xl font-bold text-white"
                      style={{
                        opacity: hoveredSkill === skill._id ? 1 : 1,
                        transform:
                          hoveredSkill === skill._id ? "scale(1)" : "scale(1)",
                        minHeight: "32px"
                      }}
                    >
                      {skill.proficiency}%
                    </div>


                    <p
                      className="text-xs text-gray-400"
                      style={{
                        opacity: hoveredSkill === skill._id ? 1 : 0,
                        transform:
                          hoveredSkill === skill._id
                            ? "translateY(0)"
                            : "translateY(-8px)",
                        transition: "all 0.3s ease-out",
                        minHeight: "16px"
                      }}
                    >
                      Proficiency Level
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
