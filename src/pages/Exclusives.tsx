import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Share2,
  Download,
  Lock,
  Crown,
  Sparkles,
  Music,
  Star,
  Zap,
} from "lucide-react";

const Exclusives = () => {
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [particleStyles, setParticleStyles] = useState<Array<React.CSSProperties>>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const exclusiveTracks = [
    {
      id: 1,
      title: "Démo Inédite 2024",
      duration: "2:45",
      description: "Premier aperçu du prochain projet - Master qualité studio",
      isLocked: false,
      plays: 1250,
      releaseDate: "2024-12-01",
      tags: ["NEW", "EXCLUSIVE"],
    },
    {
      id: 2,
      title: "Studio Session #1",
      duration: "3:20",
      description: "Enregistrement live en studio - Version complète",
      isLocked: true,
      plays: 0,
      releaseDate: "2024-12-15",
      tags: ["COMING SOON"],
    },
    {
      id: 3,
      title: "Acoustique Version",
      duration: "4:10",
      description: "Réinterprétation acoustique exclusive - Limited Edition",
      isLocked: true,
      plays: 0,
      releaseDate: "2025-01-10",
      tags: ["PREMIUM"],
    },
  ];

  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const duration = 165; // 2:45 en secondes
          if (prev >= duration) {
            clearInterval(interval);
            setPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playing]);

  // Générer les styles des particules au montage
  useEffect(() => {
    const styles = Array.from({ length: 20 }).map((_, i) => ({
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${3 + Math.random() * 5}s`,
    }));
    setParticleStyles(styles);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressWidth = `${(progress / 165) * 100}%`;
  const volumeWidth = `${volume}%`;

  // Calculer la position aléatoire des particules avec Tailwind
  const getParticlePosition = (index: number) => {
    const positions = [
      "left-[5%] top-[10%]", "left-[15%] top-[30%]", "left-[25%] top-[15%]", "left-[35%] top-[40%]", "left-[45%] top-[25%]",
      "left-[55%] top-[60%]", "left-[65%] top-[45%]", "left-[75%] top-[70%]", "left-[85%] top-[55%]", "left-[95%] top-[80%]",
      "left-[10%] top-[85%]", "left-[20%] top-[65%]", "left-[30%] top-[90%]", "left-[40%] top-[75%]", "left-[50%] top-[50%]",
      "left-[60%] top-[35%]", "left-[70%] top-[20%]", "left-[80%] top-[95%]", "left-[90%] top-[10%]", "left-[100%] top-[65%]",
    ];
    return positions[index % positions.length];
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Effets de fond avancés */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-purple-950/30 via-black to-rose-950/20" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-96 h-96 bg-linear-to-br from-purple-600/15 to-pink-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-linear-to-br from-blue-600/10 to-cyan-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-radial-gradient circle-at-center rgba-168-85-247-0-1 transparent-70" />
        </div>
        
        {/* Particules flottantes */}
        {particleStyles.map((style, i) => (
          <div
            key={i}
            className={`absolute w-px h-px bg-white/20 rounded-full animate-float ${getParticlePosition(i)}`}
            style={style}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 py-16">
        {/* Header avec effet "shine" */}
        <div className="text-center mb-20 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent blur-sm" />
          
          <div className="inline-flex items-center gap-4 mb-8 relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
            <Crown className="w-10 h-10 text-yellow-400 animate-bounce" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              <span className="relative">
                <span className="bg-linear-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent animate-gradient">
                  EXCLUSIVITÉS
                </span>
                <span className="absolute inset-0 bg-linear-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent blur-xl opacity-50">
                  EXCLUSIVITÉS
                </span>
              </span>
            </h1>
            <Sparkles className="w-10 h-10 text-yellow-400 animate-spin-slow" />
          </div>
          
          <p className="text-xl text-gray-300/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Contenu réservé aux <span className="text-purple-300 font-semibold">vrais passionnés</span>. 
            Débloquez des <span className="text-pink-300 font-semibold">trésors soniques inédits</span> 
            <br />et accédez à l'expérience ultime.
          </p>
          
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10">
            <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span className="text-lg text-gray-300">
              <span className="text-white font-bold">{exclusiveTracks.length}</span> contenus exclusifs disponibles
            </span>
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Player principal - Version premium */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="relative group">
            {/* Effet de bordure animée */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-500 animate-gradient-border" />
            
            <div className="relative rounded-3xl border border-white/10 bg-linear-to-br from-gray-900/60 to-black/90 backdrop-blur-2xl overflow-hidden">
              {/* Header du player */}
              <div className="p-10 border-b border-white/10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      {exclusiveTracks[currentTrack].tags?.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-xs font-semibold text-purple-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                      {exclusiveTracks[currentTrack].title}
                    </h3>
                    <p className="text-gray-300 text-lg">
                      {exclusiveTracks[currentTrack].description}
                    </p>
                    <div className="flex items-center gap-6 mt-4">
                      <span className="text-sm text-gray-400">
                        <Music className="w-4 h-4 inline mr-2" />
                        {exclusiveTracks[currentTrack].duration}
                      </span>
                      <span className="text-sm text-gray-400">
                        <Star className="w-4 h-4 inline mr-2" />
                        {exclusiveTracks[currentTrack].plays.toLocaleString()} écoutes
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setLiked(!liked)}
                      className="group relative p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                      title="Ajouter aux favoris"
                    >
                      <Heart 
                        className={`w-7 h-7 transition-all duration-300 ${
                          liked 
                            ? 'text-red-400 fill-red-400 scale-110' 
                            : 'text-gray-400 group-hover:text-red-400'
                        }`}
                      />
                      <div className="absolute inset-0 bg-red-400/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button className="group relative p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="Partager">
                      <Share2 className="w-7 h-7 text-gray-400 group-hover:text-green-400 transition-colors" />
                    </button>

                    <button className="group relative p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="Télécharger">
                      <Download className="w-7 h-7 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Zone de contrôle principale */}
              <div className="p-10">
                {/* Barre de progression améliorée */}
                <div className="mb-10">
                  <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
                    <div 
                      className={`absolute h-full bg-linear-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full transition-all duration-300 ${progressWidth === '0%' ? 'w-0' : ''}`}
                      style={{ width: progressWidth }}
                    >
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-purple-500/50" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-sm font-medium text-gray-300">{formatTime(progress)}</span>
                    <span className="text-sm font-medium text-gray-300">
                      {exclusiveTracks[currentTrack].duration}
                    </span>
                  </div>
                </div>

                {/* Contrôles principaux */}
                <div className="flex flex-col items-center gap-10">
                  <div className="flex items-center justify-center gap-10">
                    <button
                      className="group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 transform hover:scale-110"
                      title="Précédent"
                    >
                      <SkipBack className="w-8 h-8 text-gray-400 group-hover:text-white" />
                    </button>

                    <button
                      onClick={() => setPlaying(!playing)}
                      className="relative group"
                      title={playing ? "Pause" : "Lecture"}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-24 h-24 rounded-full bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/30">
                        {playing ? (
                          <Pause className="w-12 h-12 text-white" />
                        ) : (
                          <Play className="w-12 h-12 text-white ml-1" />
                        )}
                      </div>
                    </button>

                    <button
                      className="group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 transform hover:scale-110"
                      title="Suivant"
                    >
                      <SkipForward className="w-8 h-8 text-gray-400 group-hover:text-white" />
                    </button>
                  </div>

                  {/* Contrôle du volume */}
                  <div className="flex items-center justify-center gap-6 w-full max-w-md">
                    <Volume2 className="w-6 h-6 text-gray-400" />
                    <div className="flex-1 relative group">
                      <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ${volumeWidth === '0%' ? 'w-0' : ''}`}
                          style={{ width: volumeWidth }}
                        >
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-purple-500/30" />
                        </div>
                      </div>
                    </div>
                    <span className="text-lg font-medium text-gray-300 min-w-15">
                      {volume}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des exclusivités */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-400" />
              <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Contenu Exclusif
              </span>
            </h2>
            <div className="px-4 py-2 rounded-full bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <span className="text-sm text-purple-300">
                {exclusiveTracks.filter(t => !t.isLocked).length}/{exclusiveTracks.length} débloqués
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {exclusiveTracks.map((track, index) => (
              <div
                key={track.id}
                className={`group relative overflow-hidden rounded-2xl border ${
                  track.isLocked
                    ? "border-gray-800/50 bg-linear-to-r from-gray-900/50 to-black/50"
                    : "border-white/10 bg-linear-to-r from-purple-500/5 via-black/50 to-pink-500/5"
                } p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                  !track.isLocked && "hover:shadow-purple-500/20"
                }`}
              >
                {/* Effet de highlight au survol */}
                <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 via-transparent to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
                
                <div className="relative flex items-center justify-between gap-8">
                  <div className="flex items-center gap-6 flex-1">
                    {/* Badge de statut */}
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        track.isLocked
                          ? "bg-linear-to-br from-gray-800 to-gray-900"
                          : "bg-linear-to-br from-purple-600 to-pink-600"
                      } shadow-lg group-hover:shadow-xl transition-shadow`}>
                        {track.isLocked ? (
                          <Lock className="w-8 h-8 text-gray-400" />
                        ) : (
                          <div className="relative">
                            <Play className="w-8 h-8 text-white" />
                            <div className="absolute inset-0 bg-white/20 rounded-xl blur-md" />
                          </div>
                        )}
                      </div>
                      {!track.isLocked && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-linear-to-r from-green-400 to-emerald-400 flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-white" />
                        </div>
                      )}
                    </div>

                    {/* Info du track */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
                          {track.title}
                        </h3>
                        {track.tags?.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              tag === 'NEW' 
                                ? 'bg-linear-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30'
                                : 'bg-linear-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-gray-300 mb-4">{track.description}</p>
                      
                      <div className="flex items-center gap-8">
                        <div className="flex items-center gap-6">
                          <span className="text-sm text-gray-400 flex items-center gap-2">
                            <Music className="w-4 h-4" />
                            {track.duration}
                          </span>
                          <span className="text-sm text-gray-400 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            {track.plays.toLocaleString()} écoutes
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          Sortie: {track.releaseDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bouton d'action */}
                  <button
                    onClick={() => !track.isLocked && setCurrentTrack(index)}
                    disabled={track.isLocked}
                    className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 ${
                      track.isLocked
                        ? "bg-linear-to-r from-gray-800 to-gray-900 text-gray-400 cursor-not-allowed"
                        : "bg-linear-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:shadow-purple-500/30"
                    }`}
                  >
                    {track.isLocked ? (
                      <>
                        <Lock className="w-5 h-5 inline mr-2" />
                        Débloquer
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 inline mr-2" />
                        Écouter
                      </>
                    )}
                    <div className={`absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity ${
                      track.isLocked ? 'bg-gray-700/50' : 'bg-purple-500/30'
                    }`} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer section */}
          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 mb-4">
              Pour débloquer tout le contenu exclusif, passez à l'offre premium
            </p>
            <button className="px-8 py-4 rounded-xl bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105">
              <Crown className="w-6 h-6 inline mr-3" />
              Devenir Membre Premium
            </button>
          </div>
        </div>
      </div>

      {/* Injection des styles CSS - Version optimisée */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float {
          animation: float 3s infinite ease-in-out;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-gradient-border {
          background-size: 300% 300%;
          animation: gradient-border 3s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Exclusives;