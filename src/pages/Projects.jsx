import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { ArrowLeft, Code, Lightbulb, Target, Users, Award, BookOpen, Zap, Github, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import Container from "../components/common/Container";
import SectionWrapper from "../components/layout/SectionWrapper";
import MotionWrap from "../components/core/MotionWrap";
import ProjectCard from "../components/ui/ProjectCard";

import axiosClient from '../api/axiosClient';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch Projects ---------------- */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosClient.get('/projects');
        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* ---------------- Categories ---------------- */
  const categories = [
    'all',
    ...new Set(projects.map((p) => p.category))
  ];

  /* ---------------- Filtered Projects ---------------- */
  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  /* ---------------- UI ---------------- */
  return (
    <SectionWrapper id="projects">
      <Container>

        {/* Heading */}
        <MotionWrap delay={0.1}>
          <motion.div initial="hidden" animate="visible">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore my recent work and side projects showcasing modern web development
            </p>
          </div>
        </motion.div>
        </MotionWrap>

        {/* Filters */}
        <MotionWrap delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300
                  ${
                    filter === category
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                  }
                `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </MotionWrap>

        {/* Loader */}
        {loading && (
          <div className="text-center py-16 text-gray-400">
            Loading projects...
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <MotionWrap
                key={project._id}
                delay={0.1 + index * 0.08}
              >
                <Link to={`/projects/${project._id}`}>
                  <ProjectCard project={project} />
                </Link>
              </MotionWrap>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}

        {/* View All Button
        <MotionWrap delay={0.5}>
          <div className="text-center mt-16">
            <Link
              to="/projects"
              className="inline-block px-8 py-4 rounded-full
                         border-2 border-emerald-500 text-emerald-400 font-semibold text-lg
                         hover:bg-emerald-500 hover:text-black transform hover:scale-105
                         transition-all duration-300"
            >
              View All Projects
            </Link>
          </div>
        </MotionWrap> */}

      </Container>
    </SectionWrapper>
  );
}
