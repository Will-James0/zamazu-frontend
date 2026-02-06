import { createElement } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'

// Protection des routes
import ProtectedRoute from '../components/ProtectedRoute'

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

// User pages
import Welcome from '../pages/user/Welcome'
import MemberHome from '../pages/user/Home'
import MemberTracks from '../pages/user/Tracks'
import MemberClips from '../pages/user/Clips'
import MemberProfile from '../pages/user/Profile'

// Staff pages
import Dashboard from '../pages/staff/Dashboard'
import Users from '../pages/staff/Users'
import Profile from '../pages/staff/Profile'
import Tracks from '../pages/staff/Tracks'
import Clips from '../pages/staff/Clips'

// Configuration des routes similaire à Vue Router
const routes = [
  // Routes publiques - authentification
  {
    path: '/auth',
    component: AuthHome,
    meta: {
      title: 'Authentification',
      public: true
    },
  },
  {
    path: '/auth/member-login',
    component: MemberLogin,
    meta: {
      title: 'Connexion Membre',
      public: true
    }
  },
  {
    path: '/auth/staff-login',
    component: StaffLogin,
    meta: {
      title: 'Connexion Staff',
      public: true
    }
  },
  {
    path: '/auth/register',
    component: Register,
    meta: {
      title: 'Inscription',
      public: true
    }
  },

  // Routes protégées MEMBRES + STAFF
  {
    path: '/user/welcome',
    component: Welcome,
    meta: {
      title: 'Bienvenue',
      requireAuth: true,
      allowedRoles: ['member', 'moderator', 'administrator', 'owner'] // Membres + Staff peuvent accéder
    }
  },
  {
    path: '/member/home',
    component: MemberHome,
    meta: {
      title: 'Accueil Membre',
      requireAuth: true,
      allowedRoles: ['member', 'moderator', 'administrator', 'owner']
    }
  },
  {
    path: '/member/tracks',
    component: MemberTracks,
    meta: {
      title: 'Musiques',
      requireAuth: true,
      allowedRoles: ['member', 'moderator', 'administrator', 'owner']
    }
  },
  {
    path: '/member/clips',
    component: MemberClips,
    meta: {
      title: 'Clips Vidéo',
      requireAuth: true,
      allowedRoles: ['member', 'moderator', 'administrator', 'owner']
    }
  },
  {
    path: '/member/profile',
    component: MemberProfile,
    meta: {
      title: 'Mon Profil',
      requireAuth: true,
      allowedRoles: ['member', 'moderator', 'administrator', 'owner']
    }
  },

  // Routes protégées STAFF UNIQUEMENT (admin, owner, staff)
  {
    path: '/staff/dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard Staff',
      requireAuth: true,
      allowedRoles: ['moderator', 'administrator', 'owner'] // Staff uniquement, membres bloqués
    }
  },
  {
    path: '/staff/users',
    component: Users,
    meta: {
      title: 'Gestion des Utilisateurs',
      requireAuth: true,
      allowedRoles: ['moderator', 'administrator', 'owner']
    }
  },
  {
    path: '/staff/tracks',
    component: Tracks,
    meta: {
      title: 'Gestion des Musiques',
      requireAuth: true,
      allowedRoles: ['moderator', 'administrator', 'owner']
    }
  },
  {
    path: '/staff/clips',
    component: Clips,
    meta: {
      title: 'Gestion des Clips',
      requireAuth: true,
      allowedRoles: ['moderator', 'administrator', 'owner']
    }
  },
  {
    path: '/staff/profile',
    component: Profile,
    meta: {
      title: 'Mon Profil',
      requireAuth: true,
      allowedRoles: ['moderator', 'administrator', 'owner']
    }
  },

  // Routes publiques - site principal
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        component: Home,
        meta: {
          title: 'Accueil',
          public: true
        }
      },
      {
        path: 'about',
        component: About,
        meta: {
          title: 'À propos',
          public: true
        }
      },
      {
        path: 'discography',
        children: [
          {
            path: 'all',
            component: AllProjectsPage,
            meta: {
              public: true
            }
          },
          {
            path: 'exclusives',
            component: Exclusives,
            meta: {
              public: true
            }
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
      title: 'Page non trouvée',
      public: true
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
      let element = createElement(route.component);
      
      // Si la route nécessite une authentification, l'envelopper dans ProtectedRoute
      if (route.meta?.requireAuth) {
        // Déterminer la page de login selon les rôles autorisés
        let loginRedirect = '/auth/member-login';
        if (route.meta.allowedRoles) {
          // Si seulement staff/admin/owner (pas de member), rediriger vers staff login
          const hasOnlyStaffRoles = route.meta.allowedRoles.every(role => 
            ['admin', 'owner', 'staff'].includes(role)
          );
          if (hasOnlyStaffRoles) {
            loginRedirect = '/auth/staff-login';
          }
        }
        
        element = createElement(
          ProtectedRoute,
          { 
            allowedRoles: route.meta.allowedRoles || [],
            redirectTo: loginRedirect
          },
          element
        );
      }
      
      routeConfig.element = element;
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
