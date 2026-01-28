import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Mail, Lock, ShieldCheck } from 'lucide-react'
import { loginStaff } from '@/libs/authService'

export default function StaffLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation basique
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)
    try {
      const response = await loginStaff({
        email: formData.email,
        password: formData.password
      })
      
      // Sauvegarder les données d'authentification
      localStorage.setItem('zamazu_auth', JSON.stringify(response))
      
      // Navigation vers le dashboard admin
      navigate('/staff/dashboard')
    } catch (err) {
      setError(err.message || 'Erreur lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900/20 to-black p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/auth')}
          className="mb-4 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <Card className="bg-gray-800/50 border-purple-700/50">
          <CardHeader className="space-y-1">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-purple-500" />
            </div>
            <CardTitle className="text-2xl text-center text-white">Connexion Staff</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Accédez au panneau d'administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email professionnel</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <Alert className="bg-purple-500/10 border-purple-500/50">
                <ShieldCheck className="h-4 w-4 text-purple-500" />
                <AlertDescription className="text-gray-300">
                  Accès réservé au personnel autorisé uniquement
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={loading}>
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
