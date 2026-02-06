import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Lock,
  Save,
  Camera
} from 'lucide-react'
import { userAPI } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/_store/auth'
import MemberLayout from '@/components/MemberLayout'

const roleLabels = {
  owner: 'Propriétaire',
  administrator: 'Administrateur',
  moderator: 'Modérateur',
  member: 'Membre'
}

const roleColors = {
  owner: 'bg-red-500/20 text-red-400 border-red-500/30',
  administrator: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  moderator: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  member: 'bg-green-500/20 text-green-400 border-green-500/30'
}

export default function MemberProfile() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const user = useAuth(state => state.user)
  const refreshProfile = useAuth(state => state.refreshProfile)
  
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    image: ''
  })
  
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })

  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        image: user.image || ''
      })
      setImagePreview(user.image)
    }
  }, [user])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      
      if (profileData.first_name) formData.append('first_name', profileData.first_name)
      if (profileData.last_name) formData.append('last_name', profileData.last_name)
      if (profileData.phone) formData.append('phone', profileData.phone)

      if (profileData.image instanceof File) {
        formData.append('image', profileData.image)
      }

      await userAPI.updateProfile(user.code, formData)
      await refreshProfile()
      
      toast({
        title: 'Succès',
        description: 'Profil mis à jour avec succès'
      })
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de mettre à jour le profil',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
        variant: 'destructive'
      })
      return
    }

    if (passwordData.new_password.length < 8) {
      toast({
        title: 'Erreur',
        description: 'Le mot de passe doit contenir au moins 8 caractères',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)
    
    try {
      await userAPI.updateProfile(user.code, {
        old_password: passwordData.current_password,
        password: passwordData.new_password
      })
      
      toast({
        title: 'Succès',
        description: 'Mot de passe modifié avec succès'
      })
      
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      })
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.detail || 'Impossible de modifier le mot de passe',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Erreur',
          description: 'L\'image ne doit pas dépasser 5MB',
          variant: 'destructive'
        })
        return
      }

      setProfileData({ ...profileData, image: file })
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const getUserRole = () => {
    return user?.role?.code || user?.role || 'member'
  }

  if (!user) {
    return (
      <MemberLayout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-400">Chargement du profil...</p>
        </div>
      </MemberLayout>
    )
  }

  return (
    <MemberLayout>
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-purple-400" />
              <h1 className="text-xl font-bold text-white">Mon Profil</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-4xl mx-auto">
        {/* Carte de profil principale */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
          <CardHeader>
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt={user?.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-3xl">
                      {user?.username?.[0]?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <label 
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors"
                >
                  <Camera className="h-4 w-4 text-white" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Infos */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {user?.username || 'Sans nom'}
                </h2>
                <p className="text-gray-400 mb-2">{user?.email}</p>
                <Badge className={roleColors[getUserRole()]}>
                  {roleLabels[getUserRole()]}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs pour modification */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">
              Informations personnelles
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-600">
              Sécurité
            </TabsTrigger>
          </TabsList>

          {/* Onglet Informations personnelles */}
          <TabsContent value="profile">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Modifier mes informations</CardTitle>
                <CardDescription className="text-gray-400">
                  Mettez à jour vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-300">
                        Nom d'utilisateur
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="username"
                          value={profileData.username}
                          className="pl-10 bg-gray-900/50 border-gray-600 text-gray-400 cursor-not-allowed"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          className="pl-10 bg-gray-900/50 border-gray-600 text-gray-400 cursor-not-allowed"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name" className="text-gray-300">
                        Prénom
                      </Label>
                      <Input
                        id="first_name"
                        value={profileData.first_name}
                        onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                        className="bg-gray-900/50 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last_name" className="text-gray-300">
                        Nom
                      </Label>
                      <Input
                        id="last_name"
                        value={profileData.last_name}
                        onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                        className="bg-gray-900/50 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">
                      Téléphone
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Sécurité */}
          <TabsContent value="security">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Changer le mot de passe</CardTitle>
                <CardDescription className="text-gray-400">
                  Mettez à jour votre mot de passe pour sécuriser votre compte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current_password" className="text-gray-300">
                      Mot de passe actuel
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="current_password"
                        type="password"
                        value={passwordData.current_password}
                        onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new_password" className="text-gray-300">
                      Nouveau mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="new_password"
                        type="password"
                        value={passwordData.new_password}
                        onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm_password" className="text-gray-300">
                      Confirmer le mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="confirm_password"
                        type="password"
                        value={passwordData.confirm_password}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    {isLoading ? 'Modification...' : 'Modifier le mot de passe'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </MemberLayout>
  )
}
