import { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, Heart, 
  Share2, Download, Lock, Crown, Sparkles 
} from "lucide-react";

const ExclusivesPage = () => {
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(80);

  const exclusiveTracks = [
    {
      id: 1,
      title: "Démo Inédite 2024",
      duration: "2:45",
      description: "Premier aperçu du prochain projet",
      isLocked: false,
      plays: 1250,
      releaseDate: "2024-12-01"
    },
    {
      id: 2,
      title: "Studio Session #1",
      duration: "3:20",
      description: "Enregistrement live en studio",
      isLocked: true,
      plays: 0,
      releaseDate: "2024-12-15"
    },
    {
      id: 3,
      title: "Acoustique Version",
      duration: "4:10",
      description: "Réinterprétation acoustique exclusive",
      isLocked: true,
      plays: 0,
      releaseDate: "2025-01-10"
    }
  ];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background exclusif */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-rose-950/10" />
      
      {/* Effets spéciaux */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-600/10 to-pink-600/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 py-16">
        
        {/* Header exclusif */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                EXCLUSIVITÉS
              </span>
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-spin-slow" />
          </div>
          
          <p className="text-gray-400 max-w-xl mx-auto">
            Contenu réservé aux vrais passionnés. Débloquez des trésors soniques inédits.
          </p>
        </div>

        {/* Player audio exclusif */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-gray-900/50 to-black/80 backdrop-blur-xl overflow-hidden">
            
            {/* Header player */}
            <div className="p-8 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {exclusiveTracks[currentTrack].title}
                  </h3>
                  <p className="text-gray-400">
                    {exclusiveTracks[currentTrack].description}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Heart className="w-6 h-6 text-gray-400 hover:text-red-400 cursor-pointer" />
                  <Share2 className="w-6 h-6 text-gray-400 hover:text-green-400 cursor-pointer" />
                  <Download className="w-6 h-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Contrôles player */}
            <div className="p-8">
              {/* Barre de progression */}
              <div className="mb-8">
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-400">0:00</span>
                  <span className="text-sm text-gray-400">{exclusiveTracks[currentTrack].duration}</span>
                </div>
              </div>

              {/* Boutons contrôle */}
              <div className="flex items-center justify-center gap-8 mb-8">
                <button className="p-3 rounded-full hover:bg-gray-800/50 transition-colors">
                  <SkipBack className="w-6 h-6 text-gray-400" />
                </button>
                
                <button
                  onClick={() => setPlaying(!playing)}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {playing ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white" />
                  )}
                </button>
                
                <button className="p-3 rounded-full hover:bg-gray-800/50 transition-colors">
                  <SkipForward className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center justify-center gap-4">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${volume}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400">{volume}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des exclusivités */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Contenu Exclusif</h2>
          
          <div className="space-y-4">
            {exclusiveTracks.map((track, index) => (
              <div
                key={track.id}
                className={`group rounded-xl border ${
                  track.isLocked 
                    ? 'border-gray-800 bg-gray-900/30' 
                    : 'border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-pink-500/5'
                } p-6 flex items-center justify-between transition-all duration-300`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    track.isLocked 
                      ? 'bg-gray-800' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600'
                  }`}>
                    {track.isLocked ? (
                      <Lock className="w-6 h-6 text-gray-400" />
                    ) : (
                      <Play className="w-6 h-6 text-white" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-white">{track.title}</h3>
                      {track.isLocked && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">
                          VERROUILLÉ
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{track.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">{track.duration}</span>
                      <span className="text-xs text-gray-500">
                        {track.plays.toLocaleString()} écoutes
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => !track.isLocked && setCurrentTrack(index)}
                  className={`px-6 py-2 rounded-lg ${
                    track.isLocked
                      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
                  }`}
                  disabled={track.isLocked}
                >
                  {track.isLocked ? 'Débloquer' : 'Écouter'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusivesPage;