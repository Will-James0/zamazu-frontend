import { createElement } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'

// Remplace AllProjects par AllProjectsPage
import AllProjectsPage from '../pages/AllProjects.tsx';
import Exclusives from '../pages/Exclusives'
// import Series from '../pages/Series'
// import Singles from '../pages/Singles'
// import Freestyles from '../pages/Freestyles'

// Auth pages
import AuthHome from '../pages/auth/AuthHome'
import MemberLogin from '../pages/auth/MemberLogin'
import StaffLogin from '../pages/auth/StaffLogin'
import Register from '../pages/auth/Register'

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
            component: AllProjectsPage,
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
    // 1. Préparer l'objet de base
    const routeConfig = {
      path: route.path,
    };

    // 2. Ne créer l'élément QUE si le composant existe
    if (route.component) {
      routeConfig.element = createElement(route.component);
    } else if (!route.children) {
      // Si pas de composant ET pas d'enfants, on log l'erreur pour t'aider
      console.warn(`Attention: La route "${route.path}" n'a pas de composant défini.`);
    }

    // 3. Gérer les routes enfants
    if (route.children) {
      routeConfig.children = createRoutes(route.children);
    }

    return routeConfig;
  });
};

// Créer le router avec la configuration
const router = createBrowserRouter(createRoutes(routes))

export { routes, router }
export default router
