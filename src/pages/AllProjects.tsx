import { useState, useEffect } from 'react';
import { 
  Play, Pause, Heart, Share2, Filter, 
  Calendar, Eye, Clock, Youtube, Sparkles,
  TrendingUp, Music, Zap, X, ExternalLink,
  Volume2, Download, Info
} from "lucide-react";

// Interface pour les projets
interface Project {
  id: string;
  type: 'series' | 'single' | 'freestyle';
  title: string;
  serie?: string;
  releaseDate: string;
  views: number;
  duration: string;
  youtubeUrl: string;
  coverColor: string;
  featuredArtists?: string[];
  yearsAgo?: number;
  likes: number;
  description?: string;
  lyrics?: string;
  bpm?: number;
  key?: string;
}

const AllProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [volume, setVolume] = useState(80);
  const [shareNotification, setShareNotification] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  // DONNÉES DYNAMIQUES COMPLÈTES
  const allProjects: Project[] = [
    // SAÏ SERIE
    {
      id: 'sai-1',
      type: 'series',
      title: 'Guantanamo 117',
      serie: 'SAÏ Saison 01 - Épisode 1',
      releaseDate: '2023-10-06',
      views: 1000,
      duration: '3:45',
      youtubeUrl: 'https://youtube.com/watch?v=example1',
      coverColor: 'from-red-600 to-rose-700',
      likes: 150,
      description: "Premier épisode de la série Saï, plongeant dans l'univers urbain de Yaoundé.",
      lyrics: "Guantanamo 117, dans la ville qui ne dort jamais...",
      bpm: 140,
      key: 'Cm'
    },
    {
      id: 'sai-2',
      type: 'series',
      title: 'Capitale 732',
      serie: 'SAÏ Saison 01 - Épisode 2',
      releaseDate: '2023-10-22',
      views: 1000,
      duration: '4:20',
      youtubeUrl: 'https://youtube.com/watch?v=example2',
      coverColor: 'from-red-700 to-pink-700',
      featuredArtists: ['SIMBA DRAKEN', '45 MOSHINO'],
      likes: 120,
      description: "Deuxième épisode avec des featurings explosifs.",
      bpm: 135,
      key: 'Fm'
    },
    {
      id: 'sai-3',
      type: 'series',
      title: 'Ghost Fire',
      serie: 'SAÏ Saison 01 - Épisode 3',
      releaseDate: '2024-05-10',
      views: 337,
      duration: '3:15',
      youtubeUrl: 'https://youtube.com/watch?v=example3',
      coverColor: 'from-red-800 to-rose-800',
      featuredArtists: ['Petit Zépé'],
      likes: 89,
      description: "Troisième épisode avec une vibe plus mélodique.",
      bpm: 128,
      key: 'G#m'
    },
    {
      id: 'sai-4',
      type: 'series',
      title: 'Etoudi',
      serie: 'SAÏ Saison 01 - Épisode 4',
      releaseDate: '2024-08-12',
      views: 729,
      duration: '3:55',
      youtubeUrl: 'https://youtube.com/watch?v=example4',
      coverColor: 'from-red-900 to-pink-900',
      likes: 210,
      description: "Épisode final de la saison 1, tourné à Etoudi.",
      bpm: 145,
      key: 'Am'
    },
    // SINGLES
    {
      id: 'single-1',
      type: 'single',
      title: 'LeMbole',
      releaseDate: '2021-05-21',
      views: 14000,
      duration: '4:10',
      youtubeUrl: 'https://youtube.com/watch?v=example5',
      coverColor: 'from-emerald-600 to-green-700',
      yearsAgo: 4,
      likes: 450,
      description: "Premier single qui a lancé la carrière de Saï.",
      lyrics: "Le Mbolé, cette eau qui coule dans mes veines...",
      bpm: 130,
      key: 'Dm'
    },
    {
      id: 'single-2',
      type: 'single',
      title: 'L\'eau du Mbolé',
      releaseDate: '2022-06-10',
      views: 5000,
      duration: '3:50',
      youtubeUrl: 'https://youtube.com/watch?v=example6',
      coverColor: 'from-emerald-700 to-green-800',
      yearsAgo: 3,
      likes: 320,
      description: "Suite du succès LeMbole, exploration des thèmes aquatiques.",
      bpm: 125,
      key: 'Em'
    },
    {
      id: 'single-3',
      type: 'single',
      title: 'L\'Enfant de Qui',
      releaseDate: '2023-05-12',
      views: 12000,
      duration: '4:05',
      youtubeUrl: 'https://youtube.com/watch?v=example7',
      coverColor: 'from-emerald-800 to-green-900',
      yearsAgo: 2,
      likes: 680,
      description: "Single engagé sur les questions d'identité.",
      bpm: 138,
      key: 'Bm'
    },
    // FREESTYLES
    {
      id: 'freestyle-1',
      type: 'freestyle',
      title: 'Sosie',
      releaseDate: '2021-10-23',
      views: 8000,
      duration: '3:30',
      youtubeUrl: 'https://youtube.com/watch?v=example8',
      coverColor: 'from-violet-600 to-purple-700',
      yearsAgo: 4,
      likes: 290,
      description: "Freestyle improvisé en studio, pur flow.",
      bpm: 150,
      key: 'C#m'
    },
    {
      id: 'freestyle-2',
      type: 'freestyle',
      title: 'Couronne Freestyle',
      releaseDate: '2022-02-01',
      views: 1000,
      duration: '2:45',
      youtubeUrl: 'https://youtube.com/watch?v=example9',
      coverColor: 'from-violet-700 to-purple-800',
      yearsAgo: 3,
      likes: 110,
      description: "Freestyle court et percutant sur un beat minimal.",
      bpm: 160,
      key: 'F#m'
    },
    {
      id: 'freestyle-3',
      type: 'freestyle',
      title: 'Suzana',
      releaseDate: '2024-06-07',
      views: 625,
      duration: '3:20',
      youtubeUrl: 'https://youtube.com/watch?v=example10',
      coverColor: 'from-violet-800 to-purple-900',
      featuredArtists: ['SMILEY'],
      yearsAgo: 1,
      likes: 175,
      description: "Freestyle collaboratif avec Smiley, vibe estivale.",
      bpm: 142,
      key: 'Gm'
    }
  ];

  const filters = [
    { id: 'all', label: 'Tout', count: allProjects.length, icon: Music },
    { id: 'series', label: 'Série Saï', count: 4, icon: Sparkles },
    { id: 'single', label: 'Singles', count: 3, icon: TrendingUp },
    { id: 'freestyle', label: 'Freestyles', count: 3, icon: Zap }
  ];

  // Fonctions de gestion
  const handlePlay = (id: string) => {
    if (playingTrack === id) {
      setPlayingTrack(null);
      setProgress(0);
    } else {
      setPlayingTrack(id);
      // Simuler la progression de lecture
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedTracks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleShare = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `🎵 Découvre "${project.title}" par Saï ! ${project.youtubeUrl}`;
    navigator.clipboard.writeText(shareText);
    
    setShareNotification(`Lien de "${project.title}" copié !`);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleDownload = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Téléchargement de "${project.title}" démarré !`);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  const filteredProjects = activeFilter === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.type === activeFilter);

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
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
      case 'series': return 'bg-linear-to-r from-red-500/20 via-red-600/10 to-red-700/5';
      case 'single': return 'bg-linear-to-r from-emerald-500/20 via-green-600/10 to-emerald-700/5';
      case 'freestyle': return 'bg-linear-to-r from-violet-500/20 via-purple-600/10 to-violet-700/5';
      default: return 'bg-linear-to-r from-gray-500/20 via-gray-600/10 to-gray-700/5';
    }
  };

  const totalLikes = allProjects.reduce((sum, p) => sum + p.likes, 0);
  const totalViews = allProjects.reduce((sum, p) => sum + p.views, 0);

  // Notification de partage
  useEffect(() => {
    if (shareNotification) {
      const timer = setTimeout(() => setShareNotification(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [shareNotification]);

  // Gestion de la progression
  useEffect(() => {
    if (playingTrack) {
      const timer = setTimeout(() => {
        if (progress >= 100) {
          setPlayingTrack(null);
          setProgress(0);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [playingTrack, progress]);

  return (
    <>
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Background énergétique */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-125 h-125 bg-red-500/10 rounded-full blur-100 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-green-500/5 rounded-full blur-100 animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-100 h-100 bg-purple-500/5 rounded-full blur-80 animate-pulse delay-500" />
        </div>

        {/* Notification de partage */}
        {shareNotification && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="px-4 py-3 rounded-lg bg-linear-to-r from-green-600/90 to-emerald-700/90 backdrop-blur-md border border-green-500/30 shadow-xl">
              <span className="text-white font-medium text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {shareNotification}
              </span>
            </div>
          </div>
        )}

        <div className="container relative mx-auto px-4 py-12">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-linear-to-r from-transparent via-red-500 to-red-600 animate-shimmer" />
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                <span className="bg-linear-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent animate-gradient">
                  TOUTE L'ŒUVRE
                </span>
              </h1>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping delay-300" />
              <div className="w-12 h-px bg-linear-to-r from-green-600 via-green-500 to-transparent animate-shimmer delay-500" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <div className="px-6 py-3 rounded-full bg-linear-to-r from-red-900/20 to-red-950/10 border border-red-800/30 backdrop-blur-sm">
                <span className="text-white font-medium">{allProjects.length} projets</span>
              </div>
              <div className="px-6 py-3 rounded-full bg-linear-to-r from-green-900/20 to-green-950/10 border border-green-800/30 backdrop-blur-sm">
                <span className="text-white font-medium">{formatViews(totalViews)} vues</span>
              </div>
              <div className="px-6 py-3 rounded-full bg-linear-to-r from-purple-900/20 to-purple-950/10 border border-purple-800/30 backdrop-blur-sm">
                <span className="text-white font-medium">{totalLikes.toLocaleString()} likes</span>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-3 justify-center">
              {filters.map(filter => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`
                      group px-6 py-3 rounded-full border transition-all duration-300
                      transform hover:scale-105 active:scale-95
                      ${activeFilter === filter.id
                        ? 'bg-linear-to-r from-red-600/30 via-red-500/20 to-red-600/10 border-red-500/40 shadow-lg shadow-red-500/20'
                        : 'border-gray-800 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10'
                      }
                    `}
                    aria-label={`Filtrer par ${filter.label}`}
                    title={`Afficher les ${filter.label.toLowerCase()}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-all ${
                        activeFilter === filter.id 
                          ? 'text-red-400' 
                          : 'text-gray-500 group-hover:text-red-400'
                      }`} />
                      <span className={`text-sm font-medium transition-all ${
                        activeFilter === filter.id 
                          ? 'text-white' 
                          : 'text-gray-400 group-hover:text-white'
                      }`}>
                        {filter.label}
                      </span>
                      <span className={`
                        text-xs px-2 py-1 rounded-full transition-all
                        ${activeFilter === filter.id
                          ? 'bg-red-500/30 text-red-200 shadow-inner'
                          : 'bg-gray-900/50 text-gray-500 group-hover:bg-red-500/20 group-hover:text-red-300'
                        }
                      `}>
                        {filter.count}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grille des projets */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="group relative cursor-pointer"
                onClick={() => handleProjectClick(project)}
                role="article"
                aria-label={`Projet: ${project.title}`}
              >
                {/* Effet de halo */}
                <div className="absolute -inset-1 bg-linear-to-r from-red-600/0 via-red-500/10 to-purple-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Carte projet */}
                <div className={`
                  relative rounded-2xl border
                  bg-linear-to-b from-gray-900/60 via-black/60 to-black/80
                  backdrop-blur-xl
                  overflow-hidden
                  transition-all duration-500 ease-out
                  group-hover:scale-[1.02]
                  group-hover:border-red-500/40
                  group-hover:shadow-2xl group-hover:shadow-red-900/20
                  h-full
                  ${playingTrack === project.id ? 'border-red-500/60' : 'border-gray-800/50'}
                `}>
                  
                  {/* Header */}
                  <div className={`relative h-48 bg-linear-to-br ${project.coverColor} p-6 overflow-hidden`}>
                    <div className="absolute inset-0">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                    </div>
                    
                    {/* Badge type */}
                    <div className={`
                      absolute top-4 left-4 px-3 py-1.5 rounded-full 
                      backdrop-blur-md border border-white/10
                      transform transition-all duration-300
                      group-hover:scale-110 group-hover:shadow-lg
                      ${getTypeGradient(project.type)}
                    `}>
                      <span className={`text-xs font-bold tracking-wider ${getTypeColor(project.type)}`}>
                        {project.type === 'series' ? 'SÉRIE' : 
                         project.type === 'single' ? 'SINGLE' : 'FREESTYLE'}
                      </span>
                    </div>
                    
                    {/* Bouton play */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlay(project.id);
                      }}
                      className={`
                        absolute top-4 right-4 w-12 h-12 rounded-full 
                        backdrop-blur-md flex items-center justify-center 
                        transition-all duration-300 transform
                        hover:scale-110 active:scale-95
                        ${playingTrack === project.id
                          ? 'bg-red-500/30 border border-red-500/50 shadow-lg shadow-red-500/30'
                          : 'bg-black/40 border border-white/20 hover:bg-red-500/30 hover:border-red-500/50'
                        }
                      `}
                      aria-label={playingTrack === project.id ? 'Mettre en pause' : `Lire ${project.title}`}
                      title={playingTrack === project.id ? 'Mettre en pause' : `Lire ${project.title}`}
                    >
                      {playingTrack === project.id ? (
                        <div className="relative w-6 h-6">
                          <Pause className="absolute inset-0 w-full h-full text-white" />
                          <div className="absolute inset-0 flex items-center justify-center gap-0.5">
                            <div className="w-0.5 h-3 bg-red-400 animate-pulse" />
                            <div className="w-0.5 h-4 bg-red-300 animate-pulse" style={{ animationDelay: '150ms' }} />
                            <div className="w-0.5 h-3 bg-red-400 animate-pulse" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      ) : (
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      )}
                    </button>
                    
                    {/* Informations */}
                    <div className="absolute bottom-6 left-6 right-6 transform transition-transform duration-500 group-hover:-translate-y-1">
                      <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {project.title}
                      </h2>
                      {project.serie && (
                        <p className="text-sm text-red-300/90 font-medium">{project.serie}</p>
                      )}
                      {project.featuredArtists && (
                        <p className="text-xs text-gray-300/80 mt-1">
                          ft. {project.featuredArtists.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center group/stat">
                        <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                          <Calendar className="w-4 h-4 transition-transform group-hover/stat:scale-110" />
                          <span className="text-xs">Sortie</span>
                        </div>
                        <div className="text-sm text-white font-medium">
                          {new Date(project.releaseDate).toLocaleDateString('fr-FR')}
                        </div>
                        {project.yearsAgo && (
                          <div className="text-xs text-gray-500 mt-1">
                            Il y a {project.yearsAgo} an{project.yearsAgo > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center group/stat">
                        <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                          <Eye className="w-4 h-4 transition-transform group-hover/stat:scale-110" />
                          <span className="text-xs">Vues</span>
                        </div>
                        <div className="text-sm text-white font-medium">
                          {formatViews(project.views)}
                        </div>
                      </div>
                      
                      <div className="text-center group/stat">
                        <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                          <Clock className="w-4 h-4 transition-transform group-hover/stat:scale-110" />
                          <span className="text-xs">Durée</span>
                        </div>
                        <div className="text-sm text-white font-medium">{project.duration}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between border-t border-gray-800/50 pt-4">
                      <div className="flex gap-3">
                        {/* Like */}
                        <button 
                          onClick={(e) => handleLike(project.id, e)}
                          aria-label={likedTracks.has(project.id) ? `Retirer ${project.title} des favoris` : `Ajouter ${project.title} aux favoris`}
                          title={likedTracks.has(project.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                          className={`
                            p-2 rounded-lg transition-all duration-300
                            transform hover:scale-110 active:scale-95
                            ${likedTracks.has(project.id)
                              ? 'bg-red-500/20 text-red-400'
                              : 'hover:bg-gray-800/50 text-gray-400 hover:text-red-400'
                            }
                          `}
                        >
                          <Heart className={`w-5 h-5 transition-all ${
                            likedTracks.has(project.id) ? 'fill-current' : ''
                          }`} />
                        </button>

                        {/* Share */}
                        <button 
                          onClick={(e) => handleShare(project, e)}
                          aria-label={`Partager ${project.title}`}
                          title="Partager le projet"
                          className="p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-110 active:scale-95 text-gray-400 hover:text-green-400"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>

                        {/* YouTube */}
                        <a 
                          href={project.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Voir ${project.title} sur YouTube`}
                          title="Voir sur YouTube"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-110 active:scale-95 text-gray-400 hover:text-red-500"
                        >
                          <Youtube className="w-5 h-5" />
                        </a>
                      </div>
                      
                      {/* Likes count */}
                      <div className="flex items-center gap-2 text-sm" aria-label={`${project.likes} likes`}>
                        <Heart className={`w-4 h-4 ${likedTracks.has(project.id) ? 'text-red-400 fill-current' : 'text-gray-500'}`} />
                        <span className="text-gray-400">{project.likes}</span>
                      </div>
                    </div>
                    
                    {/* Bouton Détails */}
                    <div className="mt-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project);
                        }}
                        aria-label={`Voir les détails de ${project.title}`}
                        title="Voir les détails"
                        className="
                          w-full px-4 py-3 rounded-lg 
                          bg-linear-to-r from-gray-900/80 to-black/80
                          border border-gray-800/50
                          hover:border-red-500/40
                          hover:bg-linear-to-r hover:from-red-900/20 hover:to-black/80
                          transition-all duration-300
                          group/details
                        "
                      >
                        <span className="text-gray-300 group-hover/details:text-white font-medium flex items-center justify-center">
                          <Info className="w-4 h-4 mr-2" />
                          Voir les détails
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2 backdrop-blur-md bg-black/30 p-2 rounded-2xl border border-gray-800/50">
              <button 
                className="
                  w-10 h-10 rounded-lg border border-gray-800/50 
                  flex items-center justify-center 
                  hover:border-red-500/40 hover:bg-red-500/10
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                "
                aria-label="Page précédente"
                title="Page précédente"
              >
                <span className="text-gray-400 hover:text-white">←</span>
              </button>
              
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  onClick={() => console.log(`Page ${page}`)}
                  aria-label={`Page ${page}`}
                  title={`Page ${page}`}
                  className={`
                    w-10 h-10 rounded-lg border flex items-center justify-center
                    transition-all duration-300 transform hover:scale-105 active:scale-95
                    ${page === 1
                      ? 'border-red-500/40 bg-linear-to-r from-red-500/20 to-red-600/10 text-white shadow-lg shadow-red-500/20'
                      : 'border-gray-800/50 text-gray-400 hover:border-red-500/40 hover:text-white'
                    }
                  `}
                >
                  {page}
                </button>
              ))}
              
              <button 
                className="
                  w-10 h-10 rounded-lg border border-gray-800/50 
                  flex items-center justify-center 
                  hover:border-red-500/40 hover:bg-red-500/10
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                "
                aria-label="Page suivante"
                title="Page suivante"
              >
                <span className="text-gray-400 hover:text-white">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de détails */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            className={`
              relative w-full max-w-4xl rounded-2xl overflow-hidden
              bg-linear-to-br from-gray-900 to-black
              border border-gray-800/50 shadow-2xl
              animate-modal-in
            `}
            role="dialog"
            aria-label={`Détails de ${selectedProject.title}`}
            aria-modal="true"
          >
            {/* Header modal */}
            <div className={`relative h-64 bg-linear-to-br ${selectedProject.coverColor} p-8`}>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Fermer les détails"
                title="Fermer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`px-3 py-1.5 rounded-full ${getTypeGradient(selectedProject.type)} border border-white/10`}>
                    <span className={`text-xs font-bold ${getTypeColor(selectedProject.type)}`}>
                      {selectedProject.type === 'series' ? 'SÉRIE' : 
                       selectedProject.type === 'single' ? 'SINGLE' : 'FREESTYLE'}
                    </span>
                  </div>
                  <span className="text-sm text-white/80">
                    Sorti le {new Date(selectedProject.releaseDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">{selectedProject.title}</h2>
                {selectedProject.serie && (
                  <p className="text-lg text-red-300">{selectedProject.serie}</p>
                )}
              </div>
            </div>

            {/* Contenu modal */}
            <div className="p-8">
              {/* Player */}
              <div className="mb-8 p-6 rounded-xl bg-linear-to-r from-gray-900/50 to-black/50 border border-gray-800/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handlePlay(selectedProject.id)}
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        transition-all duration-300
                        ${playingTrack === selectedProject.id
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-red-500 hover:text-white'
                        }
                      `}
                      aria-label={playingTrack === selectedProject.id ? 'Mettre en pause' : `Lire ${selectedProject.title}`}
                      title={playingTrack === selectedProject.id ? 'Mettre en pause' : 'Lire'}
                    >
                      {playingTrack === selectedProject.id ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-1" />
                      )}
                    </button>
                    <div>
                      <div className="text-white font-medium">En lecture</div>
                      <div className="text-sm text-gray-400">{selectedProject.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Volume2 className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    <label htmlFor="volume-slider" className="sr-only">Volume</label>
                    <input
                      id="volume-slider"
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-32 accent-red-500"
                      aria-label="Contrôle du volume"
                      title={`Volume: ${volume}%`}
                    />
                    <span className="text-sm text-gray-400 w-10" aria-hidden="true">{volume}%</span>
                  </div>
                </div>

                {/* Progress bar avec ARIA correct */}
                <div 
                  className="h-1 bg-gray-800 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-label="Progression de la lecture"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={playingTrack === selectedProject.id ? Math.round(progress) : 0}
                  title={`Progression: ${playingTrack === selectedProject.id ? Math.round(progress) : 0}%`}
                >
                  <div 
                    className="h-full bg-linear-to-r from-red-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${playingTrack === selectedProject.id ? progress : 0}%` }}
                  />
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">À propos</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.description || "Description non disponible."}
                  </p>
                  {selectedProject.lyrics && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-white mb-2">Extrait des paroles</h4>
                      <p className="text-gray-400 italic">"{selectedProject.lyrics}"</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Informations techniques</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                      <span className="text-gray-400">Tonalité</span>
                      <span className="text-white font-medium">{selectedProject.key || 'Non spécifié'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                      <span className="text-gray-400">BPM</span>
                      <span className="text-white font-medium">{selectedProject.bpm || 'Non spécifié'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                      <span className="text-gray-400">Vues</span>
                      <span className="text-white font-medium">{formatViews(selectedProject.views)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                      <span className="text-gray-400">Likes</span>
                      <span className="text-white font-medium">{selectedProject.likes}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 justify-end">
                <button
                  onClick={(e) => handleLike(selectedProject.id, e)}
                  className={`
                    px-6 py-3 rounded-lg flex items-center gap-2
                    transition-all duration-300
                    ${likedTracks.has(selectedProject.id)
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-red-500/20 hover:text-red-400'
                    }
                  `}
                  aria-label={likedTracks.has(selectedProject.id) ? `Retirer ${selectedProject.title} des favoris` : `Ajouter ${selectedProject.title} aux favoris`}
                  title={likedTracks.has(selectedProject.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  <Heart className={`w-5 h-5 ${likedTracks.has(selectedProject.id) ? 'fill-current' : ''}`} />
                  {likedTracks.has(selectedProject.id) ? 'Liked' : 'Like'}
                </button>
                
                <button
                  onClick={(e) => handleShare(selectedProject, e)}
                  className="px-6 py-3 rounded-lg bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-green-500/30 transition-colors text-gray-300 hover:text-white flex items-center gap-2"
                  aria-label={`Partager ${selectedProject.title}`}
                  title="Partager"
                >
                  <Share2 className="w-5 h-5" />
                  Partager
                </button>
                
                <button
                  onClick={(e) => handleDownload(selectedProject, e)}
                  className="px-6 py-3 rounded-lg bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all text-white flex items-center gap-2"
                  aria-label={`Télécharger ${selectedProject.title}`}
                  title="Télécharger"
                >
                  <Download className="w-5 h-5" />
                  Télécharger
                </button>
                
                <a
                  href={selectedProject.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all text-white flex items-center gap-2"
                  aria-label={`Voir ${selectedProject.title} sur YouTube`}
                  title="Voir sur YouTube"
                >
                  <ExternalLink className="w-5 h-5" />
                  Voir sur YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles d'animation inline */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes modalIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        .animate-modal-in {
          animation: modalIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default AllProjectsPage;