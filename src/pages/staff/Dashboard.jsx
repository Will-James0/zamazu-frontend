import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutDashboard, Users, Music, Video, Heart, Eye, MessageCircle, LogOut, UserPlus, Plus, Home } from 'lucide-react'
import { useState } from 'react'
import logoImg from '@/assets/images/logo.jpeg'

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const handleLogout = () => {
    localStorage.removeItem('zamazu_auth')
    navigate('/auth/staff-login')
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'music', label: 'Musiques', icon: Music },
    { id: 'videos', label: 'Clips', icon: Video },
  ]

  const statsCards = [
    {
      title: 'Total Utilisateurs',
      value: '0',
      icon: Users,
      description: 'Membres inscrits',
      color: 'text-blue-600'
    },
    {
      title: 'Musiques',
      value: '0',
      icon: Music,
      description: 'Morceaux publiés',
      color: 'text-purple-600'
    },
    {
      title: 'Clips',
      value: '0',
      icon: Video,
      description: 'Vidéos publiées',
      color: 'text-pink-600'
    },
    {
      title: 'Total Likes',
      value: '0',
      icon: Heart,
      description: 'Likes sur tous contenus',
      color: 'text-red-600'
    },
    {
      title: 'Total Vues',
      value: '0',
      icon: Eye,
      description: 'Vues sur tous contenus',
      color: 'text-green-600'
    },
    {
      title: 'Commentaires',
      value: '0',
      icon: MessageCircle,
      description: 'Interactions utilisateurs',
      color: 'text-yellow-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black/30 backdrop-blur-sm border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <h2 className="text-white font-bold text-lg">Zamazu</h2>
              <p className="text-gray-400 text-xs">Dashboard Staff</p>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeMenu === item.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Bouton Déconnexion */}
        <div className="p-4 border-t border-white/10">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
          <div className="px-8 py-4">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-purple-400" />
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
            </div>
          </div>
        </header>

        <main className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Bienvenue sur votre Dashboard
          </h2>
          <p className="text-gray-400">
            Gérez votre contenu et vos utilisateurs depuis cet espace
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Actions Rapides</CardTitle>
            <CardDescription className="text-gray-400">
              Accédez rapidement aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center gap-2 border-purple-500/30 hover:bg-purple-500/10"
              >
                <Users className="h-6 w-6 text-purple-400" />
                <span className="text-white">Gérer Utilisateurs</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center gap-2 border-blue-500/30 hover:bg-blue-500/10"
              >
                <Music className="h-6 w-6 text-blue-400" />
                <span className="text-white">Ajouter Musique</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center gap-2 border-pink-500/30 hover:bg-pink-500/10"
              >
                <Video className="h-6 w-6 text-pink-400" />
                <span className="text-white">Ajouter Clip</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activités Récentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Nouveaux Abonnés */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-blue-400" />
                Nouveaux Abonnés
              </CardTitle>
              <CardDescription className="text-gray-400">
                Les 3 derniers membres inscrits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Aucun membre</p>
                      <p className="text-xs text-gray-400">En attente d'inscriptions</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dernières Musiques */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Music className="h-5 w-5 text-purple-400" />
                Dernières Musiques
              </CardTitle>
              <CardDescription className="text-gray-400">
                Les 3 derniers morceaux ajoutés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Music className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Aucune musique</p>
                      <p className="text-xs text-gray-400">Ajoutez votre premier morceau</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      </div>
    </div>
  )
}
