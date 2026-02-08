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

      <div className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
          
          {/* Colonne gauche - Biographie */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-linear-to-r from-red-500 to-transparent" />
                <span className="font-mono text-xs tracking-[0.5em] text-gray-500 uppercase">L'Essence</span>
              </div>
              <h1 className="font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white">
                Sept années<br />
                <span className="font-normal italic text-transparent bg-clip-text bg-linear-to-r from-red-300 via-red-400 to-rose-400">d'alchimie</span><br />
                <span className="text-green-200/80">sonore</span>
              </h1>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-gray-300 font-light">
                Artiste rap originaire d'<span className="text-red-300 font-medium">Edéa</span>, dans la région du <span className="text-green-300">Littoral (Cameroun)</span>, ZAMAZU est actif sur la scène musicale depuis <span className="text-red-300 font-semibold">7 ans</span>. Il s'impose progressivement comme une voix singulière du rap camerounais, avec une démarche artistique axée sur la conscience, la réflexion et l'élévation de l'esprit.
              </p>
              
              <p className="text-gray-400 leading-relaxed border-l-2 border-red-500/20 pl-6">
                Sans revendiquer d'influences directes, ZAMAZU construit un univers personnel, guidé par ce qu'il définit comme <span className="text-red-300 italic">l'éveil musical de l'œuvre d'esprit</span>. À travers ses textes, il explore la pensée, la vision intérieure et la capacité de la musique à éveiller les consciences, tout en restant ancré dans une dynamique moderne et authentique du rap.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Au fil de son parcours, il a déjà à son actif <span className="text-green-300 font-medium">trois singles</span>, <span className="text-green-300 font-medium">trois freestyles</span>, ainsi que <span className="text-green-300 font-medium">quatre projets issus de la série "Saï"</span>, témoignant d'une constance artistique et d'une réelle implication dans la création musicale.
              </p>
              
              <p className="text-gray-400 leading-relaxed">
                Son travail reflète une recherche de profondeur, alliée à une volonté de structuration et de professionnalisation de sa carrière. Au-delà de l'aspect artistique, ZAMAZU inscrit sa démarche dans une <span className="text-red-300 font-medium">vision orientée business et affaires</span>, considérant la musique non seulement comme un moyen d'expression, mais aussi comme un véritable levier économique et entrepreneurial.
              </p>
              
              <div className="pt-6 border-t border-gray-800">
                <p className="text-sm tracking-widest text-gray-500 uppercase font-mono">Philosophie</p>
                <p className="text-gray-300 mt-2 font-light italic">
                  Déterminé, discipliné et tourné vers l'avenir, ZAMAZU poursuit son évolution avec l'ambition de marquer durablement le rap camerounais, en conciliant création artistique, conscience et stratégie professionnelle.
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
              <div key={value.title} className="group relative overflow-hidden p-4 sm:p-6 lg:p-8 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-500">
                <div className={`absolute inset-0 bg-linear-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black border border-gray-800 flex items-center justify-center flex-shrink-0">
                    <value.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${value.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-2">{value.title}</h3>
                    <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;