import { useState } from 'react';
import { 
  Play, Pause, Heart, Share2, Download, Filter, 
  Calendar, Eye, Clock, Music2, Youtube, Spotify 
} from "lucide-react";

const AllProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  // DONNÉES DYNAMIQUES (À CONNECTER À LA DB)
  const allProjects = [
    // SAÏ SERIE
    {
      id: 'sai-1',
      type: 'series',
      title: 'Guantanamo 117',
      serie: 'SAÏ Saison 01 - Épisode 1',
      releaseDate: '2023-10-06',
      views: 1000,
      duration: '3:45',
      youtubeUrl: '#',
      coverColor: 'from-red-600 to-rose-700',
      featured: true
    },
    {
      id: 'sai-2',
      type: 'series',
      title: 'Capitale 732',
      serie: 'SAÏ Saison 01 - Épisode 2',
      releaseDate: '2023-10-22',
      views: 1000,
      duration: '4:20',
      youtubeUrl: '#',
      coverColor: 'from-red-700 to-pink-700',
      featuredArtists: ['SIMBA DRAKEN', '45 MOSHINO']
    },
    {
      id: 'sai-3',
      type: 'series',
      title: 'Ghost Fire',
      serie: 'SAÏ Saison 01 - Épisode 3',
      releaseDate: '2024-05-10',
      views: 337,
      duration: '3:15',
      youtubeUrl: '#',
      coverColor: 'from-red-800 to-rose-800',
      featuredArtists: ['Petit Zépé']
    },
    {
      id: 'sai-4',
      type: 'series',
      title: 'Etoudi',
      serie: 'SAÏ Saison 01 - Épisode 4',
      releaseDate: '2024-08-12',
      views: 729,
      duration: '3:55',
      youtubeUrl: '#',
      coverColor: 'from-red-900 to-pink-900'
    },
    // SINGLES
    {
      id: 'single-1',
      type: 'single',
      title: 'LeMbole',
      releaseDate: '2021-05-21',
      views: 14000,
      duration: '4:10',
      youtubeUrl: '#',
      coverColor: 'from-emerald-600 to-green-700',
      yearsAgo: 4
    },
    {
      id: 'single-2',
      type: 'single',
      title: 'L\'eau du Mbolé',
      releaseDate: '2022-06-10',
      views: 5000,
      duration: '3:50',
      youtubeUrl: '#',
      coverColor: 'from-emerald-700 to-green-800',
      yearsAgo: 3
    },
    {
      id: 'single-3',
      type: 'single',
      title: 'L\'Enfant de Qui',
      releaseDate: '2023-05-12',
      views: 12000,
      duration: '4:05',
      youtubeUrl: '#',
      coverColor: 'from-emerald-800 to-green-900',
      yearsAgo: 2
    },
    // FREESTYLES
    {
      id: 'freestyle-1',
      type: 'freestyle',
      title: 'Sosie',
      releaseDate: '2021-10-23',
      views: 8000,
      duration: '3:30',
      youtubeUrl: '#',
      coverColor: 'from-violet-600 to-purple-700',
      yearsAgo: 4
    },
    {
      id: 'freestyle-2',
      type: 'freestyle',
      title: 'Couronne Freestyle',
      releaseDate: '2022-02-01',
      views: 1000,
      duration: '2:45',
      youtubeUrl: '#',
      coverColor: 'from-violet-700 to-purple-800',
      yearsAgo: 3
    },
    {
      id: 'freestyle-3',
      type: 'freestyle',
      title: 'Suzana',
      releaseDate: '2024-06-07',
      views: 625,
      duration: '3:20',
      youtubeUrl: '#',
      coverColor: 'from-violet-800 to-purple-900',
      featuredArtists: ['SMILEY'],
      yearsAgo: 1
    }
  ];

  const filters = [
    { id: 'all', label: 'Tout', count: allProjects.length },
    { id: 'series', label: 'Série Saï', count: 4 },
    { id: 'single', label: 'Singles', count: 3 },
    { id: 'freestyle', label: 'Freestyles', count: 3 }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.type === activeFilter);

  const formatViews = (views: number) => {
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return views.toString();
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'series': return 'text-red-400';
      case 'single': return 'text-emerald-400';
      case 'freestyle': return 'text-violet-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeGradient = (type: string) => {
    switch(type) {
      case 'series': return 'from-red-500/10 to-red-600/5';
      case 'single': return 'from-emerald-500/10 to-green-600/5';
      case 'freestyle': return 'from-violet-500/10 to-purple-600/5';
      default: return 'from-gray-500/10 to-gray-600/5';
    }
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background énergétique */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/3 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-12">
        
        {/* Header flamboyant */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-red-400">TOUTE</span>
              <span className="text-gray-300"> L'ŒUVRE</span>
            </h1>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150" />
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-green-500" />
          </div>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            {allProjects.length} projets • {allProjects.reduce((sum, p) => sum + p.views, 0).toLocaleString()} vues cumulées
          </p>
        </div>

        {/* Filtres énergétiques */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`group px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-red-600/20 to-green-600/10 border-red-500/30'
                    : 'border-gray-800 hover:border-red-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${
                    activeFilter === filter.id ? 'text-white' : 'text-gray-400'
                  } group-hover:text-white transition-colors`}>
                    {filter.label}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeFilter === filter.id
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-gray-800 text-gray-500'
                  }`}>
                    {filter.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Grille des projets - FLAMBOYANTE */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="group relative"
            >
              {/* Carte projet */}
              <div className={`
                relative rounded-2xl border border-gray-800 
                bg-gradient-to-b from-gray-900/50 to-black/80
                backdrop-blur-sm
                overflow-hidden
                transition-all duration-500
                group-hover:scale-[1.02]
                group-hover:border-red-500/30
                h-full
              `}>
                
                {/* Header de la carte */}
                <div className={`relative h-48 ${project.coverColor} p-6`}>
                  {/* Badge type */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full ${getTypeGradient(project.type)} border border-gray-800/50`}>
                    <span className={`text-xs font-medium ${getTypeColor(project.type)}`}>
                      {project.type === 'series' ? 'SÉRIE' : 
                       project.type === 'single' ? 'SINGLE' : 'FREESTYLE'}
                    </span>
                  </div>
                  
                  {/* Bouton play */}
                  <button
                    onClick={() => setPlayingTrack(playingTrack === project.id ? null : project.id)}
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    {playingTrack === project.id ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white" />
                    )}
                  </button>
                  
                  {/* Informations principales */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    {project.serie && (
                      <p className="text-sm text-red-300">{project.serie}</p>
                    )}
                    {project.featuredArtists && (
                      <p className="text-xs text-gray-300 mt-1">
                        ft. {project.featuredArtists.join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">Sortie</span>
                      </div>
                      <div className="text-sm text-white">
                        {new Date(project.releaseDate).toLocaleDateString('fr-FR')}
                      </div>
                      {project.yearsAgo && (
                        <div className="text-xs text-gray-500">
                          Il y a {project.yearsAgo} an{project.yearsAgo > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs">Vues</span>
                      </div>
                      <div className="text-sm text-white">
                        {formatViews(project.views)}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">Durée</span>
                      </div>
                      <div className="text-sm text-white">{project.duration}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                    <div className="flex gap-3">
                      <button className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-400" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                        <Share2 className="w-5 h-5 text-gray-400 hover:text-green-400" />
                      </button>
                      <a 
                        href={project.youtubeUrl}
                        target="_blank"
                        className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                      >
                        <Youtube className="w-5 h-5 text-gray-400 hover:text-red-500" />
                      </a>
                    </div>
                    
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-red-500/30 transition-colors text-sm">
                      <span className="text-gray-300">Détails</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-lg border border-gray-800 flex items-center justify-center hover:border-red-500/30 transition-colors">
              <span className="text-gray-400">←</span>
            </button>
            
            {[1, 2, 3].map(page => (
              <button
                key={page}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                  page === 1
                    ? 'border-red-500/30 bg-red-500/10 text-white'
                    : 'border-gray-800 text-gray-400 hover:border-red-500/30'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button className="w-10 h-10 rounded-lg border border-gray-800 flex items-center justify-center hover:border-red-500/30 transition-colors">
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProjectsPage;