import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Music as MusicIcon, 
  Play,
  Pause,
  Heart,
  Eye,
  Search,
  Calendar
} from 'lucide-react'
import { musicAPI } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { useAudioPlayer } from '@/_store/audioPlayer'
import MemberLayout from '@/components/MemberLayout'
import AudioPlayer from '@/components/AudioPlayer'
import { getMediaUrl } from '@/lib/api'

export default function MemberTracks() {
  const { toast } = useToast()
  const { currentTrack, isPlaying, playTrack, playPlaylist, clearPlaylist } = useAudioPlayer()
  
  const [tracks, setTracks] = useState([])
  const [filteredTracks, setFilteredTracks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    fetchTracks()
  }, [])

  // Cleanup au démontage
  useEffect(() => {
    return () => {
      clearPlaylist()
    }
  }, [])

  useEffect(() => {
    filterTracks()
  }, [searchQuery, tracks])

  const fetchTracks = async () => {
    try {
      setIsLoading(true)
      const data = await musicAPI.getTracks()
      const tracksList = Array.isArray(data) ? data : (data?.results || data?.data || [])
      setTracks(tracksList)
      setFilteredTracks(tracksList)
    } catch (error) {
      console.error('❌ Erreur:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les musiques',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterTracks = () => {
    let filtered = [...tracks]

    if (searchQuery) {
      filtered = filtered.filter(track => {
        const searchLower = searchQuery.toLowerCase()
        return (
          track.title?.toLowerCase().includes(searchLower) ||
          track.album?.title?.toLowerCase().includes(searchLower)
        )
      })
    }

    setFilteredTracks(filtered)
  }

  const handlePlayTrack = (track) => {
    const trackIndex = filteredTracks.findIndex(t => t.code === track.code)
    
    if (currentTrack?.code === track.code) {
      playTrack(track)
    } else {
      playPlaylist(filteredTracks, trackIndex >= 0 ? trackIndex : 0)
    }
  }

  const handlePlayAll = () => {
    if (filteredTracks.length > 0) {
      playPlaylist(filteredTracks, 0)
    }
  }

  const handleToggleLike = async (track, e) => {
    e.stopPropagation()
    
    try {
      const response = await musicAPI.toggleLike('track', track.code)
      
      setTracks(prevTracks => prevTracks.map(t => 
        t.code === track.code 
          ? { ...t, is_liked: response.liked, likes_count: response.likes_count }
          : t
      ))
      
      toast({
        title: response.liked ? 'Ajouté aux favoris' : 'Retiré des favoris',
      })
    } catch (error) {
      console.error('❌ Erreur toggle like:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de liker',
        variant: 'destructive'
      })
    }
  }

  const formatDate = (date) => {
    if (!date) return 'Non définie'
    return new Date(date).toLocaleDateString('fr-FR')
  }

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTracks = filteredTracks.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredTracks.length / itemsPerPage)

  return (
    <MemberLayout>
      <div className="pb-24">
        {/* Header */}
        <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MusicIcon className="h-8 w-8 text-pink-400" />
                <div>
                  <h1 className="text-3xl font-bold text-white">Musiques</h1>
                  <p className="text-gray-400">{filteredTracks.length} titre{filteredTracks.length > 1 ? 's' : ''}</p>
                </div>
              </div>
              {filteredTracks.length > 0 && (
                <Button 
                  onClick={handlePlayAll}
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Tout lire
                </Button>
              )}
            </div>

            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher une musique ou un album..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </header>

        <main className="p-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Toutes les musiques</CardTitle>
              <CardDescription className="text-gray-400">
                Explorez et écoutez toutes les musiques disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400"></div>
                  <span className="ml-3 text-gray-400">Chargement...</span>
                </div>
              ) : filteredTracks.length === 0 ? (
                <div className="text-center py-12">
                  <MusicIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Aucune musique trouvée</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {paginatedTracks.map((track) => {
                    const isCurrentTrack = currentTrack?.code === track.code
                    const isPlayingTrack = isCurrentTrack && isPlaying
                    
                    return (
                      <div 
                        key={track.code}
                        className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                      >
                        {/* Play button */}
                        <div className="w-12 flex items-center justify-center">
                          <button
                            onClick={() => handlePlayTrack(track)}
                            className={`${isPlayingTrack ? 'text-pink-400' : isCurrentTrack ? 'text-pink-400' : 'text-gray-400'} hover:text-white hover:scale-110 transition-all`}
                          >
                            {isPlayingTrack ? (
                              <Pause className="h-5 w-5" fill="currentColor" />
                            ) : (
                              <Play className="h-5 w-5" fill="currentColor" />
                            )}
                          </button>
                        </div>

                        {/* Cover + Infos */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-12 h-12 rounded bg-gradient-to-br from-pink-500 to-purple-500 flex-shrink-0 overflow-hidden">
                            {track.cover_image ? (
                              <img 
                                src={getMediaUrl(track.cover_image)} 
                                alt={track.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white font-bold">
                                {track.title?.[0]?.toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className={`font-medium truncate ${isCurrentTrack ? 'text-pink-400' : 'text-white'}`}>
                              {track.title}
                            </h3>
                            {track.album && (
                              <p className="text-gray-400 text-sm truncate">{track.album.title}</p>
                            )}
                          </div>
                        </div>

                        {/* Date */}
                        <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar className="h-4 w-4" />
                          {formatDate(track.release_date)}
                        </div>

                        {/* Vues */}
                        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                          <Eye className="h-4 w-4" />
                          <span>{track.views_count || 0}</span>
                        </div>

                        {/* Like */}
                        <button
                          onClick={(e) => handleToggleLike(track, e)}
                          className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors"
                        >
                          <Heart 
                            className={`h-5 w-5 ${track.is_liked ? 'fill-pink-400 text-pink-400' : ''}`}
                          />
                          <span className="text-sm">
                            {track.likes_count || 0}
                          </span>
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Pagination */}
              {!isLoading && filteredTracks.length > itemsPerPage && (
                <div className="p-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                      Affichage de {startIndex + 1} à {Math.min(endIndex, filteredTracks.length)} sur {filteredTracks.length} musiques
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="border-white/10 text-white hover:bg-white/10"
                      >
                        Précédent
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="border-white/10 text-white hover:bg-white/10"
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Lecteur audio */}
      <AudioPlayer />
    </MemberLayout>
  )
}
