import { Sparkles, Gem, Target, Zap, Brain, TrendingUp } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Brain,
      title: "Conscience Sonique",
      description: "Chaque composition est une architecture de pensée. La musique comme outil d'éveil et de transformation mentale.",
      accent: "text-red-400",
      gradient: "from-red-500/20 to-transparent",
      iconColor: "text-red-400"
    },
    {
      icon: Gem,
      title: "Authenticité Cristalline",
      description: "Un diamant brut dans l'industrie musicale. Une voix sans compromis, pure et tranchante comme une lame.",
      accent: "text-emerald-300",
      gradient: "from-emerald-500/15 to-transparent",
      iconColor: "text-emerald-400"
    },
    {
      icon: TrendingUp,
      title: "Stratégie Économique",
      description: "L'art comme empire. Une vision entrepreneuriale qui transforme la créativité en valeur pérenne.",
      accent: "text-rose-400",
      gradient: "from-rose-500/15 to-transparent",
      iconColor: "text-rose-400"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-950 to-green-950/50" id="about">
      {/* Arrière-plan artistique */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent" />
      
      {/* Éléments graphiques inspirés du logo */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-red-500/10 to-green-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-32 right-20 w-80 h-80 bg-green-900/10 rounded-full blur-3xl" />
      
      {/* Points stylisés du logo - version élégante */}
      <div className="absolute top-1/4 left-1/3">
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping" />
          <div className="absolute inset-0.5 bg-white rounded-full" />
        </div>
      </div>
      
      <div className="absolute bottom-1/4 right-1/3">
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse" />
          <div className="absolute inset-0.5 bg-red-100 rounded-full" />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container relative mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* Colonne gauche - Biographie élégante */}
          <div className="space-y-10">
            {/* En-tête minimaliste */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
                <span className="font-mono text-xs tracking-[0.5em] text-gray-500 uppercase">
                  L'Essence
                </span>
              </div>
              
              <h1 className="font-light text-5xl md:text-6xl leading-[1.1] text-white">
                Sept années
                <br />
                <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-red-400 to-rose-400">
                  d'alchimie
                </span>
                <br />
                <span className="text-green-200/80">sonore</span>
              </h1>
            </div>

            {/* Texte biographique avec finesse */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-300 font-light">
                Né à <span className="text-red-300 font-medium">Edéa</span>, dans le 
                <span className="text-green-300"> Littoral camerounais</span>, 
                ZAMAZU incarne la fusion entre <span className="italic">tradition et avant-garde</span>.
              </p>
              
              <p className="text-gray-400 leading-relaxed border-l-2 border-red-500/20 pl-6">
                Sa musique transcende le simple divertissement pour devenir 
                <span className="text-white font-light"> une expérience sensorielle et intellectuelle</span>. 
                Chaque projet est une exploration des profondeurs de la conscience humaine.
              </p>
              
              <div className="pt-6 border-t border-gray-800">
                <p className="text-sm tracking-widest text-gray-500 uppercase font-mono">
                  Philosophie Artistique
                </p>
                <p className="text-gray-300 mt-2 font-light">
                  "L'art n'est pas ce que l'on voit, mais ce que l'on <span className="text-red-300">fait voir</span> aux autres."
                </p>
              </div>
            </div>

            {/* Signature élégante */}
            <div className="flex items-center gap-4 pt-8">
              <div className="w-20 h-px bg-gradient-to-r from-red-500/50 to-green-500/50" />
              <span className="font-mono text-sm text-gray-500">— ZAMAZU</span>
            </div>
          </div>

          {/* Colonne droite - Valeurs avec effet waouh */}
          <div className="space-y-10">
            {/* Titre section avec icône */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-green-500/10 flex items-center justify-center border border-red-500/30">
                  <Sparkles className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-2xl font-light text-white">
                  Les <span className="font-medium">Piliers</span>
                </h2>
              </div>
              <div className="text-xs font-mono tracking-widest text-gray-500">
                03 Principes
              </div>
            </div>

            {/* Cartes de valeurs - Design premium */}
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group relative overflow-hidden"
              >
                {/* Effet de fond au survol */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl`} />
                
                {/* Bordure élégante */}
                <div className="absolute inset-0 border border-gray-800/50 rounded-2xl group-hover:border-red-500/30 transition-all duration-500" />
                
                {/* Contenu */}
                <div className="relative p-8 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-start gap-6">
                    {/* Icône avec effet sophistiqué */}
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 flex items-center justify-center 
                        group-hover:scale-105 transition-transform duration-500 group-hover:border-${value.accent.split('-')[1]}-500/50`}>
                        <value.icon className={`w-7 h-7 ${value.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      {/* Petit point d'accent */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-red-500 to-rose-500 rounded-full border-2 border-black" />
                    </div>
                    
                    {/* Texte */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-2xl font-medium text-white ${value.accent} group-hover:translate-x-1 transition-transform duration-300`}>
                            {value.title}
                          </h3>
                          <div className="w-6 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-50" />
                        </div>
                        <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-300">
                          {value.description}
                        </p>
                      </div>
                      
                      {/* Indicateur visuel */}
                      <div className="flex items-center gap-2 pt-4">
                        <div className="w-full h-0.5 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-full" />
                        <div className={`w-1 h-1 rounded-full ${value.accent} animate-pulse`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Citation finale */}
            <div className="pt-10">
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/30">
                <div className="absolute -top-3 left-8">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-green-500 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
                <p className="text-lg italic text-gray-300 text-center font-light">
                  "La valeur d'un artiste se mesure à son 
                  <span className="text-red-300"> impact</span>, 
                  pas à sa 
                  <span className="text-green-300"> popularité</span>."
                </p>
                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                    <span className="text-xs tracking-widest text-gray-500 uppercase font-mono">Zamazu • 2024</span>
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bas de section - Signature visuelle */}
        <div className="mt-32 pt-16 border-t border-gray-800/30">
          <div className="flex flex-col items-center">
            {/* Logo stylisé */}
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500/10 to-green-500/5 border border-gray-800 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-2xl shadow-red-500/20">
                  <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                </div>
                {/* Points du logo */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="font-mono text-sm tracking-[0.5em] text-gray-500 uppercase mb-4">
              Sound • Strategy • Significance
            </p>
            <p className="text-4xl font-light text-white text-center">
              <span className="text-red-400">Redefining</span> the{" "}
              <span className="text-green-300">Soundscape</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;