import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['home', 'about', 'skills', 'projects', 'case-studies', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

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
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  const getSectionId = (href) => href.replace('#', '');

  return (
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
          className="font-bold text-xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          Madhusudan
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item, index) => {
            const sectionId = getSectionId(item.href);
            const isActive = activeSection === sectionId;
            
            return (
              <motion.a
                key={item.name}
                href={item.href}
                className={`relative transition-colors duration-200 font-medium ${
                  isActive 
                    ? 'text-emerald-400' 
                    : 'text-gray-300 hover:text-emerald-400'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {item.name}
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400"
                    layoutId="activeIndicator"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
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
            exit={{ opacity: 0, y: -20 }}
          >
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item) => {
                const sectionId = getSectionId(item.href);
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-2 transition-colors duration-200 font-medium ${
                      isActive 
                        ? 'text-emerald-400' 
                        : 'text-gray-300 hover:text-emerald-400'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
