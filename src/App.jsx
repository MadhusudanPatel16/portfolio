import Header from "./components/layout/Header";
import ProfileSection from "./components/ui/ProfileSection";
import About from "./sections/About";
import TechSkillsGrid from "./components/ui/TechSkillsGrid";
import Projects from "./sections/Projects";
// import CaseStudies from "./sections/CaseStudies";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <>
      <Header />
      <ProfileSection />
      <About />
      <TechSkillsGrid />
      <Projects />
      {/* <CaseStudies /> */}
      <Testimonials />
      <Contact />
    </>
  );
}
