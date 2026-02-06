import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Video as VideoIcon, 
  Play,
  Heart,
  Eye,
  Search,
  Calendar,
  Music
} from 'lucide-react'
import { musicAPI } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { useAudioPlayer } from '@/_store/audioPlayer'
import MemberLayout from '@/components/MemberLayout'
import VideoPlayer from '@/components/VideoPlayer'
import { getMediaUrl } from '@/lib/api'

export default function MemberClips() {
  const { toast } = useToast()
  const { clearPlaylist } = useAudioPlayer()
  
  const [clips, setClips] = useState([])
  const [filteredClips, setFilteredClips] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  
  // Lecteur vidéo
  const [videoPlayer, setVideoPlayer] = useState({
    open: false,
    url: null,
    title: '',
    description: ''
  })

  useEffect(() => {
    fetchClips()
  }, [])

  useEffect(() => {
    filterClips()
  }, [searchQuery, clips])

  const fetchClips = async () => {
    try {
      setIsLoading(true)
      const data = await musicAPI.getClips()
      const clipsList = Array.isArray(data) ? data : (data?.results || data?.data || [])
      setClips(clipsList)
      setFilteredClips(clipsList)
    } catch (error) {
      console.error('❌ Erreur:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les clips',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterClips = () => {
    let filtered = [...clips]

    if (searchQuery) {
      filtered = filtered.filter(clip => {
        const searchLower = searchQuery.toLowerCase()
        return clip.track?.title?.toLowerCase().includes(searchLower)
      })
    }

    setFilteredClips(filtered)
  }

  const openVideoPlayer = async (clip) => {
    // Arrêter la musique si elle joue
    clearPlaylist()
    
    setVideoPlayer({
      open: true,
      url: getMediaUrl(clip.video_file),
      title: clip.track?.title || 'Clip vidéo',
      description: `Sortie le ${clip.release_date ? new Date(clip.release_date).toLocaleDateString('fr-FR') : 'Date inconnue'}`
    })
    
    // Enregistrer la vue
    try {
      const response = await musicAPI.recordView('clip', clip.code)
      setClips(prevClips => prevClips.map(c => {
        if (c.code === clip.code) {
          return { ...c, views_count: response.views_count }
        }
        return c
      }))
    } catch (error) {
      console.error('❌ Erreur vue:', error)
    }
  }

  const closeVideoPlayer = () => {
    setVideoPlayer({
      open: false,
      url: null,
      title: '',
      description: ''
    })
  }

  const handleToggleLike = async (clipCode, e) => {
    e.stopPropagation()
    
    try {
      const response = await musicAPI.toggleLike('clip', clipCode)
      
      setClips(prevClips => prevClips.map(clip => 
        clip.code === clipCode 
          ? { ...clip, is_liked: response.liked, likes_count: response.likes_count }
          : clip
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

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedClips = filteredClips.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredClips.length / itemsPerPage)

  return (
    <MemberLayout>
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <VideoIcon className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Clips Vidéo</h1>
                <p className="text-gray-400">{filteredClips.length} clip{filteredClips.length > 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Rechercher un clip..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
        </div>
      </header>

      <main className="p-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        ) : filteredClips.length === 0 ? (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <VideoIcon className="h-16 w-16 text-gray-600 mb-4" />
              <p className="text-gray-400 mb-2">Aucun clip trouvé</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedClips.map((clip) => (
                <Card 
                  key={clip.code} 
                  className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden group hover:border-blue-500/50 transition-all cursor-pointer"
                  onClick={() => openVideoPlayer(clip)}
                >
                  <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    {clip.video_file ? (
                      <video 
                        src={getMediaUrl(clip.video_file)} 
                        className="w-full h-full object-cover"
                        controls={false}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <VideoIcon className="h-16 w-16 text-blue-400/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20 h-16 w-16"
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg mb-1 truncate">
                      {clip.track?.title || 'Sans titre'}
                    </CardTitle>
                    <CardDescription className="text-gray-400 flex items-center gap-2">
                      <Music className="h-3 w-3" />
                      {clip.track?.title || 'Track non disponible'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="h-3 w-3" />
                        {clip.release_date 
                          ? new Date(clip.release_date).toLocaleDateString('fr-FR')
                          : 'Non définie'
                        }
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                          <Eye className="h-4 w-4" />
                          <span>{clip.views_count || 0}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleToggleLike(clip.code, e)}
                          className={`gap-1.5 hover:bg-pink-500/20 ${
                            clip.is_liked ? 'text-pink-500' : 'text-gray-400'
                          }`}
                        >
                          <Heart 
                            className={`h-4 w-4 ${
                              clip.is_liked ? 'fill-pink-500' : ''
                            }`} 
                          />
                          <span className="text-xs">{clip.likes_count || 0}</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  Précédent
                </Button>
                <span className="flex items-center px-4 text-gray-400">
                  Page {currentPage} sur {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  Suivant
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Lecteur vidéo */}
      <VideoPlayer
        isOpen={videoPlayer.open}
        onClose={closeVideoPlayer}
        videoUrl={videoPlayer.url}
        title={videoPlayer.title}
        description={videoPlayer.description}
      />
    </MemberLayout>
  )
}
