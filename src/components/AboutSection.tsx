import { Sparkles, Gem, Zap, Brain, TrendingUp } from "lucide-react";
import React from "react";

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
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-950 to-green-950/50" id="about">
      {/* Arrière-plan artistique */}
      <div className="absolute inset-0 bg-[radial-linear(ellipse_at_center,var(--tw-linear-stops))] from-red-900/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-linear-to-br from-red-500/10 to-green-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-32 right-20 w-80 h-80 bg-green-900/10 rounded-full blur-3xl" />
      
      {/* Points stylisés du logo haut */}
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

      <div className="container relative mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* Colonne gauche - Biographie */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-linear-to-r from-red-500 to-transparent" />
                <span className="font-mono text-xs tracking-[0.5em] text-gray-500 uppercase">L'Essence</span>
              </div>
              <h1 className="font-light text-5xl md:text-6xl leading-[1.1] text-white">
                Sept années<br />
                <span className="font-normal italic text-transparent bg-clip-text bg-linear-to-r from-red-300 via-red-400 to-rose-400">d'alchimie</span><br />
                <span className="text-green-200/80">sonore</span>
              </h1>
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-300 font-light">
                Né à <span className="text-red-300 font-medium">Edéa</span>, au <span className="text-green-300">Cameroun</span>, ZAMAZU incarne la fusion entre tradition et avant-garde.
              </p>
              <p className="text-gray-400 leading-relaxed border-l-2 border-red-500/20 pl-6">
                Sa musique transcende le simple divertissement pour devenir une expérience sensorielle et intellectuelle. Chaque projet est une exploration des profondeurs de la conscience.
              </p>
              <div className="pt-6 border-t border-gray-800">
                <p className="text-sm tracking-widest text-gray-500 uppercase font-mono">Philosophie Artistique</p>
                <p className="text-gray-300 mt-2 font-light italic">
                  "L'art n'est pas ce que l'on voit, mais ce que l'on fait voir aux autres."
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite - Valeurs */}
          <div className="space-y-10">
            <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-red-500/20 to-green-500/10 flex items-center justify-center border border-red-500/30">
                  <Sparkles className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-2xl font-light text-white">Les <span className="font-medium">Piliers</span></h2>
              </div>
            </div>

            {values.map((value) => (
              <div key={value.title} className="group relative overflow-hidden p-8 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-500">
                <div className={`absolute inset-0 bg-linear-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="relative flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-black border border-gray-800 flex items-center justify-center">
                    <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-2">{value.title}</h3>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bas de section - Signature visuelle */}
        <div className="mt-32 pt-16 border-t border-gray-800/30">
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-red-500/10 to-green-500/5 border border-gray-800 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                {/* Animation des points corrigée sans inline-styles */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
                  {[...Array(2)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 bg-red-500 rounded-full animate-bounce ${i === 1 ? 'delay-200' : 'delay-0'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="font-mono text-sm tracking-[0.5em] text-gray-500 uppercase mb-4 text-center">
              Sound • Strategy • Significance
            </p>
            <p className="text-4xl font-light text-white text-center">
              <span className="text-red-400">Redefining</span> the <span className="text-green-300">Soundscape</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;