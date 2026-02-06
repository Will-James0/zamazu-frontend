import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Search, 
  Video as VideoIcon, 
  Play,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Upload,
  Calendar,
  Music,
  Heart,
  Eye
} from 'lucide-react'
import { musicAPI } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/_store/auth'
import { useAudioPlayer } from '@/_store/audioPlayer'
import StaffLayout from '@/components/StaffLayout'
import VideoPlayer from '@/components/VideoPlayer'
import { getMediaUrl } from '@/lib/api'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Clips() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const currentUser = useAuth(state => state.user)
  const { clearPlaylist } = useAudioPlayer()
  
  const [clips, setClips] = useState([])
  const [tracks, setTracks] = useState([])
  const [filteredClips, setFilteredClips] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  
  // États pour les modals
  const [deleteDialog, setDeleteDialog] = useState({ open: false, clipCode: null, trackTitle: '' })
  const [addDialog, setAddDialog] = useState(false)
  const [editDialog, setEditDialog] = useState({ open: false, clip: null })
  
  // États pour les formulaires
  const [formData, setFormData] = useState({
    track_code: '',
    video_file: null,
    release_date: ''
  })

  const [previews, setPreviews] = useState({
    cover: null,
    audio: null
  })

  const [videoPreview, setVideoPreview] = useState(null)
  
  // État pour le lecteur vidéo
  const [videoPlayer, setVideoPlayer] = useState({
    open: false,
    url: null,
    title: '',
    description: ''
  })

  useEffect(() => {
    fetchClips()
    fetchTracks()
  }, [])

  useEffect(() => {
    filterClips()
  }, [searchQuery, clips])

  const fetchClips = async () => {
    try {
      setIsLoading(true)
      const data = await musicAPI.getClips()
      console.log('🎬 Données clips reçues:', data)
      const clipsList = Array.isArray(data) ? data : (data?.results || data?.data || [])
      console.log('🎬 Liste des clips:', clipsList)
      setClips(clipsList)
      setFilteredClips(clipsList)
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des clips:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les clips',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTracks = async () => {
    try {
      const data = await musicAPI.getTracks()
      const tracksList = Array.isArray(data) ? data : (data?.results || data?.data || [])
      setTracks(tracksList)
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des tracks:', error)
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

  const handleDeleteClip = async (clipCode) => {
    try {
      await musicAPI.deleteClip(clipCode)
      toast({
        title: 'Succès',
        description: 'Clip supprimé avec succès'
      })
      setDeleteDialog({ open: false, clipCode: null, trackTitle: '' })
      fetchClips()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le clip',
        variant: 'destructive'
      })
    }
  }

  const handleAddClip = async (e) => {
    e.preventDefault()
    
    if (!formData.track_code || !formData.video_file) {
      toast({
        title: 'Erreur',
        description: 'Le track et le fichier vidéo sont obligatoires',
        variant: 'destructive'
      })
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('track_code', formData.track_code)
      formDataToSend.append('video_file', formData.video_file)
      if (formData.release_date) formDataToSend.append('release_date', formData.release_date)

      await musicAPI.createClip(formDataToSend)
      toast({
        title: 'Succès',
        description: 'Clip créé avec succès'
      })
      setAddDialog(false)
      resetForm()
      fetchClips()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de créer le clip',
        variant: 'destructive'
      })
    }
  }

  const handleEditClip = async (e) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      if (formData.track_code) formDataToSend.append('track_code', formData.track_code)
      if (formData.video_file instanceof File) formDataToSend.append('video_file', formData.video_file)
      if (formData.release_date) formDataToSend.append('release_date', formData.release_date)

      await musicAPI.updateClip(editDialog.clip.code, formDataToSend)
      toast({
        title: 'Succès',
        description: 'Clip modifié avec succès'
      })
      setEditDialog({ open: false, clip: null })
      resetForm()
      fetchClips()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de modifier le clip',
        variant: 'destructive'
      })
    }
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, [type]: file }))
      
      if (type === 'video_file') {
        const url = URL.createObjectURL(file)
        setVideoPreview(url)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      track_code: '',
      video_file: null,
      release_date: ''
    })
    setVideoPreview(null)
  }

  const handleToggleLike = async (clipCode) => {
    try {
      const response = await musicAPI.toggleLike('clip', clipCode)
      
      // Mettre à jour le clip dans la liste
      setClips(prevClips => prevClips.map(clip => {
        if (clip.code === clipCode) {
          return {
            ...clip,
            is_liked: response.liked,
            likes_count: response.likes_count
          }
        }
        return clip
      }))
      
      toast({
        title: response.liked ? 'Clip liké' : 'Like retiré',
        description: `${response.likes_count} like(s)`,
      })
    } catch (error) {
      console.error('❌ Erreur lors du toggle like:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de liker le clip',
        variant: 'destructive'
      })
    }
  }

  const openEditDialog = (clip) => {
    setFormData({
      track_code: clip.track?.code || '',
      video_file: null,
      release_date: clip.release_date || ''
    })
    setEditDialog({ open: true, clip })
  }

  const openVideoPlayer = async (clip) => {
    console.log('🎬 Ouverture du lecteur vidéo:', clip)
    console.log('📹 URL vidéo:', getMediaUrl(clip.video_file))
    
    // Arrêter la musique si elle joue
    clearPlaylist()
    
    setVideoPlayer({
      open: true,
      url: getMediaUrl(clip.video_file),
      title: clip.track?.title || 'Clip vidéo',
      description: `Sortie le ${clip.release_date ? new Date(clip.release_date).toLocaleDateString('fr-FR') : 'Date inconnue'}`
    })
    console.log('✅ État videoPlayer mis à jour:', {
      open: true,
      url: getMediaUrl(clip.video_file),
      title: clip.track?.title || 'Clip vidéo'
    })
    
    // Enregistrer la vue
    try {
      const response = await musicAPI.recordView('clip', clip.code)
      // Mettre à jour le compteur de vues
      setClips(prevClips => prevClips.map(c => {
        if (c.code === clip.code) {
          return { ...c, views_count: response.views_count }
        }
        return c
      }))
      console.log('👁️ Vue enregistrée:', response)
    } catch (error) {
      console.error('❌ Erreur lors de l\'enregistrement de la vue:', error)
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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredClips.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredClips.length / itemsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <StaffLayout>
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/staff/dashboard')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <VideoIcon className="h-6 w-6 text-pink-400" />
                <h1 className="text-xl font-bold text-white">Gestion des Clips</h1>
              </div>
            </div>
            <Button 
              onClick={() => setAddDialog(true)}
              className="bg-pink-600 hover:bg-pink-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un Clip
            </Button>
          </div>
        </div>
      </header>

      <main className="p-8">
        {/* Search and Filters */}
        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un clip par titre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        {/* Clips Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : currentItems.length === 0 ? (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <VideoIcon className="h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Aucun clip trouvé</h3>
              <p className="text-gray-400 mb-6">Commencez par ajouter votre premier clip vidéo</p>
              <Button onClick={() => setAddDialog(true)} className="bg-pink-600 hover:bg-pink-700">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un Clip
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((clip) => (
                <Card key={clip.code} className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden group hover:border-pink-500/50 transition-all">
                  <div className="relative aspect-video bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                    {clip.video_file ? (
                      <video 
                        src={getMediaUrl(clip.video_file)} 
                        className="w-full h-full object-cover"
                        controls={false}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <VideoIcon className="h-16 w-16 text-pink-400/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20 h-16 w-16"
                        onClick={() => openVideoPlayer(clip)}
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-1">
                          {clip.track?.title || 'Sans titre'}
                        </CardTitle>
                        <CardDescription className="text-gray-400 flex items-center gap-2">
                          <Music className="h-3 w-3" />
                          {clip.track?.title || 'Track non disponible'}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem 
                            onClick={() => openEditDialog(clip)}
                            className="text-gray-300 hover:text-white hover:bg-gray-700"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => setDeleteDialog({ 
                              open: true, 
                              clipCode: clip.code, 
                              trackTitle: clip.track?.title || 'ce clip'
                            })}
                            className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
                          onClick={() => handleToggleLike(clip.code)}
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
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  Précédent
                </Button>
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      onClick={() => paginate(index + 1)}
                      className={currentPage === index + 1 
                        ? "bg-pink-600 hover:bg-pink-700" 
                        : "border-white/10 text-white hover:bg-white/10"
                      }
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => paginate(currentPage + 1)}
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

      {/* Dialog Ajout Clip */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau clip</DialogTitle>
            <DialogDescription className="text-gray-400">
              Créez un clip vidéo associé à un track
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddClip}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="track_code">Track associé *</Label>
                <Select 
                  value={formData.track_code} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, track_code: value }))}
                >
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Sélectionner un track" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {tracks.map((track) => (
                      <SelectItem key={track.code} value={track.code} className="text-white">
                        {track.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video_file">Fichier vidéo *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="video_file"
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, 'video_file')}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                {videoPreview && (
                  <video 
                    src={videoPreview} 
                    controls 
                    className="w-full rounded-lg mt-2"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="release_date">Date de sortie</Label>
                <Input
                  id="release_date"
                  type="date"
                  value={formData.release_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, release_date: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setAddDialog(false)
                resetForm()
              }}>
                Annuler
              </Button>
              <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                <Upload className="h-4 w-4 mr-2" />
                Créer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Modification Clip */}
      <Dialog open={editDialog.open} onOpenChange={(open) => {
        setEditDialog({ open, clip: null })
        if (!open) resetForm()
      }}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Modifier le clip</DialogTitle>
            <DialogDescription className="text-gray-400">
              Modifiez les informations du clip
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditClip}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit_track_code">Track associé</Label>
                <Select 
                  value={formData.track_code} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, track_code: value }))}
                >
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Sélectionner un track" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {tracks.map((track) => (
                      <SelectItem key={track.code} value={track.code} className="text-white">
                        {track.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit_video_file">Nouveau fichier vidéo (optionnel)</Label>
                <Input
                  id="edit_video_file"
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, 'video_file')}
                  className="bg-white/5 border-white/10"
                />
                {videoPreview && (
                  <video 
                    src={videoPreview} 
                    controls 
                    className="w-full rounded-lg mt-2"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit_release_date">Date de sortie</Label>
                <Input
                  id="edit_release_date"
                  type="date"
                  value={formData.release_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, release_date: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setEditDialog({ open: false, clip: null })
                resetForm()
              }}>
                Annuler
              </Button>
              <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Suppression */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <AlertDialogContent className="bg-gray-900 border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Êtes-vous sûr de vouloir supprimer le clip "{deleteDialog.trackTitle}" ? 
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleDeleteClip(deleteDialog.clipCode)}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Lecteur Vidéo */}
      <VideoPlayer
        isOpen={videoPlayer.open}
        onClose={closeVideoPlayer}
        videoUrl={videoPlayer.url}
        title={videoPlayer.title}
        description={videoPlayer.description}
      />
    </StaffLayout>
  )
}
