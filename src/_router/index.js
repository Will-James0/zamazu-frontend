import { createElement } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'

// Configuration des routes similaire à Vue Router
const routes = [
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
      }
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
