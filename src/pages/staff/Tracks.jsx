import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Music as MusicIcon, 
  Play,
  Pause,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Upload,
  Calendar,
  Heart,
  Eye
} from 'lucide-react'
import { musicAPI } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/_store/auth'
import { useAudioPlayer } from '@/_store/audioPlayer'
import StaffLayout from '@/components/StaffLayout'
import AudioPlayer from '@/components/AudioPlayer'
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

export default function Tracks() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const currentUser = useAuth(state => state.user)
  const { currentTrack, isPlaying, playTrack, playPlaylist, clearPlaylist } = useAudioPlayer()
  
  const [tracks, setTracks] = useState([])
  const [filteredTracks, setFilteredTracks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  
  // États pour les modals
  const [deleteDialog, setDeleteDialog] = useState({ open: false, trackCode: null, trackTitle: '' })
  const [addDialog, setAddDialog] = useState(false)
  const [editDialog, setEditDialog] = useState({ open: false, track: null })
  
  // États pour les formulaires
  const [formData, setFormData] = useState({
    title: '',
    cover_image: null,
    audio_file: null,
    release_date: ''
  })

  const [previews, setPreviews] = useState({
    cover: null,
    audio: null
  })

  useEffect(() => {
    fetchTracks()
  }, [])

  // Cleanup: arrêter la musique quand on quitte la page
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
      console.log('🎵 Données tracks reçues:', data)
      const tracksList = Array.isArray(data) ? data : (data?.results || data?.data || [])
      console.log('🎵 Liste des tracks:', tracksList)
      setTracks(tracksList)
      setFilteredTracks(tracksList)
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des tracks:', error)
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

  const handleDeleteTrack = async (trackCode) => {
    try {
      await musicAPI.deleteTrack(trackCode)
      toast({
        title: 'Succès',
        description: 'Musique supprimée avec succès'
      })
      setDeleteDialog({ open: false, trackCode: null, trackTitle: '' })
      fetchTracks()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer la musique',
        variant: 'destructive'
      })
    }
  }

  const handleAddTrack = async (e) => {
    e.preventDefault()
    
    if (!formData.audio_file) {
      toast({
        title: 'Erreur',
        description: 'Le fichier audio est obligatoire',
        variant: 'destructive'
      })
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      if (formData.cover_image) formDataToSend.append('cover_image', formData.cover_image)
      formDataToSend.append('audio_file', formData.audio_file)
      if (formData.release_date) formDataToSend.append('release_date', formData.release_date)

      await musicAPI.createTrack(formDataToSend)
      toast({
        title: 'Succès',
        description: 'Musique créée avec succès'
      })
      setAddDialog(false)
      resetForm()
      fetchTracks()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de créer la musique',
        variant: 'destructive'
      })
    }
  }

  const handleEditTrack = async (e) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      if (formData.title) formDataToSend.append('title', formData.title)
      if (formData.cover_image instanceof File) formDataToSend.append('cover_image', formData.cover_image)
      if (formData.audio_file instanceof File) formDataToSend.append('audio_file', formData.audio_file)
      if (formData.release_date) formDataToSend.append('release_date', formData.release_date)

      await musicAPI.updateTrack(editDialog.track.code, formDataToSend)
      toast({
        title: 'Succès',
        description: 'Musique modifiée avec succès'
      })
      setEditDialog({ open: false, track: null })
      resetForm()
      fetchTracks()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier la musique',
        variant: 'destructive'
      })
    }
  }

  const openEditDialog = (track) => {
    setFormData({
      title: track.title || '',
      cover_image: track.cover_image || null,
      audio_file: track.audio_file || null,
      release_date: track.release_date || ''
    })
    setPreviews({
      cover: track.cover_image,
      audio: null
    })
    setEditDialog({ open: true, track })
  }

  const resetForm = () => {
    setFormData({
      title: '',
      cover_image: null,
      audio_file: null,
      release_date: ''
    })
    setPreviews({ cover: null, audio: null })
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    if (type === 'cover') {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Erreur',
          description: 'L\'image ne doit pas dépasser 5MB',
          variant: 'destructive'
        })
        return
      }
      setFormData({ ...formData, cover_image: file })
      setPreviews({ ...previews, cover: URL.createObjectURL(file) })
    } else if (type === 'audio') {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'Erreur',
          description: 'Le fichier audio ne doit pas dépasser 50MB',
          variant: 'destructive'
        })
        return
      }
      setFormData({ ...formData, audio_file: file })
      setPreviews({ ...previews, audio: file.name })
    }
  }

  const handlePlayTrack = (track) => {
    // Trouver l'index de la track dans la liste filtrée
    const trackIndex = filteredTracks.findIndex(t => t.code === track.code)
    
    if (currentTrack?.code === track.code) {
      playTrack(track) // Toggle play/pause
    } else {
      // Jouer la playlist complète en commençant par la track cliquée
      playPlaylist(filteredTracks, trackIndex >= 0 ? trackIndex : 0)
    }
  }

  const handlePlayAll = () => {
    if (filteredTracks.length > 0) {
      playPlaylist(filteredTracks, 0)
    }
  }

  const handleToggleLike = async (track, e) => {
    e.stopPropagation() // Empêcher la propagation au parent
    
    try {
      const response = await musicAPI.toggleLike('track', track.code)
      
      // Mettre à jour le track dans la liste
      setTracks(prevTracks => 
        prevTracks.map(t => 
          t.code === track.code 
            ? { ...t, likes_count: response.likes_count, is_liked: response.liked }
            : t
        )
      )
      
      toast({
        description: response.liked ? '❤️ Ajouté aux favoris' : 'Retiré des favoris',
      })
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le like',
        variant: 'destructive'
      })
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie'
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  // Pagination
  const totalPages = Math.ceil(filteredTracks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTracks = filteredTracks.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  return (
    <StaffLayout>
      <div className="pb-24">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/staff/dashboard')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <MusicIcon className="h-6 w-6 text-purple-400" />
                <h1 className="text-xl font-bold text-white">Gestion des Musiques</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-8">
        {/* Filtres et Recherche */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="h-5 w-5 text-purple-400" />
                  Recherche
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Recherchez et gérez vos musiques
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {filteredTracks.length > 0 && (
                  <Button 
                    onClick={handlePlayAll}
                    variant="outline"
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Tout lire
                  </Button>
                )}
                <Button 
                  onClick={() => setAddDialog(true)}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une musique
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher par titre, album..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Liste des tracks */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                <span className="ml-3 text-gray-400">Chargement...</span>
              </div>
            ) : filteredTracks.length === 0 ? (
              <div className="text-center py-12">
                <MusicIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Aucune musique trouvée</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {paginatedTracks.map((track, index) => {
                  const isCurrentTrack = currentTrack?.code === track.code
                  const isPlayingTrack = isCurrentTrack && isPlaying
                  
                  return (
                    <div 
                      key={track.code}
                      className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                    >
                      {/* Numéro / Play button */}
                      <div className="w-12 flex items-center justify-center">
                        {isPlayingTrack ? (
                          <button
                            onClick={() => handlePlayTrack(track)}
                            className="text-purple-400 hover:scale-110 transition-transform"
                          >
                            <Pause className="h-5 w-5" fill="currentColor" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePlayTrack(track)}
                            className={`${isCurrentTrack ? 'text-purple-400' : 'text-gray-400'} hover:text-white hover:scale-110 transition-all`}
                          >
                            <Play className="h-5 w-5" fill="currentColor" />
                          </button>
                        )}
                      </div>

                      {/* Cover + Infos */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 overflow-hidden">
                          {track.cover_image ? (
                            <img 
                              src={track.cover_image} 
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
                          <h3 className={`font-medium truncate ${isCurrentTrack ? 'text-purple-400' : 'text-white'}`}>
                            {track.title}
                          </h3>
                          {track.album && (
                            <p className="text-gray-400 text-sm truncate">{track.album.title}</p>
                          )}
                        </div>
                      </div>

                      {/* Date de sortie */}
                      <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="h-4 w-4" />
                        {formatDate(track.release_date)}
                      </div>

                      {/* Vues */}
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <Eye className="h-4 w-4" />
                        <span>{track.views_count || 0}</span>
                      </div>

                      {/* Bouton Like */}
                      <button
                        onClick={(e) => handleToggleLike(track, e)}
                        className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Heart 
                          className={`h-5 w-5 ${track.is_liked ? 'fill-red-400 text-red-400' : ''}`}
                        />
                        <span className="text-sm">
                          {track.likes_count || 0}
                        </span>
                      </button>

                      {/* Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-900 border-gray-700">
                          <DropdownMenuItem 
                            onClick={() => openEditDialog(track)}
                            className="text-white hover:bg-white/10"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => setDeleteDialog({ open: true, trackCode: track.code, trackTitle: track.title })}
                            className="text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="border-gray-600 text-gray-300 hover:bg-white/5"
                    >
                      Précédent
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="border-gray-600 text-gray-300 hover:bg-white/5"
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

      {/* Modal de suppression */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <AlertDialogContent className="bg-gray-900 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Êtes-vous sûr de vouloir supprimer la musique <span className="font-semibold text-white">{deleteDialog.trackTitle}</span> ? 
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border-gray-600">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleDeleteTrack(deleteDialog.trackCode)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal d'ajout */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Ajouter une musique</DialogTitle>
            <DialogDescription className="text-gray-400">
              Uploadez une nouvelle musique
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTrack} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Titre de la musique"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cover" className="text-white">Image de couverture</Label>
                <Input
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'cover')}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                {previews.cover && (
                  <img src={previews.cover} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="audio" className="text-white">Fichier audio *</Label>
                <Input
                  id="audio"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileChange(e, 'audio')}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                />
                {previews.audio && (
                  <p className="text-sm text-gray-400 mt-2">📄 {previews.audio}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="release_date" className="text-white">Date de sortie</Label>
              <Input
                id="release_date"
                type="date"
                value={formData.release_date}
                onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setAddDialog(false)
                  resetForm()
                }}
                className="text-gray-400 hover:text-white"
              >
                Annuler
              </Button>
              <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                <Upload className="h-4 w-4 mr-2" />
                Créer la musique
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal d'édition */}
      <Dialog open={editDialog.open} onOpenChange={(open) => setEditDialog({ ...editDialog, open })}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Modifier la musique</DialogTitle>
            <DialogDescription className="text-gray-400">
              Modifiez les informations de la musique
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditTrack} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-white">Titre</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-cover" className="text-white">Nouvelle image de couverture</Label>
                <Input
                  id="edit-cover"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'cover')}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                {previews.cover && (
                  <img src={previews.cover} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-audio" className="text-white">Nouveau fichier audio</Label>
                <Input
                  id="edit-audio"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileChange(e, 'audio')}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                {previews.audio && (
                  <p className="text-sm text-gray-400 mt-2">📄 {previews.audio}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-release_date" className="text-white">Date de sortie</Label>
              <Input
                id="edit-release_date"
                type="date"
                value={formData.release_date}
                onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setEditDialog({ open: false, track: null })
                  resetForm()
                }}
                className="text-gray-400 hover:text-white"
              >
                Annuler
              </Button>
              <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                Enregistrer les modifications
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      </div>

      {/* Lecteur audio pour cette page uniquement */}
      <AudioPlayer />
    </StaffLayout>
  )
}
