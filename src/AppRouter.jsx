import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import ProfileSection3D from "./components/ui/ProfileSection3D";
import ProfileSection from "./components/ui/ProfileSection";
import About from "./sections/About";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import TechStackVisualization from "./components/ui/TechStackVisualization";
import Projects from "./sections/Projects";
import TestimonialsCarousel from "./components/ui/TestimonialsCarousel";
import Contact from "./sections/Contact";
import ProjectsPage from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import AboutPage from "./pages/About";
import ResumePage from "./pages/Resume";
import CaseStudiesPage from "./pages/CaseStudies";
import JourneyTimeline from "./components/ui/JourneyTimeline";
import TechSkillsCompact from "./components/ui/TechSkillsCompact";
import VisitorTracker from "./components/analytics/VisitorTracker";

function HomePage() {
  return (
    <>
      <Header />
      <ProfileSection />
      <About />
      <JourneyTimeline />
      <TechSkillsCompact />
      <Projects />
      <TestimonialsCarousel />
      <Contact />
    </>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <VisitorTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
      </Routes>
    </Router>
  );
}
