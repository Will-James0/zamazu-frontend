import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutDashboard, Users, Music, Video, Heart, Eye, MessageCircle, UserPlus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { userAPI } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import StaffLayout from '@/components/StaffLayout'

export default function Dashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const data = await userAPI.getDashboard()
      setDashboardData(data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les données du dashboard',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const statsCards = [
    {
      title: 'Total Utilisateurs',
      value: dashboardData?.counts?.users || '0',
      icon: Users,
      description: 'Membres inscrits',
      color: 'text-blue-600'
    },
    {
      title: 'Musiques',
      value: dashboardData?.counts?.tracks || '0',
      icon: Music,
      description: 'Morceaux publiés',
      color: 'text-purple-600'
    },
    {
      title: 'Clips',
      value: dashboardData?.counts?.clips || '0',
      icon: Video,
      description: 'Vidéos publiées',
      color: 'text-pink-600'
    },
    {
      title: 'Total Likes',
      value: dashboardData?.counts?.likes || '0',
      icon: Heart,
      description: 'Likes sur tous contenus',
      color: 'text-red-600'
    },
    {
      title: 'Total Vues',
      value: dashboardData?.counts?.views || '0',
      icon: Eye,
      description: 'Vues sur tous contenus',
      color: 'text-green-600'
    },
    {
      title: 'Commentaires',
      value: dashboardData?.counts?.comments || '0',
      icon: MessageCircle,
      description: 'Interactions utilisateurs',
      color: 'text-yellow-600'
    }
  ]

  return (
    <StaffLayout>
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

        {/* Activités Récentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                {isLoading ? (
                  <div className="flex items-center justify-center p-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                  </div>
                ) : dashboardData?.latest?.users && dashboardData.latest.users.length > 0 ? (
                  dashboardData.latest.users.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.username}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">
                          {new Date(user.date_joined).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
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
                )}
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
                {isLoading ? (
                  <div className="flex items-center justify-center p-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                  </div>
                ) : dashboardData?.latest?.tracks && dashboardData.latest.tracks.length > 0 ? (
                  dashboardData.latest.tracks.map((track, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <Music className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{track.title}</p>
                          <p className="text-xs text-gray-400">{track.artist}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">
                          {new Date(track.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
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
                )}
              </div>
            </CardContent>
          </Card>
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
                onClick={() => navigate('/staff/users')}
              >
                <Users className="h-6 w-6 text-purple-400" />
                <span className="text-white">Gérer Utilisateurs</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center gap-2 border-blue-500/30 hover:bg-blue-500/10"
                onClick={() => navigate('/staff/tracks')}
              >
                <Music className="h-6 w-6 text-blue-400" />
                <span className="text-white">Gérer Musiques</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center gap-2 border-pink-500/30 hover:bg-pink-500/10"
                onClick={() => navigate('/staff/clips')}
              >
                <Video className="h-6 w-6 text-pink-400" />
                <span className="text-white">Gérer Clips</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </StaffLayout>
  )
}
