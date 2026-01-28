import { createElement } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'

import AllProjects from '../pages/AllProjects'
import Exclusives from '../pages/Exclusives'
// import Series from '../pages/Series'
// import Singles from '../pages/Singles'
// import Freestyles from '../pages/Freestyles'

// Auth pages
import AuthHome from '../pages/auth/AuthHome'
import MemberLogin from '../pages/auth/MemberLogin'
import StaffLogin from '../pages/auth/StaffLogin'
import Register from '../pages/auth/Register'

// User pages
import Welcome from '../pages/user/Welcome'

// Staff pages
import Dashboard from '../pages/staff/Dashboard'

// Configuration des routes similaire à Vue Router
const routes = [
  {
    path: '/auth',
    component: AuthHome,
    meta: {
      title: 'Authentification'
    },
  },
  {
    path: '/auth/member-login',
    component: MemberLogin,
    meta: {
      title: 'Connexion Membre'
    }
  },
  {
    path: '/auth/staff-login',
    component: StaffLogin,
    meta: {
      title: 'Connexion Staff'
    }
  },
  {
    path: '/auth/register',
    component: Register,
    meta: {
      title: 'Inscription'
    }
  },
  {
    path: '/user/welcome',
    component: Welcome,
    meta: {
      title: 'Bienvenue'
    }
  },
  {
    path: '/staff/dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard Staff'
    }
  },
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        component: Home,
        meta: {
          title: 'Accueil'
        }
      },
      {
        path: 'about',
        component: About,
        meta: {
          title: 'À propos'
        }
      },
      {
        path: 'discography',
        children: [
          {
            path: 'all',
            component: AllProjects,
          },
          {
            path: 'exclusives',
            component: Exclusives,
          },
          // {
          //   path: 'series',
          //   component: Series,
          // },
          // {
          //   path: 'singles',
          //   component: Singles,
          // },
          // {
          //   path: 'freestyles',
          //   component: Freestyles,
          // }
        ]
      },
    ]
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      title: 'Page non trouvée'
    }
  }
]

// Fonction pour convertir la config en format React Router
const createRoutes = (routes) => {
  return routes.map(route => {
    const routeConfig = {
      path: route.path,
      element: createElement(route.component),
    }
    
    // Gérer les routes enfants
    if (route.children) {
      routeConfig.children = createRoutes(route.children)
    }
    
    return routeConfig
  })
}

// Créer le router avec la configuration
const router = createBrowserRouter(createRoutes(routes))

export { routes, router }
export default router
