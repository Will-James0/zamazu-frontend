import { Disc, Music, Mic, ChevronRight, Sparkles, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DiscographySection = () => {
  const projects = [
    {
      type: "Série",
      title: "SAÏ",
      count: "4",
      label: "épisodes",
      description: "Un cycle où chaque projet est un chapitre d'une pensée évolutive. Minimaliste dans la forme, profond dans le fond.",
      icon: Disc,
      color: "text-red-400",
      bgColor: "bg-red-500/5",
      borderColor: "border-red-500/20",
      featured: true,
      accent: "S"
    },
    {
      type: "Singles",
      title: "Essences",
      count: "3",
      label: "diamants",
      description: "Des compositions pures, sans artifice. L'art de dire l'essentiel avec le strict nécessaire.",
      icon: Music,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/5",
      borderColor: "border-emerald-500/20",
      featured: false,
      accent: "E"
    },
    {
      type: "Freestyles",
      title: "Flux",
      count: "3",
      label: "instants",
      description: "Captures d'un flow brut, sans filet. La pensée à l'état pur, cristallisée en rythme.",
      icon: Mic,
      color: "text-rose-400",
      bgColor: "bg-rose-500/5",
      borderColor: "border-rose-500/20",
      featured: false,
      accent: "F"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black" id="discography">
      {/* Arrière-plan ultra-minimaliste avec effet de profondeur */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-green-500/2 rounded-full blur-3xl" />
        
        {/* Lignes architecturales subtiles */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-green-500/10 to-transparent" />
      </div>

      {/* Contenu */}
      <div className="container relative mx-auto px-4 py-24 md:py-32">
        {/* En-tête inspiré du logo */}
        <div className="mb-20 md:mb-32">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-red-500/30" />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <div className="w-8 h-px bg-green-500/30" />
          </div>

          <h1 className="text-center text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
            <span className="text-gray-400">Disco</span>
            <span className="text-red-400 font-normal">•</span>
            <span className="text-green-300">graphie</span>
          </h1>

          <p className="text-center text-gray-400 font-light text-sm md:text-base max-w-md mx-auto leading-relaxed tracking-wide">
            Une collection ordonnée de sons essentiels. 
            Chaque projet est un point dans une constellation cohérente.
          </p>
        </div>

        {/* Grille de projets - Architecture minimaliste */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="relative group"
            >
              {/* Carte avec design logo-like */}
              <div className={`
                relative rounded-xl border ${project.borderColor} 
                bg-linear-to-b from-black/80 to-gray-900/20
                backdrop-blur-sm
                transition-all duration-500 ease-out
                group-hover:border-red-400/40
                overflow-hidden
                h-full
              `}>
                
                {/* Effet de highlight au survol */}
                <div className="absolute inset-0 bg-linear-to-br from-red-500/0 via-transparent to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Contenu */}
                <div className="relative p-6 md:p-8 flex flex-col h-full">
                  {/* En-tête de carte */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      {/* Icône minimaliste */}
                      <div className={`w-12 h-12 rounded-lg ${project.bgColor} flex items-center justify-center border ${project.borderColor}`}>
                        <project.icon className={`w-5 h-5 ${project.color}`} />
                      </div>
                      
                      {/* Titre et type */}
                      <div>
                        <div className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-1">
                          {project.type}
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-normal ${project.color} tracking-tight`}>
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Compteur élégant */}
                    <div className="text-right">
                      <div className="text-4xl md:text-5xl font-light text-white/90 mb-1">
                        {project.count}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">
                        {project.label}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed tracking-wide mb-8 grow font-light">
                    {project.description}
                  </p>

                  {/* Badge featured minimaliste */}
                  {project.featured && (
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
                        <Sparkles className="w-3 h-3 text-red-400" />
                        <span className="text-xs text-red-300 tracking-widest">Série Principale</span>
                      </div>
                    </div>
                  )}

                  {/* Footer de carte */}
                  <div className="mt-auto pt-6 border-t border-gray-800/50">
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-400 hover:text-white group/btn p-0 h-auto"
                      >
                        <div className="flex items-center gap-2 text-sm">
                          <Play className="w-4 h-4 group-hover/btn:text-red-400 transition-colors" />
                          <span>Écouter</span>
                          <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </Button>
                      
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Volume2 className="w-3 h-3" />
                        <span>Hi-Res</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lettre d'accent inspirée du logo */}
                <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                  <span className="text-32xl md:text-48xl font-bold text-white">{project.accent}</span>
                </div>
              </div>

              {/* Points d'accent au survol (comme le logo) */}
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse delay-150" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Minimaliste */}
        <div className="relative">
          <div className="flex flex-col items-center py-16">
            <div className="mb-10 text-center">
              <h3 className="text-xl font-light text-gray-300 mb-4 tracking-wide">
                Explorer l'<span className="text-red-400">intégralité</span> de l'œuvre
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto font-light tracking-wide">
                Une expérience audio immersive, de la première note à la dernière.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">

<Button 
  size="lg"
  className="group relative overflow-hidden bg-linear-to-r from-black to-gray-900 border border-gray-800 hover:border-red-500/50"
  onClick={() => window.location.href = "/discography/all"} // ← NOUVEAU
>
  <div className="absolute inset-0 bg-linear-to-r from-red-600/0 via-red-600/10 to-green-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  <div className="relative flex items-center gap-3 px-6 py-4">
    <Disc className="w-4 h-4" />
    <span className="text-sm tracking-widest">VOIR TOUT</span>
  </div>
</Button>

<Button 
  variant="ghost" 
  size="lg"
  className="text-gray-400 hover:text-white border-0"
  onClick={() => window.location.href = "/discography/exclusives"} // ← NOUVEAU
>
  <Music className="w-4 h-4 mr-2" />
  <span className="text-sm">Exclusivités</span>
</Button>
              
              <Button 
                variant="ghost" 
                size="lg"
                className="text-gray-400 hover:text-white border-0"
              >
                <Music className="w-4 h-4 mr-2" />
                <span className="text-sm">Exclusivités</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer de section */}
        <div className="mt-20 pt-12 border-t border-gray-900">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-12 mb-8">
              {projects.map((project, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`text-2xl ${project.color} font-light`}>
                    {project.count}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-2">
                    {project.type}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-red-500/20 rounded-full" />
              <div className="text-xs tracking-[0.3em] text-gray-600 uppercase">
                Minimal • Essentiel • Significatif
              </div>
              <div className="w-3 h-3 bg-green-500/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscographySection;