import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code, Database, Globe, Brain, Palette, Server } from "lucide-react";
import MotionWrap from "../core/MotionWrap";
import GlassCard from "../core/GlassCard";

const skillsData = {
  "Frontend": [
    { name: "React", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Frontend" },
    { name: "JavaScript", level: 95, category: "Frontend" },
    { name: "TailwindCSS", level: 85, category: "Frontend" },
    { name: "Next.js", level: 80, category: "Frontend" },
    { name: "Vue.js", level: 70, category: "Frontend" }
  ],
  "Backend": [
    { name: "Node.js", level: 90, category: "Backend" },
    { name: "Express.js", level: 85, category: "Backend" },
    { name: "Python", level: 80, category: "Backend" },
    { name: "MongoDB", level: 85, category: "Backend" },
    { name: "PostgreSQL", level: 80, category: "Backend" },
    { name: "GraphQL", level: 75, category: "Backend" }
  ],
  "Tools & DevOps": [
    { name: "Git", level: 90, category: "Tools & DevOps" },
    { name: "Docker", level: 75, category: "Tools & DevOps" },
    { name: "AWS", level: 70, category: "Tools & DevOps" },
    { name: "CI/CD", level: 80, category: "Tools & DevOps" },
    { name: "Kubernetes", level: 65, category: "Tools & DevOps" },
    { name: "Figma", level: 80, category: "Tools & DevOps" }
  ]
};

const categoryIcons = {
  "Frontend": Code,
  "Backend": Server,
  "Tools & DevOps": Database
};

const categoryColors = {
  "Frontend": "from-blue-500 to-cyan-500",
  "Backend": "from-green-500 to-emerald-500",
  "Tools & DevOps": "from-violet-500 to-purple-500"
};

// Radar chart data
const radarData = [
  { skill: "React", level: 95, category: "Frontend" },
  { skill: "Node.js", level: 90, category: "Backend" },
  { skill: "TypeScript", level: 90, category: "Frontend" },
  { skill: "Python", level: 80, category: "Backend" },
  { skill: "Docker", level: 75, category: "Tools & DevOps" },
  { skill: "GraphQL", level: 75, category: "Backend" }
];

export default function TechStackVisualization() {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const canvasRef = useRef(null);

  // Draw radar chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    const angleStep = (Math.PI * 2) / radarData.length;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 1;
      
      for (let j = 0; j < radarData.length; j++) {
        const angle = j * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * i / 5);
        const y = centerY + Math.sin(angle) * (radius * i / 5);
        
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw axes
    radarData.forEach((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      ctx.stroke();
    });

    // Draw data
    ctx.beginPath();
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
    ctx.lineWidth = 2;

    radarData.forEach((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const distance = (item.level / 100) * radius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw points and labels
    radarData.forEach((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const distance = (item.level / 100) * radius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      // Draw point
      ctx.beginPath();
      ctx.fillStyle = hoveredSkill === item.skill ? '#8b5cf6' : '#06b6d4';
      ctx.arc(x, y, hoveredSkill === item.skill ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw label
      const labelX = centerX + Math.cos(angle) * (radius + 20);
      const labelY = centerY + Math.sin(angle) * (radius + 20);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.skill, labelX, labelY);
    });

  }, [hoveredSkill]);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <MotionWrap delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical Expertise
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Visual representation of my technical skills and proficiency levels across different domains
            </p>
          </div>
        </MotionWrap>

        {/* Radar Chart */}
        <MotionWrap delay={0.3}>
          <GlassCard className="p-8 mb-12">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Skills Radar</h3>
            
            <div className="flex justify-center mb-8">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  className="max-w-full h-auto"
                />
                
                {/* Legend */}
                <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur p-3 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-violet-500" />
                      <span className="text-xs text-gray-300">Current Level</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500" />
                      <span className="text-xs text-gray-300">Skill Point</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skill Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {radarData.map((skill) => (
                <motion.div
                  key={skill.skill}
                  className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setHoveredSkill(skill.skill)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white font-medium">{skill.skill}</span>
                    <span className="text-xs text-violet-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </MotionWrap>

        {/* Category Tabs */}
        <MotionWrap delay={0.4}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(skillsData).map((category) => {
              const Icon = categoryIcons[category];
              const colors = categoryColors[category];
              
              return (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r text-white border-transparent"
                      : "bg-gray-800/50 text-gray-400 border-gray-700/50 hover:border-violet-500/50"
                  } ${activeCategory === category ? colors : ''}`}
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

        {/* Progress Rings */}
        <MotionWrap delay={0.5}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData[activeCategory].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 text-center hover:scale-[1.02] transition-transform duration-300">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    {/* Background circle */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="12"
                        fill="none"
                      />
                      
                      {/* Progress circle */}
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="url(#gradient)"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: skill.level / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                        style={{
                          pathLength: skill.level / 100,
                          strokeDasharray: `${2 * Math.PI * 56}`,
                          strokeDashoffset: `${2 * Math.PI * 56 * (1 - skill.level / 100)}`
                        }}
                      />
                      
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Percentage text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{skill.level}%</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2">{skill.name}</h4>
                  <p className="text-sm text-gray-400">{skill.category}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </MotionWrap>

        {/* 3D Tech Cube */}
        <MotionWrap delay={0.6}>
          <GlassCard className="p-8 mt-12">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Technology Stack Overview</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(skillsData).map(([category, skills]) => {
                const Icon = categoryIcons[category];
                const colors = categoryColors[category];
                
                return (
                  <motion.div
                    key={category}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${colors} p-1`}>
                      <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-white mb-3">{category}</h4>
                    
                    <div className="space-y-2">
                      {skills.slice(0, 3).map((skill) => (
                        <div key={skill.name} className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">{skill.name}</span>
                          <span className="text-xs text-violet-400">{skill.level}%</span>
                        </div>
                      ))}
                      {skills.length > 3 && (
                        <span className="text-xs text-gray-500">+{skills.length - 3} more</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </MotionWrap>
      </div>
    </section>
  );
}
