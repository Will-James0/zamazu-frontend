import { Instagram, Youtube, Music2, Twitter, Flame, Zap, Star } from "lucide-react";
import React from "react";

const FooterSection = () => {
  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Background énergétique */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-red-900/10 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-green-900/5 to-transparent" />
      </div>

      {/* Éclats de lumière - FIX: Suppression totale de l'attribut style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`twinkle-particle absolute w-1 h-1 rounded-full particle-idx-${i} ${
              i % 3 === 0 ? 'bg-red-400' : i % 3 === 1 ? 'bg-green-400' : 'bg-red-300'
            }`}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          
          {/* Logo avec effet de feu */}
          <div className="mb-4 relative">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-3 h-3 text-red-500 animate-pulse" />
              <Zap className="w-3 h-3 text-red-400 animate-bounce" />
              <Star className="w-3 h-3 text-green-500 animate-spin-slow" />
            </div>
            
            <h2 className="text-2xl font-bold text-center">
              <span className="bg-linear-to-r from-red-400 via-red-500 to-rose-600 bg-clip-text text-transparent animate-gradient-flow">
                ZAMAZU
              </span>
            </h2>
            
            <div className="h-0.5 w-12 mx-auto mt-1 bg-linear-to-r from-red-500 via-green-500 to-red-500 rounded-full" />
          </div>

          {/* Socials - Accessibilité corrigée avec aria-label */}
          <div className="flex gap-2 mb-4">
            {[
              { icon: Instagram, label: "Instagram", color: 'hover:shadow-[0_0_15px_rgba(236,72,153,0.7)]' },
              { icon: Youtube, label: "Youtube", color: 'hover:shadow-[0_0_15px_rgba(239,68,68,0.7)]' },
              { icon: Music2, label: "TikTok", color: 'hover:shadow-[0_0_15px_rgba(16,185,129,0.7)]' },
              { icon: Twitter, label: "Twitter", color: 'hover:shadow-[0_0_15px_rgba(14,165,233,0.7)]' }
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                aria-label={social.label}
                className="relative group transform transition-all duration-300 hover:scale-125 hover:rotate-6"
              >
                <div className={`relative w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 group-hover:text-white ${social.color} transition-all duration-300`}>
                  <social.icon className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

          {/* Signature finale */}
          <div className="text-center">
            <p className="text-[10px] tracking-widest text-gray-400">
              <span className="text-red-400 animate-pulse">⚡</span>
              <span className="mx-1 uppercase font-light">Powered by</span>
              <span className="text-green-400 font-bold mx-1">Passion</span>
              <span className="text-red-400 animate-pulse delay-300">⚡</span>
            </p>
            
            <div className="flex justify-center gap-2 mt-1">
              <div className="w-4 h-0.5 bg-linear-to-r from-red-500 to-transparent rounded-full" />
              <p className="text-[9px] text-gray-500">© {new Date().getFullYear()}</p>
              <div className="w-4 h-0.5 bg-linear-to-r from-transparent to-green-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-flow {
          background-size: 200% auto;
          animation: gradientFlow 3s ease infinite;
        }

        /* Génération des positions sans styles en ligne */
        ${[...Array(12)].map((_, i) => `
          .particle-idx-${i} {
            left: ${5 + i * 8}%;
            top: ${20 + (i * 17) % 70}%;
            animation: twinkle ${1.5 + (i % 3)}s infinite ${i * 0.2}s;
          }
        `).join('')}
      `}</style>
    </footer>
  );
};

export default FooterSection;