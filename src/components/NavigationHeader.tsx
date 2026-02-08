import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Zap, Music2, Briefcase, User } from "lucide-react";
import logoImg from '@/assets/images/logo.png';

const NavigationHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Accueil", href: "#", icon: Sparkles },
    { label: "À propos", href: "#about", icon: User },
    { label: "Réalisations", href: "#realisations", icon: Music2 },
    { label: "Services", href: "#services", icon: Briefcase },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-lg border-b border-gray-900/30 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      {/* Ligne énergétique haute */}
      <div className={`h-0.5 bg-linear-to-r from-red-500 via-red-400 to-green-500 transition-opacity duration-500 ${
        isScrolled ? 'opacity-30' : 'opacity-20'
      }`} />
      
      <div className="container mx-auto px-3 sm:px-4">
        <nav className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative">
              <img 
                src={logoImg} 
                alt="Zamazu Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-md group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-base sm:text-lg font-medium text-white">
              <span className="text-red-400">Z</span>
              <span className="text-gray-300">M</span>
              <span className="text-green-400">Z</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative px-3 py-1.5"
                >
                  <div className="flex items-center gap-1.5">
                    <IconComponent className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-400 transition-colors" />
                    <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-4/5 h-0.5 bg-linear-to-r from-red-500 to-green-500 rounded-full transition-all duration-300" />
                </a>
              );
            })}
            
            <button 
              onClick={() => window.location.href = "/auth"}
              className="ml-2 group relative overflow-hidden"
            >
              <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-linear-to-r from-red-600/10 to-green-600/5 border border-gray-800 group-hover:border-red-500/40 transition-colors">
                <span className="text-xs font-medium text-white">Écouter</span>
                <Zap className="w-3 h-3 text-gray-400 group-hover:text-red-400 transition-colors" />
              </div>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <div className="p-1.5 rounded-md bg-linear-to-br from-red-500/10 to-transparent border border-gray-800 group-hover:border-red-500/30 transition-colors">
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-red-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300 group-hover:text-red-400 transition-colors" />
              )}
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-xl border-b border-gray-900/30 shadow-xl">
          <div className="container mx-auto px-3 py-3">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-linear-to-r hover:from-red-500/10 hover:to-green-500/5 transition-all group"
                  >
                    <IconComponent className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                    <div className="ml-auto w-1.5 h-1.5 bg-linear-to-r from-red-500 to-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
              
              <div className="my-2 px-4">
                <div className="h-px bg-linear-to-r from-transparent via-gray-800 to-transparent" />
              </div>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = "/auth";
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-linear-to-r from-red-600/20 to-green-600/10 border border-red-500/30 hover:border-red-500/50 transition-colors group"
              >
                <Sparkles className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-sm font-medium text-white">Écouter maintenant</span>
                <Zap className="w-4 h-4 text-green-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;