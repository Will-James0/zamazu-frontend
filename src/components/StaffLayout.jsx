import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LayoutDashboard, Users, Music, Video, LogOut } from 'lucide-react'
import logoImg from '@/assets/images/logo.jpeg'
import { useAuth } from '@/_store/auth'

export default function StaffLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuth((state) => state.logout)
  const user = useAuth((state) => state.user)

  // Couleurs pour les rôles
  const roleColors = {
    owner: 'bg-red-500/20 text-red-400 border-red-500/30',
    administrator: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    moderator: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    member: 'bg-green-500/20 text-green-400 border-green-500/30'
  }

  const roleLabels = {
    owner: 'Propriétaire',
    administrator: 'Administrateur',
    moderator: 'Modérateur',
    member: 'Membre'
  }

  const getUserRole = () => {
    return user?.role?.code || user?.role || 'member'
  }

  const handleLogout = async () => {
    await logout()
    navigate('/auth/staff-login')
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/staff/dashboard' },
    { id: 'users', label: 'Utilisateurs', icon: Users, path: '/staff/users' },
    { id: 'music', label: 'Musiques', icon: Music, path: '/staff/tracks' },
    { id: 'videos', label: 'Clips', icon: Video, path: '/staff/clips' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-md border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Zamazu Logo" className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="font-bold text-lg">Zamazu</h1>
              <Badge className="bg-purple-500/20 text-purple-300 text-xs">Staff</Badge>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold overflow-hidden">
              {user?.image ? (
                <img 
                  src={user.image} 
                  alt={user.username} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{user?.username?.[0]?.toUpperCase() || 'S'}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user?.username || 'Staff'}</p>
              <p className="text-xs text-gray-400 truncate">{roleLabels[getUserRole()] || 'Staff'}</p>
            </div>
          </div>
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
        {children}
      </div>
    </div>
  )
}
