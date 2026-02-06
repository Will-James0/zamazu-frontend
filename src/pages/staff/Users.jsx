import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Users as UsersIcon, 
  Mail, 
  Shield,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Eye,
  UserPlus
} from 'lucide-react'
import { userAPI } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/_store/auth'
import StaffLayout from '@/components/StaffLayout'
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
import { Textarea } from '@/components/ui/textarea'

const roleLabels = {
  owner: 'Propriétaire',
  administrator: 'Administrateur',
  moderator: 'Modérateur',
  member: 'Membre'
}

const roleColors = {
  owner: 'bg-red-500/10 text-red-500 border-red-500/20',
  administrator: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  moderator: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  member: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
}

export default function Users() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const currentUser = useAuth(state => state.user)
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  
  // États pour les modals
  const [deleteDialog, setDeleteDialog] = useState({ open: false, userCode: null, userName: '' })
  const [addDialog, setAddDialog] = useState(false)
  const [editDialog, setEditDialog] = useState({ open: false, user: null })
  const [detailsDialog, setDetailsDialog] = useState({ open: false, user: null })
  
  // États pour les formulaires
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'member',
    phone: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [searchQuery, roleFilter, users])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const data = await userAPI.getAllUsers()
      console.log('📊 Données utilisateurs reçues:', data)
      console.log('📊 Type de données:', typeof data, Array.isArray(data))
      
      // Gérer différents formats de réponse
      const usersList = Array.isArray(data) ? data : (data?.results || data?.data || [])
      console.log('📊 Liste d\'utilisateurs finale:', usersList)
      
      setUsers(usersList)
      setFilteredUsers(usersList)
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des utilisateurs:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les utilisateurs',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = [...users]

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(user => {
        const searchLower = searchQuery.toLowerCase()
        return (
          user.username?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower) ||
          user.first_name?.toLowerCase().includes(searchLower) ||
          user.last_name?.toLowerCase().includes(searchLower)
        )
      })
    }

    // Filtre par rôle
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => {
        const userRole = user.role?.code || user.role
        return userRole === roleFilter
      })
    }

    setFilteredUsers(filtered)
  }

  const handleDeleteUser = async (userCode) => {
    try {
      await userAPI.deleteUser(userCode)
      toast({
        title: 'Succès',
        description: 'Utilisateur supprimé avec succès'
      })
      setDeleteDialog({ open: false, userCode: null, userName: '' })
      fetchUsers()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer l\'utilisateur',
        variant: 'destructive'
      })
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      await userAPI.createUser(formData)
      toast({
        title: 'Succès',
        description: 'Utilisateur créé avec succès'
      })
      setAddDialog(false)
      setFormData({ username: '', email: '', password: '', first_name: '', last_name: '', role: 'member', phone: '' })
      fetchUsers()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Impossible de créer l\'utilisateur',
        variant: 'destructive'
      })
    }
  }

  const handleEditUser = async (e) => {
    e.preventDefault()
    try {
      await userAPI.updateUser(editDialog.user.code, formData)
      toast({
        title: 'Succès',
        description: 'Utilisateur modifié avec succès'
      })
      setEditDialog({ open: false, user: null })
      setFormData({ username: '', email: '', password: '', first_name: '', last_name: '', role: 'member', phone: '' })
      fetchUsers()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier l\'utilisateur',
        variant: 'destructive'
      })
    }
  }

  const openEditDialog = (user) => {
    setFormData({
      username: user.username || '',
      email: user.email || '',
      password: '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      role: getUserRole(user),
      phone: user.phone || ''
    })
    setEditDialog({ open: true, user })
  }

  const canDeleteUser = (user) => {
    if (!currentUser || !user) return false
    
    const currentUserRole = getUserRole(currentUser)
    const targetUserRole = getUserRole(user)
    
    // Ne pas afficher la suppression sur son propre compte
    // Utiliser code comme identifiant unique (token)
    const isSameUser = currentUser.code === user.code
    
    if (isSameUser) return false
    
    // Seuls owner et admin peuvent supprimer
    if (currentUserRole !== 'owner' && currentUserRole !== 'administrator') return false
    
    // L'admin ne peut pas supprimer le owner
    if (currentUserRole === 'administrator' && targetUserRole === 'owner') return false
    
    return true
  }

  const canEditUser = (user) => {
    if (!currentUser || !user) return false
    
    const currentUserRole = getUserRole(currentUser)
    const targetUserRole = getUserRole(user)
    
    // Seuls owner (r4) et admin (r3) peuvent modifier
    if (currentUserRole !== 'owner' && currentUserRole !== 'administrator') return false
    
    // L'admin ne peut pas modifier le owner
    if (currentUserRole === 'administrator' && targetUserRole === 'owner') return false
    
    return true
  }

  const canToggleUserStatus = (user) => {
    if (!currentUser || !user) return false
    
    const currentUserRole = getUserRole(currentUser)
    const targetUserRole = getUserRole(user)
    
    // Ne pas pouvoir désactiver son propre compte
    const isSameUser = currentUser.code === user.code
    if (isSameUser) return false
    
    // Hiérarchie des rôles
    const roleHierarchy = {
      owner: 4,
      administrator: 3,
      moderator: 2,
      member: 1
    }
    
    const currentLevel = roleHierarchy[currentUserRole] || 0
    const targetLevel = roleHierarchy[targetUserRole] || 0
    
    // Le owner peut tout faire
    if (currentUserRole === 'owner') return true
    
    // Les admins ne peuvent pas désactiver d'autres admins ou owners
    if (targetLevel >= currentLevel) return false
    
    return true
  }

  const handleToggleStatus = async (user) => {
    if (!canToggleUserStatus(user)) return
    
    try {
      await userAPI.toggleUserStatus(user.code)
      toast({
        title: 'Succès',
        description: `Utilisateur ${user.is_active ? 'désactivé' : 'activé'} avec succès`
      })
      fetchUsers()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.detail || 'Impossible de modifier le statut',
        variant: 'destructive'
      })
    }
  }

  const getUserRole = (user) => {
    if (!user) return 'member'
    return user.role?.code || user.role || 'member'
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  // Reset à la page 1 quand les filtres changent
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, roleFilter])

  return (
    <StaffLayout>
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
                <UsersIcon className="h-6 w-6 text-purple-400" />
                <h1 className="text-xl font-bold text-white">Gestion des Utilisateurs</h1>
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
                  Filtres et Recherche
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Recherchez et filtrez les utilisateurs
                </CardDescription>
              </div>
              {(getUserRole(currentUser) === 'owner' || getUserRole(currentUser) === 'administrator') && (
                <Button 
                  onClick={() => setAddDialog(true)}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Ajouter un utilisateur
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Rechercher par nom, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>

              {/* Filtre par rôle */}
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                  <SelectValue placeholder="Filtrer par rôle" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all" className="text-white">Tous les rôles</SelectItem>
                  <SelectItem value="owner" className="text-white">Propriétaire</SelectItem>
                  <SelectItem value="administrator" className="text-white">Administrateur</SelectItem>
                  <SelectItem value="moderator" className="text-white">Modérateur</SelectItem>
                  <SelectItem value="member" className="text-white">Membre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}
              </p>
              {(searchQuery || roleFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('')
                    setRoleFilter('all')
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  Réinitialiser
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Liste des utilisateurs */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">
              Utilisateurs ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center p-12">
                <UsersIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Aucun utilisateur trouvé</p>
              </div>
            ) : (
              <div className="space-y-3">
                {paginatedUsers.map((user) => {
                  const role = getUserRole(user)
                  return (
                    <div
                      key={user.code}
                      onClick={() => setDetailsDialog({ open: true, user })}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {user.image ? (
                            <img 
                              src={user.image} 
                              alt={user.username}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-lg">
                              {user.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                            </span>
                          )}
                        </div>

                        {/* Infos utilisateur */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-medium truncate">
                              {user.username || 'Sans nom'}
                            </h3>
                            <Badge className={`${roleColors[role]} text-xs`}>
                              {roleLabels[role] || role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span className="truncate">{user.email}</span>
                            </div>
                            {(user.first_name || user.last_name) && (
                              <span className="truncate">
                                {user.first_name} {user.last_name}
                              </span>
                            )}
                          </div>
                          {user.date_joined && (
                            <p className="text-xs text-gray-500 mt-1">
                              Inscrit le {new Date(user.date_joined).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Toggle Actif/Inactif + Actions */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={user.is_active}
                            onCheckedChange={(checked) => handleToggleStatus(user)}
                            disabled={!canToggleUserStatus(user)}
                            className={`data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600 ${!canToggleUserStatus(user) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className={`text-xs font-medium ${user.is_active ? 'text-green-400' : 'text-gray-500'}`}>
                            {user.is_active ? 'Actif' : 'Inactif'}
                          </span>
                        </div>

                        {/* Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation()
                              setDetailsDialog({ open: true, user })
                            }}
                            className="text-white hover:bg-white/10"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                          </DropdownMenuItem>
                          {canEditUser(user) && (
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation()
                                openEditDialog(user)
                              }}
                              className="text-white hover:bg-white/10"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                          )}
                          {canDeleteUser(user) && (
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation()
                                setDeleteDialog({ 
                                  open: true, 
                                  userCode: user.code, 
                                  userName: user.username || user.email 
                                })
                              }}
                              className="text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>

          {/* Pagination */}
          {!isLoading && filteredUsers.length > 0 && (
            <div className="px-6 py-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Affichage de {startIndex + 1} à {Math.min(endIndex, filteredUsers.length)} sur {filteredUsers.length} utilisateurs
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-600 text-gray-300 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Précédent
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page 
                          ? "bg-purple-600 text-white hover:bg-purple-700" 
                          : "border-gray-600 text-gray-300 hover:bg-white/5"
                        }
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-600 text-gray-300 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </main>

      {/* Modal de confirmation de suppression */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <AlertDialogContent className="bg-gray-900 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Êtes-vous sûr de vouloir supprimer l'utilisateur <span className="font-semibold text-white">{deleteDialog.userName}</span> ? 
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border-gray-600">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleDeleteUser(deleteDialog.userCode)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal d'ajout d'utilisateur */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Ajouter un utilisateur</DialogTitle>
            <DialogDescription className="text-gray-400">
              Créez un nouveau compte utilisateur
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Nom d'utilisateur *</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="john_doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-white">Prénom</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-white">Nom</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">Rôle *</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="member" className="text-white">Membre</SelectItem>
                    <SelectItem value="moderator" className="text-white">Modérateur</SelectItem>
                    {getUserRole(currentUser) === 'owner' && (
                      <SelectItem value="administrator" className="text-white">Administrateur</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setAddDialog(false)
                  setFormData({ username: '', email: '', password: '', first_name: '', last_name: '', role: 'member', phone: '' })
                }}
                className="text-gray-400 hover:text-white"
              >
                Annuler
              </Button>
              <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                Créer l'utilisateur
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de modification d'utilisateur */}
      <Dialog open={editDialog.open} onOpenChange={(open) => setEditDialog({ ...editDialog, open })}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Modifier l'utilisateur</DialogTitle>
            <DialogDescription className="text-gray-400">
              Modifiez les informations de l'utilisateur
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditUser} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-username" className="text-white">Nom d'utilisateur</Label>
                <Input
                  id="edit-username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email" className="text-white">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-first_name" className="text-white">Prénom</Label>
                <Input
                  id="edit-first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-last_name" className="text-white">Nom</Label>
                <Input
                  id="edit-last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-password" className="text-white">Nouveau mot de passe</Label>
                <Input
                  id="edit-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Laisser vide pour ne pas changer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role" className="text-white">
                  Rôle
                  {editDialog.user && currentUser && editDialog.user.code === currentUser.code && (
                    <span className="text-xs text-gray-500 ml-2">(non modifiable sur votre propre compte)</span>
                  )}
                  {editDialog.user && getUserRole(editDialog.user) === 'owner' && (
                    <span className="text-xs text-yellow-500 ml-2">(le rôle owner ne peut pas être modifié)</span>
                  )}
                </Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                  disabled={editDialog.user && currentUser && (editDialog.user.code === currentUser.code || getUserRole(editDialog.user) === 'owner')}
                >
                  <SelectTrigger className={`bg-gray-800 border-gray-600 text-white ${editDialog.user && currentUser && (editDialog.user.code === currentUser.code || getUserRole(editDialog.user) === 'owner') ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {getUserRole(editDialog.user) === 'owner' && (
                      <SelectItem value="owner" className="text-white">Propriétaire</SelectItem>
                    )}
                    <SelectItem value="member" className="text-white">Membre</SelectItem>
                    <SelectItem value="moderator" className="text-white">Modérateur</SelectItem>
                    {getUserRole(currentUser) === 'owner' && (
                      <SelectItem value="administrator" className="text-white">Administrateur</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone" className="text-white">Téléphone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setEditDialog({ open: false, user: null })
                  setFormData({ username: '', email: '', password: '', first_name: '', last_name: '', role: 'member', phone: '' })
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

      {/* Modal des détails d'utilisateur */}
      <Dialog open={detailsDialog.open} onOpenChange={(open) => setDetailsDialog({ ...detailsDialog, open })}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Détails de l'utilisateur</DialogTitle>
          </DialogHeader>
          {detailsDialog.user && (
            <div className="space-y-6">
              {/* Avatar et infos principales */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {detailsDialog.user.image ? (
                    <img 
                      src={detailsDialog.user.image} 
                      alt={detailsDialog.user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-3xl">
                      {detailsDialog.user.username?.[0]?.toUpperCase() || detailsDialog.user.email?.[0]?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {detailsDialog.user.username || 'Sans nom'}
                  </h3>
                  <Badge className={`${roleColors[getUserRole(detailsDialog.user)]}`}>
                    {roleLabels[getUserRole(detailsDialog.user)] || getUserRole(detailsDialog.user)}
                  </Badge>
                </div>
              </div>

              {/* Informations */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{detailsDialog.user.email || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Téléphone</p>
                  <p className="text-white">{detailsDialog.user.phone || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Prénom</p>
                  <p className="text-white">{detailsDialog.user.first_name || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Nom</p>
                  <p className="text-white">{detailsDialog.user.last_name || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDetailsDialog({ open: false, user: null })}
              className="text-gray-400 hover:text-white"
            >
              Fermer
            </Button>
            {detailsDialog.user && canEditUser(detailsDialog.user) && (
              <Button
                onClick={() => {
                  openEditDialog(detailsDialog.user)
                  setDetailsDialog({ open: false, user: null })
                }}
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StaffLayout>
  )
}
