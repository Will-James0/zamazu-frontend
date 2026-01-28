import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Music, Heart, Crown, LogOut } from 'lucide-react'

export default function Welcome() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('zamazu_auth')
    navigate('/auth')
  }

  const features = [
    {
      icon: Music,
      title: 'Projets Exclusifs',
      description: 'Accédez en avant-première aux nouveaux projets',
      color: 'text-purple-400'
    },
    {
      icon: Heart,
      title: 'Contenus Favoris',
      description: 'Sauvegardez et retrouvez vos morceaux préférés',
      color: 'text-red-400'
    },
    {
      icon: Crown,
      title: 'Accès Privilégié',
      description: 'Profitez de contenus réservés aux membres',
      color: 'text-yellow-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Espace Membre</h1>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Bienvenue !
            </h2>
          </div>
          <p className="text-xl text-gray-300 mb-2">
            Vous êtes maintenant membre de la communauté Zamazu
          </p>
          <p className="text-gray-400">
            Découvrez tous vos avantages exclusifs ci-dessous
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index} 
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Prêt à explorer ?
              </h3>
              <p className="text-gray-300 mb-6">
                Parcourez notre catalogue et découvrez des contenus exclusifs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Music className="h-4 w-4 mr-2" />
                  Explorer la Musique
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/exclusives')}
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Voir les Exclusivités
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
