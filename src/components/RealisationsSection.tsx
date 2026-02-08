import { Play, ExternalLink, Music, Disc3, Mic2, ListMusic } from "lucide-react";
import React from "react";
import { realisations as realisationsData } from "@/data/realisations";

const RealisationsSection = () => {
  // Enrichir les données avec les icônes
  const realisations = realisationsData.map(item => ({
    ...item,
    youtubeUrl: `https://youtube.com/watch?v=${item.youtubeId}`,
    thumbnail: item.coverImage || `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`,
    icon: item.type === "Single" ? Music : item.type === "Freestyle" ? Mic2 : Disc3
  }));

  // Calcul dynamique des statistiques
  const stats = {
    singles: realisations.filter(item => item.type === "Single").length,
    freestyles: realisations.filter(item => item.type === "Freestyle").length,
    projets: realisations.filter(item => item.type === "Projet").length,
    total: realisations.length
  };

  const getColorClasses = (color: string) => {
    const colors = {
      red: {
        badge: "bg-red-500/10 text-red-400 border-red-500/30",
        hover: "group-hover:border-red-500/50",
        icon: "text-red-400",
        gradient: "from-red-500/20 to-transparent"
      },
      green: {
        badge: "bg-green-500/10 text-green-400 border-green-500/30",
        hover: "group-hover:border-green-500/50",
        icon: "text-green-400",
        gradient: "from-green-500/20 to-transparent"
      },
      emerald: {
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        hover: "group-hover:border-emerald-500/50",
        icon: "text-emerald-400",
        gradient: "from-emerald-500/20 to-transparent"
      }
    };
    return colors[color as keyof typeof colors] || colors.red;
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-950 to-green-950/30" id="realisations">
      {/* Arrière-plan artistique */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-16 w-80 h-80 bg-linear-to-br from-red-500/10 to-green-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-32 right-16 w-96 h-96 bg-green-900/10 rounded-full blur-3xl" />
      
      {/* Points stylisés décoratifs */}
      <div className="absolute top-1/4 right-1/3">
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping" />
          <div className="absolute inset-0.5 bg-white rounded-full" />
        </div>
      </div>
      
      <div className="absolute bottom-1/4 left-1/3">
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse" />
          <div className="absolute inset-0.5 bg-green-100 rounded-full" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        {/* En-tête de section */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-linear-to-r from-red-500 to-transparent" />
            <span className="font-mono text-xs tracking-[0.5em] text-gray-500 uppercase">Discographie</span>
          </div>
          <h2 className="font-light text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-white mb-6">
            Les œuvres de<br />
            <span className="font-normal italic text-transparent bg-clip-text bg-linear-to-r from-red-300 via-red-400 to-rose-400">ZAMAZU</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            7 années de création musicale : <span className="text-red-300 font-medium">{stats.singles} single{stats.singles > 1 ? 's' : ''}</span>, <span className="text-green-300 font-medium">{stats.freestyles} freestyle{stats.freestyles > 1 ? 's' : ''}</span> et <span className="text-emerald-300 font-medium">{stats.projets} projet{stats.projets > 1 ? 's' : ''} de la série Saï</span>.
          </p>
        </div>

        {/* Catégories */}
        <div className="flex flex-wrap gap-3 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/60 border border-gray-800">
            <ListMusic className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Toutes les réalisations</span>
            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full font-medium">{stats.total}</span>
          </div>
        </div>

        {/* Grille de réalisations */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {realisations.map((item, index) => {
            const colors = getColorClasses(item.color);
            const Icon = item.icon;
            
            return (
              <a
                key={index}
                href={item.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl border border-gray-800/50 ${colors.hover} transition-all duration-500 bg-black/40 backdrop-blur-sm hover:scale-105 hover:shadow-2xl`}
              >
                <div className={`absolute inset-0 bg-linear-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                {/* Thumbnail avec overlay */}
                <div className="relative aspect-video bg-linear-to-br from-gray-900 to-black overflow-hidden">
                  {/* Image thumbnail (YouTube ou personnalisée) */}
                  {(item.coverImage || item.youtubeId !== "XXXXXXX") && (
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        // Si l'image ne charge pas, afficher le placeholder
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  
                  {/* Placeholder pour la thumbnail */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className={`w-16 h-16 ${colors.icon} opacity-20`} />
                  </div>
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-900/50">
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="relative p-6 space-y-3">
                  {/* Badge type */}
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${colors.badge}`}>
                      {item.type}
                    </span>
                  </div>

                  {/* Titre et description */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Lien YouTube */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-red-400 transition-colors pt-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Écouter sur YouTube</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border border-gray-800/50 bg-black/20 backdrop-blur-sm">
            <p className="text-gray-300 text-lg">
              Découvrez encore plus de contenu exclusif
            </p>
            <a 
              href="/auth" 
              className="px-8 py-3 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-800/60"
            >
              Accéder à la plateforme
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealisationsSection;
