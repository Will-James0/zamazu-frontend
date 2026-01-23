import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCircle, ShieldCheck } from 'lucide-react'

export default function AuthHome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Bienvenue</h1>
          <p className="text-gray-400">Choisissez votre type de connexion</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Option Membre/Abonné */}
          <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                <UserCircle className="w-10 h-10 text-blue-500" />
              </div>
              <CardTitle className="text-white text-2xl">Membre / Abonné</CardTitle>
              <CardDescription className="text-gray-400">
                Accédez à votre espace personnel et profitez de contenus exclusifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/auth/member-login')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                Se connecter en tant que membre
              </Button>
            </CardContent>
          </Card>

          {/* Option Staff/Admin */}
          <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-all">
                <ShieldCheck className="w-10 h-10 text-purple-500" />
              </div>
              <CardTitle className="text-white text-2xl">Staff / Admin</CardTitle>
              <CardDescription className="text-gray-400">
                Accédez au panneau d'administration et gérez la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/auth/staff-login')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                size="lg"
              >
                Se connecter en tant que staff
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
