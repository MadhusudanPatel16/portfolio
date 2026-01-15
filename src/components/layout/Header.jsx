import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [profile, setProfile] = useState(null);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "#home", type: "anchor" },
    { name: "About", href: "#about", type: "anchor" },
    { name: "Journey", href: "#journey", type: "anchor" },
    // { name: "About", href: "/about", type: "link" },
    { name: "Skills", href: "#skills", type: "anchor" },
    { name: "Projects", href: "#projects", type: "anchor" },
    // { name: "Projects", href: "/projects", type: "link" },
    { name: "Testimonials", href: "#testimonials", type: "anchor" },
    { name: "Contact", href: "#contact", type: "anchor" },
    { name: "Case Studies", href: "/case-studies", type: "link" },
    { name: "Resume", href: "/resume", type: "link" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 50);
      setScrollProgress(scrollPercent);

      // Only track sections on home page
      if (location.pathname === '/') {
        const sections = ['home', 'about', 'journey', 'skills', 'projects', 'testimonials', 'contact'];
        const scrollPosition = scrollTop + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

   useEffect(() => {
      axiosClient
        .get("/profile")
        .then((res) => setProfile(res.data))
        .catch(console.error);
    }, []);

  const getSectionId = (href) => href.replace('#', '');

  const isActiveItem = (item) => {
    if (item.type === 'link') {
      return location.pathname === item.href;
    } else {
      return location.pathname === '/' && activeSection === getSectionId(item.href);
    }
  };

  const handleClick = (item) => {
    if (item.type === 'link') {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
      // Handle anchor scroll
      const element = document.getElementById(getSectionId(item.href));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-lg bg-black/40 border-b border-white/10 shadow-lg' 
            : 'backdrop-blur-md bg-black/20 border-b border-white/5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 font-bold text-xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            {profile?.avatar && (
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-emerald-400/50"
              />
            )}
            <Link to="/" className="block">
              {profile?.name}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item, index) => {
              const isActive = isActiveItem(item);

              return (
                <motion.div key={item.name}>
                  {item.type === 'link' ? (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Link
                        to={item.href}
                        className={`relative transition-colors duration-200 font-medium ${
                          isActive 
                            ? 'text-emerald-400' 
                            : 'text-gray-300 hover:text-emerald-400'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <a
                        href={item.href}
                        className={`relative transition-colors duration-200 font-medium ${
                          isActive 
                            ? 'text-emerald-400' 
                            : 'text-gray-300 hover:text-emerald-400'
                        }`}
                        onClick={() => handleClick(item)}
                      >
                        {item.name}
                      </a>
                    </motion.div>
                  )}

                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400"
                      layoutId="activeIndicator"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <div className="w-6 h-5 flex flex-col justify-center gap-1">
              <span className={`block h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <nav className="flex flex-col p-6 gap-4">
                {navItems.map((item) => {
                  const isActive = isActiveItem(item);

                  return (
                    <div key={item.name}>
                      {item.type === 'link' ? (
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`py-2 transition-colors duration-200 font-medium ${
                            isActive 
                              ? 'text-emerald-400' 
                              : 'text-gray-300 hover:text-emerald-400'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          onClick={() => handleClick(item)}
                          className={`py-2 transition-colors duration-200 font-medium ${
                            isActive 
                              ? 'text-emerald-400' 
                              : 'text-gray-300 hover:text-emerald-400'
                          }`}
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </div>
      </motion.header>
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  );
}
