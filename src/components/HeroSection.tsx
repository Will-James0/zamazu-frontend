import { Play, Music2, Sparkles, Zap, ChevronRight, Target, Radio } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      
      {/* ARCHITECTURE ÉNERGÉTIQUE */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950/80 to-emerald-950/40" />
        
        {/* Grille énergétique en arrière-plan */}
        <div className="absolute inset-0 opacity-20 bg-energy-grid" />

        {/* SILHOUETTE avec cercles concentriques */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-125">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-125 h-125 rounded-full border border-red-500/10 animate-spin-slow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full border border-green-500/10 animate-spin-reverse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 rounded-full border border-red-500/20 animate-spin-slow" />
            </div>

            {/* Source de lumière */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-112.5 h-112.5">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/50 via-red-500/30 to-emerald-500/40 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute inset-10 bg-gradient-to-l from-emerald-600/30 via-green-500/20 to-red-600/30 rounded-full blur-2xl animate-pulse-delayed" />
              
              {/* Rayons lumineux */}
              <div className="absolute inset-0">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className={`pulse-ray pulse-ray-${i}`} />
                ))}
              </div>
            </div>
            
            {/* SILHOUETTE PRINCIPALE */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-112.5">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent rounded-3xl blur-sm">
                <div className="absolute inset-4 rounded-2xl border border-gray-900/50" />
                <div className="absolute inset-8 rounded-xl border border-gray-800/30" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/40 via-transparent to-emerald-500/40 rounded-3xl blur animate-pulse-slow" />
              
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping shadow-lg shadow-red-500/50" />
                <Target className="w-5 h-5 text-red-400 animate-spin-slow" />
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping shadow-lg shadow-emerald-500/50 delay-300" />
              </div>
              
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-32 bg-gradient-to-b from-red-500 to-emerald-500 rounded-full animate-pulse" />
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-4 h-32 bg-gradient-to-b from-emerald-500 to-red-500 rounded-full animate-pulse delay-500" />
            </div>
          </div>
        </div>
        
        {/* PARTICULES */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className={`particle particle-${i} ${i % 2 === 0 ? 'bg-red-400' : 'bg-emerald-400'}`} />
          ))}
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="relative z-20 container mx-auto px-4 text-center py-20">
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="w-3 h-0.5 bg-gradient-to-r from-red-600 to-transparent" />
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <p className="text-xs sm:text-sm tracking-[0.4em] text-gray-400 uppercase font-light">FRÉQUENCE ÉNERGÉTIQUE</p>
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse delay-300" />
          </div>
          <div className="w-3 h-0.5 bg-gradient-to-r from-transparent to-emerald-600" />
        </div>

        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter">
            <span className="relative">
              <span className="text-white relative z-10">ZAMAZU</span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-emerald-500 bg-clip-text text-transparent animate-gradient-text blur-lg opacity-80">
                ZAMAZU
              </span>
            </span>
          </h1>
          
          <div className="relative h-1 w-56 sm:w-80 mx-auto mt-6">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-emerald-600 rounded-full blur-sm animate-pulse-slow" />
            <div className="absolute inset-0 flex">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className={`energy-bar energy-bar-${i}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white">
            Plateforme Musicale Officielle
          </p>
          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Découvrez l'univers musical de ZAMAZU : <span className="text-red-300 font-medium">singles, freestyles, projets exclusifs</span> et <span className="text-emerald-300 font-medium">contenus inédits</span>. Une expérience immersive au cœur du rap conscient camerounais.
          </p>
        </div>

        {/* Indicateurs de contenu */}
        <div className="flex flex-wrap gap-3 justify-center mb-10 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/60 border border-gray-800">
            <Music2 className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-300">Albums & Singles</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/60 border border-gray-800">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-300">Contenus Exclusifs</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/60 border border-gray-800">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Freestyles & Clips</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="group relative overflow-hidden" onClick={() => window.location.href = "/auth"}>
            <div className="relative flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 transition-all group-hover:scale-105 shadow-lg shadow-red-900/50">
              <Play className="w-6 h-6" />
              <span className="text-base font-semibold tracking-wide">ÉCOUTER MAINTENANT</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
          
          <button className="group relative" onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <div className="flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-gray-800 bg-gradient-to-r from-gray-900/60 to-black/60 hover:border-emerald-500/50 hover:bg-gradient-to-r hover:from-gray-900/80 hover:to-black/80 transition-all group-hover:scale-105">
              <Target className="w-6 h-6 text-gray-400 group-hover:text-emerald-400" />
              <span className="text-base text-gray-300 group-hover:text-white font-medium">EN SAVOIR PLUS</span>
            </div>
          </button>
        </div>
      </div>

      <style>{`
        .bg-energy-grid {
          background-image: radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 70%),
                            radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.05) 0%, transparent 60%);
          background-size: 400px 400px, 300px 300px;
        }
        .animate-spin-reverse { animation: spin 8s linear infinite reverse; }
        .animate-pulse-delayed { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; animation-delay: 1.5s; }
        @keyframes gradient-text { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient-text { background-size: 200% auto; animation: gradient-text 5s ease infinite; }
        
        .energy-bar { flex: 1; height: 100%; background: linear-gradient(to top, #ef4444, #10b981); animation: pulse 2s infinite; }
        ${[...Array(20)].map((_, i) => `.energy-bar-${i} { animation-delay: ${i * 0.1}s; }`).join('\n')}

        .pulse-ray {
          position: absolute; top: 50%; left: 50%; width: 2px; height: 320px;
          background: linear-gradient(to bottom, transparent, rgba(239, 68, 68, 0.4), transparent);
          transform-origin: center;
        }
        ${[...Array(24)].map((_, i) => `
          .pulse-ray-${i} { 
            transform: translate(-50%, -50%) rotate(${i * 15}deg); 
            animation: pulse-ray-anim 3s ease-in-out infinite ${i * 0.1}s; 
          }
        `).join('')}
        @keyframes pulse-ray-anim { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }

        .particle { position: absolute; border-radius: 50%; left: 50%; top: 50%; width: 2px; height: 2px; }
        ${[...Array(30)].map((_, i) => `
          .particle-${i} { 
            animation: orbit-${i} ${8 + (i % 4) * 2}s linear infinite; 
            animation-delay: ${i * 0.1}s;
          }
          @keyframes orbit-${i} {
            from { transform: rotate(0deg) translateX(${100 + (i % 5) * 50}px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(${100 + (i % 5) * 50}px) rotate(-360deg); }
          }
        `).join('')}
      `}</style>
    </section>
  );
};

export default HeroSection;