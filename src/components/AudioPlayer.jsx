import { useEffect, useRef } from 'react'
import { useAudioPlayer } from '@/_store/audioPlayer'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Repeat1,
  Shuffle
} from 'lucide-react'

export default function AudioPlayer() {
  const audioRef = useRef(null)
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    isMuted,
    isShuffled,
    repeatMode,
    setAudioElement,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeatMode,
    updateTime,
    updateDuration,
    handleEnded
  } = useAudioPlayer()

  // Initialiser l'élément audio
  useEffect(() => {
    if (audioRef.current) {
      console.log('🎵 AudioPlayer: Élément audio initialisé', audioRef.current);
      setAudioElement(audioRef.current)
    }
  }, [setAudioElement])

  // Event listeners pour l'audio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => updateTime(audio.currentTime)
    const handleDurationChange = () => updateDuration(audio.duration)
    const handleAudioEnded = () => handleEnded()
    const handleCanPlay = () => console.log('✅ Audio prêt à être lu')
    const handleLoadStart = () => console.log('🔄 Chargement audio...')
    const handleError = (e) => console.error('❌ Erreur audio:', e, audio.error)
    const handlePause = () => {
      console.log('⏸️ Audio mis en pause')
      // Synchroniser l'état avec la réalité
      if (isPlaying) {
        console.log('🔄 Mise à jour de isPlaying à false')
        useAudioPlayer.setState({ isPlaying: false })
      }
    }
    const handlePlay = () => {
      console.log('▶️ Audio en lecture')
      // Synchroniser l'état avec la réalité
      if (!isPlaying) {
        console.log('🔄 Mise à jour de isPlaying à true')
        useAudioPlayer.setState({ isPlaying: true })
      }
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.addEventListener('ended', handleAudioEnded)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('error', handleError)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('play', handlePlay)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.removeEventListener('ended', handleAudioEnded)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('play', handlePlay)
    }
  }, [updateTime, updateDuration, handleEnded, isPlaying])

  // Format du temps (mm:ss)
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Audio element toujours présent (caché) */}
      <audio ref={audioRef} />

      {/* Lecteur fixe en bas - affiché seulement si une track est en cours */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Info de la track */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-14 h-14 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 overflow-hidden">
                {currentTrack.cover_image ? (
                  <img 
                    src={currentTrack.cover_image} 
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold">
                    {currentTrack.title?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-white font-medium truncate">{currentTrack.title}</h4>
                {currentTrack.album && (
                  <p className="text-gray-400 text-sm truncate">{currentTrack.album.title}</p>
                )}
              </div>
            </div>

            {/* Contrôles centraux */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
              {/* Boutons de contrôle */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleShuffle}
                  className={`text-gray-400 hover:text-white ${isShuffled ? 'text-purple-400' : ''}`}
                >
                  <Shuffle className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={previous}
                  className="text-gray-400 hover:text-white"
                >
                  <SkipBack className="h-5 w-5" />
                </Button>

                <Button
                  onClick={togglePlay}
                  className="bg-white hover:bg-gray-200 text-black rounded-full w-10 h-10 p-0"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" fill="currentColor" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={next}
                  className="text-gray-400 hover:text-white"
                >
                  <SkipForward className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cycleRepeatMode}
                  className={`text-gray-400 hover:text-white ${repeatMode !== 'none' ? 'text-purple-400' : ''}`}
                >
                  {repeatMode === 'one' ? (
                    <Repeat1 className="h-4 w-4" />
                  ) : (
                    <Repeat className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Barre de progression */}
              <div className="flex items-center gap-2 w-full">
                <span className="text-xs text-gray-400 w-12 text-right">
                  {formatTime(currentTime)}
                </span>
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={1}
                  onValueChange={([value]) => seek(value)}
                  className="flex-1"
                />
                <span className="text-xs text-gray-400 w-12">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Contrôle du volume */}
            <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-gray-400 hover:text-white"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                max={100}
                step={1}
                onValueChange={([value]) => setVolume(value / 100)}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  )
}
