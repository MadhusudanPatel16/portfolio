import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Github,
  ExternalLink,
  Code,
  Users,
  Lightbulb,
  Award
} from "lucide-react";

import MotionWrap from "../components/core/MotionWrap";
import GlassCard from "../components/core/GlassCard";
import axiosClient from "../api/axiosClient";


export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch Project ---------------- */
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axiosClient.get(`/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error("Failed to load project", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link to="/projects" className="text-violet-400">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-violet-400 mb-8"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">
                  {project.category}
                </span>
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={14} /> {project.duration}
                </span>
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <Users size={14} /> {project.team}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-gray-300 mb-6">
                {project.description}
              </p>

              <div className="flex gap-4">
                <a href={project.github} target="_blank" className="btn-primary">
                  <Github size={18} /> Code
                </a>
                <a href={project.live} target="_blank" className="btn-outline">
                  <ExternalLink size={18} /> Live
                </a>
              </div>
            </div>

            <GlassCard className="p-6 w-full md:w-96">
              <h3 className="font-semibold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech, i) => (
                  <span key={i} className="badge">
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <GlassCard className="p-8">
            <h3 className="text-xl mb-4">Problem</h3>
            <p className="text-gray-300">{project.problem}</p>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="text-xl mb-4">Solution</h3>
            <p className="text-gray-300">{project.solution}</p>
          </GlassCard>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {/* {project.images.map((img, i) => (
            <GlassCard key={i} className="p-4">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${img}`}
                alt=""
                className="rounded-lg"
              />
            </GlassCard>
          ))} */}
        </div>
      </section>

    </div>
  );
}
