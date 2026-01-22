import { Play, Music2, Sparkles, Zap, ChevronRight, Target, Radio } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      
      {/* NOUVELLE ARCHITECTURE ÉNERGÉTIQUE */}
      <div className="absolute inset-0">
        
        {/* Fond gradient amélioré */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950/80 to-emerald-950/40" />
        
        {/* NOUVEAU : Grille énergétique en arrière-plan */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 70%),
                            radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.05) 0%, transparent 60%)`,
            backgroundSize: '400px 400px, 300px 300px'
          }} />
        </div>

        {/* SILHOUETTE AMÉLIORÉE avec plus de détails */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-[500px]">
            
            {/* NOUVEAU : Cercle d'énergie concentrique */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Cercle externe */}
              <div className="w-[500px] h-[500px] rounded-full border border-red-500/10 animate-spin-slow" />
              {/* Cercle moyen */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-green-500/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
              {/* Cercle interne */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-red-500/20 animate-spin-slow" />
            </div>

            {/* Source de lumière ARRIÈRE PLUS INTENSE */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px]">
              {/* Noyau lumineux PRINCIPAL */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/50 via-red-500/30 to-emerald-500/40 rounded-full blur-3xl animate-pulse-slow" />
              
              {/* NOUVEAU : Second noyau énergétique */}
              <div className="absolute inset-10 bg-gradient-to-l from-emerald-600/30 via-green-500/20 to-red-600/30 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
              
              {/* Rayons lumineux AMÉLIORÉS */}
              <div className="absolute inset-0">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-0.5 h-80 bg-gradient-to-b from-transparent via-red-500/40 to-transparent"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
                      transformOrigin: 'center',
                      animation: `pulse-ray 3s ease-in-out infinite ${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* SILHOUETTE PRINCIPALE avec plus de détails */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-[450px]">
              
              {/* Forme de silhouette AMÉLIORÉE */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent rounded-3xl blur-sm">
                {/* NOUVEAU : Détails intérieurs de la silhouette */}
                <div className="absolute inset-4 rounded-2xl border border-gray-900/50" />
                <div className="absolute inset-8 rounded-xl border border-gray-800/30" />
              </div>
              
              {/* Contour lumineux PLUS PRONONCÉ */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/40 via-transparent to-emerald-500/40 rounded-3xl blur animate-pulse-slow" />
              
              {/* NOUVEAU : Points d'énergie stratégiques */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping shadow-lg shadow-red-500/50" />
                <Target className="w-5 h-5 text-red-400 animate-spin-slow" />
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping shadow-lg shadow-emerald-500/50 delay-300" />
              </div>
              
              {/* NOUVEAU : Barres d'énergie latérales */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-32 bg-gradient-to-b from-red-500 to-emerald-500 rounded-full animate-pulse" />
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-4 h-32 bg-gradient-to-b from-emerald-500 to-red-500 rounded-full animate-pulse delay-500" />
            </div>
          </div>
        </div>
        
        {/* PARTICULES AMÉLIORÉES avec trajectoires définies */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const isRed = i % 2 === 0;
            const size = 1 + (i % 3) * 0.5;
            return (
              <div
                key={i}
                className={`absolute rounded-full ${
                  isRed ? 'bg-red-400' : 'bg-emerald-400'
                } animate-orbit`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: '50%',
                  top: '50%',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${8 + (i % 4) * 2}s`,
                  transformOrigin: `${100 + (i % 5) * 50}px ${100 + Math.floor(i / 5) * 50}px`
                }}
              />
            );
          })}
        </div>
      </div>

      {/* CONTENU PRINCIPAL AMÉLIORÉ */}
      <div className="relative z-20 container mx-auto px-4 text-center py-20">
        
        {/* Badge énergétique AMÉLIORÉ */}
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="w-3 h-0.5 bg-gradient-to-r from-red-600 to-transparent" />
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <p className="text-xs sm:text-sm tracking-[0.4em] text-gray-400 uppercase font-light">
              FRÉQUENCE ÉNERGÉTIQUE
            </p>
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse delay-300" />
          </div>
          <div className="w-3 h-0.5 bg-gradient-to-r from-transparent to-emerald-600" />
        </div>

        {/* NOM AMÉLIORÉ avec effet 3D */}
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter">
            <span className="relative">
              {/* Texte principal */}
              <span className="text-white relative z-10">ZAMAZU</span>
              
              {/* Effet d'ombre portée énergétique */}
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-emerald-500 bg-clip-text text-transparent animate-gradient blur-lg opacity-80">
                ZAMAZU
              </span>
              
              {/* NOUVEAU : Effet de réflexion */}
              <span className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-t from-red-500/20 to-transparent blur-sm scale-y-[-1] opacity-50" />
            </span>
          </h1>
          
          {/* Barre d'énergie SOUS LE NOM */}
          <div className="relative h-1 w-56 sm:w-80 mx-auto mt-6">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-emerald-600 rounded-full blur-sm animate-pulse-slow" />
            <div className="absolute inset-0 flex">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-full bg-gradient-to-t from-red-500 to-emerald-500 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* DESCRIPTION AMÉLIORÉE */}
        <div className="max-w-xl mx-auto mb-10">
          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            <span className="text-red-300 font-medium">L'énergie condensée</span> en 
            <span className="text-emerald-300 font-medium"> forme pure</span>. 
            Une silhouette qui capte et redistribue l'essence créative.
            <br />
            <span className="text-sm text-gray-400 mt-2 block">
              Précision • Intensité • Évolution
            </span>
          </p>
        </div>

        {/* BOUTONS AMÉLIORÉS avec effets avancés */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          
          {/* BOUTON PRIMAIRE - ENERGIE MAX */}
          <button 
            onClick={() => window.location.href = "#discography"}
            className="group relative overflow-hidden"
          >
            {/* NOUVEAU : Effet de décharge électrique */}
            <div className="absolute -inset-3">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-red-500/20 to-emerald-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* NOUVEAU : Contenu du bouton amélioré */}
            <div className="relative flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 transition-all group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-red-500/30">
              <div className="relative">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {/* NOUVEAU : Effet de particule sur l'icône */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
              </div>
              <span className="text-base font-semibold tracking-wide">ACTIVER L'ÉNERGIE</span>
              <Zap className="w-6 h-6 text-yellow-300 animate-bounce" />
            </div>
          </button>
          
          {/* BOUTON SECONDAIRE - EXPLORATION */}
          <button 
            onClick={() => window.location.href = "#about"}
            className="group relative"
          >
            <div className="flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-gray-800 bg-gradient-to-r from-gray-900/60 to-black/60 hover:border-emerald-500/50 hover:bg-gradient-to-r hover:from-gray-900/80 hover:to-black/80 transition-all group-hover:scale-105">
              <Music2 className="w-6 h-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
              <span className="text-base text-gray-300 group-hover:text-white transition-colors font-medium">
                EXPLORER L'UNIVERS
              </span>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        </div>

        {/* STATISTIQUES AMÉLIORÉES avec barres */}
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "7", label: "ANS", color: "red", progress: 85 },
              { value: "10+", label: "PROJETS", color: "emerald", progress: 92 },
              { value: "25M+", label: "STREAMS", color: "red", progress: 78 }
            ].map((stat, i) => (
              <div key={i} className="group relative">
                {/* Fond de la carte */}
                <div className={`bg-gradient-to-b from-gray-900/30 to-black/30 rounded-xl p-4 border border-gray-800/50 group-hover:border-${stat.color}-500/30 transition-colors`}>
                  {/* Valeur */}
                  <div className={`text-3xl font-bold text-${stat.color}-400 mb-2 group-hover:scale-110 transition-transform`}>
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-xs text-gray-500 tracking-widest uppercase mb-3">
                    {stat.label}
                  </div>
                  
                  {/* NOUVEAU : Barre de progression */}
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-full transition-all duration-1000`}
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* INDICATEUR DE SCROLL AMÉLIORÉ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="group flex flex-col items-center"
          aria-label="Descendre"
        >
          <div className="text-xs text-gray-500 tracking-widest mb-3 animate-pulse">
            PLONGER DANS L'ÉNERGIE
          </div>
          <div className="relative">
            {/* Cercle externe */}
            <div className="w-12 h-12 rounded-full border-2 border-gray-800 group-hover:border-red-500/50 transition-colors animate-pulse-slow" />
            
            {/* Flèche centrale */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-red-500 to-emerald-500 rounded-full group-hover:scale-y-125 transition-transform" />
            </div>
            
            {/* NOUVEAU : Points orbitaux */}
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-red-400 rounded-full animate-orbit-fast"
                  style={{
                    left: '50%',
                    top: '50%',
                    animationDelay: `${i * 0.3}s`,
                    transformOrigin: '0 20px'
                  }}
                />
              ))}
            </div>
          </div>
        </button>
      </div>

      {/* NOUVELLES ANIMATIONS CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-ray {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        @keyframes orbit-fast {
          from { transform: rotate(0deg) translateX(15px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(15px) rotate(-360deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 300% auto;
          animation: gradient 3s ease infinite;
        }
        .animate-orbit {
          animation: orbit linear infinite;
        }
        .animate-orbit-fast {
          animation: orbit-fast 1s linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;