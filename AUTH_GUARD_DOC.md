# AuthGuard - Documentation

## Vue d'ensemble

Le système `authGuard` est un mécanisme de protection des routes robuste qui gère automatiquement l'authentification JWT avec rafraîchissement automatique des tokens.

## Fonctionnalités

✅ **Vérification de validité du token JWT** - Décode et vérifie l'expiration  
✅ **Rafraîchissement automatique** - Tente de rafraîchir le token s'il est expiré  
✅ **Mise à jour automatique** - Met à jour les tokens dans le store et localStorage  
✅ **Gestion des rôles** - Supporte la vérification des rôles utilisateur  
✅ **Redirection intelligente** - Redirige vers le login en cas d'échec  

## Architecture

```
authGuard.js
├── checkTokenExpiration()     # Décode et vérifie l'expiration du JWT
├── attemptTokenRefresh()      # Tente de rafraîchir le token
├── updateTokensInStore()      # Met à jour le store et localStorage
├── clearAuthAndRedirect()     # Nettoie l'auth et redirige
└── authGuard()                # Fonction principale
```

## Utilisation

### 1. Utilisation basique dans React Router

```jsx
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import AdminPanel from '@/pages/AdminPanel';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'owner']}>
        <AdminPanel />
      </ProtectedRoute>
    )
  }
]);
```

### 2. Utilisation dans un composant

```jsx
import { useEffect, useState } from 'react';
import { authGuard, checkAuth } from '@/_guard/authGuard';
import { useNavigate } from 'react-router-dom';

function MyProtectedComponent() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const authorized = await authGuard({
        requireAuth: true,
        allowedRoles: ['member', 'admin']
      });
      
      if (!authorized) {
        navigate('/auth/login');
      } else {
        setIsAuthorized(true);
      }
    };

    verifyAuth();
  }, [navigate]);

  if (!isAuthorized) {
    return <div>Chargement...</div>;
  }

  return <div>Contenu protégé</div>;
}
```

### 3. Utilisation des variantes simplifiées

```jsx
import { 
  requireAuth, 
  requireAdmin, 
  requireStaff, 
  requireMember 
} from '@/_guard/authGuard';

// Route membre uniquement
const checkMemberAccess = async () => {
  const authorized = await requireMember();
  // ...
};

// Route admin uniquement
const checkAdminAccess = async () => {
  const authorized = await requireAdmin();
  // ...
};

// Route staff (admin + staff)
const checkStaffAccess = async () => {
  const authorized = await requireStaff();
  // ...
};
```

### 4. Vérification sans redirection

```jsx
import { checkAuth } from '@/_guard/authGuard';

function NavBar() {
  const isLoggedIn = checkAuth();

  return (
    <nav>
      {isLoggedIn ? (
        <button>Mon Profil</button>
      ) : (
        <button>Se connecter</button>
      )}
    </nav>
  );
}
```

## Options de configuration

```javascript
authGuard({
  requireAuth: true,           // Si false, permet l'accès sans auth
  allowedRoles: ['admin'],     // Rôles autorisés (vide = tous les rôles)
  redirectTo: '/auth/login'    // Chemin de redirection personnalisé
})
```

## Flux de fonctionnement

```
1. Vérifier la présence du token
   ↓
2. Décoder et vérifier l'expiration
   ↓
3. Token valide ?
   ├─ OUI → Vérifier les rôles → Autoriser
   └─ NON → Tenter le refresh
              ↓
       Refresh réussi ?
       ├─ OUI → Mettre à jour les tokens → Autoriser
       └─ NON → Déconnecter → Rediriger vers login
```

## Gestion des tokens

### Structure du token dans localStorage

```javascript
{
  "user": { ... },
  "token": {
    "access": "eyJhbGc...",
    "refresh": "eyJhbGc...",
    "access_expires_in": 3600,
    "refresh_expires_in": 604800
  },
  "savedAt": 1706728800000
}
```

