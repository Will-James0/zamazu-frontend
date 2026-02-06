import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  X
} from 'lucide-react'
import { Slider } from '@/components/ui/slider'

export default function VideoPlayer({ isOpen, onClose, videoUrl, title, description }) {
  console.log('🎥 VideoPlayer rendu avec props:', { isOpen, videoUrl, title })
  
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isSeeking, setIsSeeking] = useState(false)
  const controlsTimeoutRef = useRef(null)

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.load()
    }
  }, [videoUrl])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      if (!isSeeking) {
        setCurrentTime(video.currentTime)
      }
    }
    const updateDuration = () => setDuration(video.duration)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('ended', handleEnded)
    }
  }, [isSeeking])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const handleSeek = (value) => {
    const video = videoRef.current
    if (!video) return
    
    video.currentTime = value[0]
    setCurrentTime(value[0])
    setIsSeeking(false)
  }

  const handleSeekChange = (value) => {
    setIsSeeking(true)
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value) => {
    const video = videoRef.current
    if (!video) return
    
    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume || 0.5
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const skip = (seconds) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!document.fullscreenElement) {
      video.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const handleClose = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
      setIsPlaying(false)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-6xl w-full bg-black border-none p-0 gap-0"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div 
          className="relative bg-black group"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Bouton fermer */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className={`absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white transition-opacity ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Vidéo */}
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full aspect-video bg-black"
            onClick={togglePlay}
            preload="auto"
          />

          {/* Overlay de lecture au centre */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              onClick={togglePlay}
            >
              <div className="bg-pink-600 hover:bg-pink-700 rounded-full p-6 transition-all hover:scale-110">
                <Play className="h-12 w-12 text-white ml-1" />
              </div>
            </div>
          )}

          {/* Contrôles */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 transition-opacity ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barre de progression */}
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeekChange}
              onValueCommit={handleSeek}
              className="mb-4 cursor-pointer"
            />

            {/* Contrôles principaux */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                {/* Skip Back */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => skip(-10)}
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>

                {/* Skip Forward */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => skip(10)}
                  className="text-white hover:bg-white/20"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="w-24"
                  />
                </div>

                {/* Time */}
                <span className="text-white text-sm font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Fullscreen */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Titre et description en haut (masquables) */}
          {title && (
            <div 
              className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent p-6 pt-16 transition-opacity ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
              {description && (
                <p className="text-gray-300 text-sm">{description}</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
