import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Music, 
  Video, 
  Album as AlbumIcon, 
  Play, 
  Heart,
  Eye,
  Clock,
  TrendingUp
} from 'lucide-react'
import { musicAPI } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import MemberLayout from '@/components/MemberLayout'
import { getMediaUrl } from '@/lib/api'

export default function MemberHome() {
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = useState(true)
  const [tracks, setTracks] = useState([])
  const [clips, setClips] = useState([])
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    fetchAllContent()
  }, [])

  const fetchAllContent = async () => {
    try {
      setIsLoading(true)
      const [tracksData, clipsData, albumsData] = await Promise.all([
        musicAPI.getTracks(),
        musicAPI.getClips(),
        musicAPI.getAlbums()
      ])
      
      const tracksList = Array.isArray(tracksData) ? tracksData : (tracksData?.results || tracksData?.data || [])
      const clipsList = Array.isArray(clipsData) ? clipsData : (clipsData?.results || clipsData?.data || [])
      const albumsList = Array.isArray(albumsData) ? albumsData : (albumsData?.results || albumsData?.data || [])
      
      // Prendre les 4 derniers de chaque
      setTracks(tracksList.slice(0, 4))
      setClips(clipsList.slice(0, 4))
      setAlbums(albumsList.slice(0, 4))
    } catch (error) {
      console.error('❌ Erreur lors du chargement:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger le contenu',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleLike = async (contentType, code) => {
    try {
      const response = await musicAPI.toggleLike(contentType, code)
      
      // Mettre à jour la liste appropriée
      if (contentType === 'track') {
        setTracks(prev => prev.map(item => 
          item.code === code 
            ? { ...item, is_liked: response.liked, likes_count: response.likes_count }
            : item
        ))
      } else if (contentType === 'clip') {
        setClips(prev => prev.map(item => 
          item.code === code 
            ? { ...item, is_liked: response.liked, likes_count: response.likes_count }
            : item
        ))
      } else if (contentType === 'album') {
        setAlbums(prev => prev.map(item => 
          item.code === code 
            ? { ...item, is_liked: response.liked, likes_count: response.likes_count }
            : item
        ))
      }
      
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

  return (
    <MemberLayout>
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Bienvenue sur Zamazu</h1>
          <p className="text-gray-400">Découvrez les dernières sorties musicales</p>
        </div>
      </header>

      <main className="p-8 space-y-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          </div>
        ) : (
          <>
            {/* Derniers Albums */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <AlbumIcon className="h-6 w-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Derniers Albums</h2>
                </div>
                {albums.length > 4 && (
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/member/albums')}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Voir tout
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {albums.map((album) => (
                  <Card 
                    key={album.code} 
                    className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden group hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() => navigate(`/member/albums/${album.code}`)}
                  >
                    <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative">
                      {album.cover_image ? (
                        <img 
                          src={getMediaUrl(album.cover_image)} 
                          alt={album.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <AlbumIcon className="h-16 w-16 text-purple-400/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-lg truncate">{album.title}</CardTitle>
                      <CardDescription className="text-gray-400 flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {album.release_date ? new Date(album.release_date).getFullYear() : 'N/A'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{album.views_count || 0}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleLike('album', album.code)
                          }}
                          className={`${album.is_liked ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-500`}
                        >
                          <Heart className={`h-4 w-4 ${album.is_liked ? 'fill-pink-500' : ''}`} />
                          <span className="ml-1 text-xs">{album.likes_count || 0}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Dernières Musiques */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Music className="h-6 w-6 text-pink-400" />
                  <h2 className="text-2xl font-bold text-white">Dernières Musiques</h2>
                </div>
                {tracks.length > 4 && (
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/member/tracks')}
                    className="text-pink-400 hover:text-pink-300"
                  >
                    Voir tout
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tracks.map((track) => (
                  <Card 
                    key={track.code} 
                    className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden group hover:bg-white/10 transition-all"
                  >
                    <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 relative">
                      {track.cover_image ? (
                        <img 
                          src={getMediaUrl(track.cover_image)} 
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Music className="h-16 w-16 text-pink-400/50" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-lg truncate">{track.title}</CardTitle>
                      <CardDescription className="text-gray-400 truncate">
                        {track.album?.title || 'Single'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{track.views_count || 0}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleLike('track', track.code)}
                          className={`${track.is_liked ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-500`}
                        >
                          <Heart className={`h-4 w-4 ${track.is_liked ? 'fill-pink-500' : ''}`} />
                          <span className="ml-1 text-xs">{track.likes_count || 0}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Derniers Clips */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Video className="h-6 w-6 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Derniers Clips</h2>
                </div>
                {clips.length > 4 && (
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/member/clips')}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Voir tout
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {clips.map((clip) => (
                  <Card 
                    key={clip.code} 
                    className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden group hover:bg-white/10 transition-all"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative">
                      {clip.video_file ? (
                        <video 
                          src={getMediaUrl(clip.video_file)} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Video className="h-16 w-16 text-blue-400/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-lg truncate">
                        {clip.track?.title || 'Clip vidéo'}
                      </CardTitle>
                      <CardDescription className="text-gray-400 flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {clip.release_date ? new Date(clip.release_date).toLocaleDateString('fr-FR') : 'N/A'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{clip.views_count || 0}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleLike('clip', clip.code)}
                          className={`${clip.is_liked ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-500`}
                        >
                          <Heart className={`h-4 w-4 ${clip.is_liked ? 'fill-pink-500' : ''}`} />
                          <span className="ml-1 text-xs">{clip.likes_count || 0}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </MemberLayout>
  )
}
