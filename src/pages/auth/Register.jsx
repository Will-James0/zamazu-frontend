import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, User, Mail, Phone, Lock, UserCircle } from 'lucide-react'
import { registerUser } from '@/lib/authService'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage('')

    // Validation
    const newErrors = {}

    if (!formData.firstName) newErrors.firstName = 'Le prénom est requis'
    if (!formData.lastName) newErrors.lastName = 'Le nom est requis'
    if (!formData.username) newErrors.username = "Le nom d'utilisateur est requis"
    if (!formData.email) newErrors.email = "L'email est requis"
    // if (!formData.phone) newErrors.phone = 'Le téléphone est requis'
    if (!formData.password) newErrors.password = 'Le mot de passe est requis'
    if (formData.password.length < 8) newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await registerUser({
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      })
      
      setSuccessMessage('Inscription réussie ! Redirection vers la connexion...')
      
      // Redirection après 2 secondes
      setTimeout(() => {
        navigate('/auth/member-login')
      }, 2000)
    } catch (err) {
      setErrors({ general: err.message || 'Erreur lors de l\'inscription' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Effacer l'erreur du champ modifié
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black p-4 py-12">
      <div className="w-full max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/auth/member-login')}
          className="mb-4 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la connexion
        </Button>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Créer un compte</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Rejoignez-nous et profitez de contenus exclusifs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Message de succès */}
              {successMessage && (
                <Alert className="bg-green-500/10 border-green-500/50">
                  <AlertDescription className="text-green-500">{successMessage}</AlertDescription>
                </Alert>
              )}

              {/* Message d'erreur global */}
              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">Prénom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">Nom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Nom d'utilisateur */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">Nom d'utilisateur</Label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="jeandupont"
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                  />
                </div>
                {errors.username && (
                  <p className="text-xs text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Email et Téléphone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jean@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+33 6 12 34 56 78"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Mot de passe */}
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
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirmation mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                {loading ? 'Inscription en cours...' : 'Créer mon compte'}
              </Button>

              <div className="text-sm text-center text-gray-400">
                Vous avez déjà un compte ?{' '}
                <Link to="/auth/member-login" className="text-blue-500 hover:text-blue-400 transition-colors">
                  Se connecter
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