### Vérification de l'expiration

Le token est considéré comme expiré s'il reste moins de 60 secondes avant l'expiration réelle. Cela permet d'éviter les erreurs dues à un token qui expire pendant une requête.

```javascript
const tokenCheck = checkTokenExpiration(accessToken);
console.log(tokenCheck);
// {
//   isValid: true,
//   isExpired: false,
//   expiresIn: 3540, // secondes restantes
//   decoded: { ... }
// }
```

## Messages de log

Le authGuard affiche des messages console pour faciliter le débogage :

- ✅ **Token valide** : `Token valide (expire dans X minutes)`
- ⏰ **Token expiré** : `Token expiré, tentative de rafraîchissement...`
- 🔄 **Refresh en cours** : `Tentative de rafraîchissement du token...`
- ✅ **Refresh réussi** : `Token rafraîchi avec succès`
- ❌ **Refresh échoué** : `Échec du rafraîchissement du token`
- ⚠️ **Rôle refusé** : `Rôle non autorisé: member`

## Gestion des erreurs

```javascript
try {
  const authorized = await authGuard({ requireAuth: true });
  
  if (authorized) {
    // Procéder avec l'action protégée
  }
} catch (error) {
  console.error('Erreur d\'authentification:', error);
  // Gérer l'erreur (déjà redirigé vers login)
}
```

## Intégration avec le store Zustand

Le authGuard s'intègre directement avec le store Zustand :

```javascript
import { useAuth } from '@/_store/auth';

// Le authGuard utilise automatiquement le store
const { accessToken, refreshToken, user } = useAuth.getState();

// Mise à jour automatique après refresh
useAuth.getState().setUser(currentUser, {
  accessToken: newAccessToken,
  refreshToken: newRefreshToken
});
```

## Best Practices

### ✅ À faire

- Utiliser `ProtectedRoute` pour envelopper les routes protégées
- Toujours vérifier l'authentification côté serveur également
- Utiliser les variantes simplifiées (`requireAdmin`, `requireStaff`) pour plus de clarté
- Gérer les états de chargement pendant la vérification

### ❌ À éviter

- Ne pas stocker de données sensibles dans le localStorage
- Ne pas faire confiance uniquement à la vérification côté client
- Ne pas ignorer les erreurs de refresh
- Ne pas oublier de gérer les états de chargement

## Exemple complet

```jsx
// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authGuard } from '@/_guard/authGuard';
import { useAuth } from '@/_store/auth';

function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuth((state) => state.user);

  useEffect(() => {
    const checkAccess = async () => {
      const authorized = await authGuard({
        requireAuth: true,
        allowedRoles: ['member', 'admin']
      });

      if (!authorized) {
        navigate('/auth/login');
      } else {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Bienvenue, {user?.first_name} {user?.last_name}
      </h1>
      <p>Votre tableau de bord personnel</p>
    </div>
  );
}

export default Dashboard;
```

## Dépannage

### Le refresh ne fonctionne pas

1. Vérifier que `API_CONFIG.ENDPOINTS.AUTH.LOGIN_REFRESH` est correctement configuré
2. Vérifier que le refresh token est bien stocké dans localStorage
3. Vérifier les logs console pour les erreurs de l'API

### Redirection en boucle

1. Vérifier que la page de login n'utilise pas `requireAuth: true`
2. Vérifier que les tokens sont bien sauvegardés après login
3. Nettoyer le localStorage et se reconnecter

### Les rôles ne fonctionnent pas

1. Vérifier la structure de `user.role` dans le store
2. Vérifier que les rôles passés correspondent exactement (sensible à la casse)
3. Vérifier que l'utilisateur a bien un rôle assigné

## Support

Pour toute question ou problème, consulter :
- Le code source : `src/_guard/authGuard.js`
- Le store auth : `src/_store/auth.js`
- L'API : `src/libs/api.js`
