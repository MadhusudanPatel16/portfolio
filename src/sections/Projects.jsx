import Container from "../components/common/Container";
import SectionWrapper from "../components/layout/SectionWrapper";
import MotionWrap from "../components/core/MotionWrap";
import { projects } from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";
import { useState } from 'react';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <SectionWrapper id="projects">
      <Container>
        <MotionWrap delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore my recent work and side projects showcasing modern web development
            </p>
          </div>

          {/* Filter Buttons */}
          <MotionWrap delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </MotionWrap>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <MotionWrap key={project.title} delay={0.1 + index * 0.1}>
                <ProjectCard project={project} />
              </MotionWrap>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}

          {/* View More Button */}
          <MotionWrap delay={0.5}>
            <div className="text-center mt-16">
              <a
                href="#contact"
                className="inline-block px-8 py-4 rounded-full
                         border-2 border-emerald-500 text-emerald-400 font-semibold text-lg
                         hover:bg-emerald-500 hover:text-black transform hover:scale-105
                         transition-all duration-300"
              >
                Have a project in mind? Let's talk
              </a>
            </div>
          </MotionWrap>
        </MotionWrap>
      </Container>
    </SectionWrapper>
  );
}
