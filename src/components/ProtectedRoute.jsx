import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authGuard } from '@/_guard/authGuard';
import { useAuth } from '@/_store/auth';

/**
 * Composant ProtectedRoute - Enveloppe les routes nécessitant une authentification
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Composants enfants à protéger
 * @param {string[]} props.allowedRoles - Rôles autorisés (optionnel)
 * @param {string} props.redirectTo - Chemin de redirection si non autorisé (auto-déterminé si non fourni)
 * @returns {React.ReactNode}
 * 
 * @example
 * // Route protégée basique
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 * 
 * @example
 * // Route protégée avec rôles spécifiques
 * <ProtectedRoute allowedRoles={['administrator', 'owner', 'moderator']}>
 *   <AdminPanel />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = null 
}) => {
  const location = useLocation();
  const user = useAuth(state => state.user);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [storeHydrated, setStoreHydrated] = useState(false);

  // Déterminer le chemin de redirection approprié basé sur le rôle ou la route demandée
  const getRedirectPath = () => {
    if (redirectTo) return redirectTo;
    
    // Si allowedRoles contient des rôles staff, rediriger vers staff-login
    const staffRoles = ['moderator', 'administrator', 'owner'];
    const requiresStaff = allowedRoles.some(role => staffRoles.includes(role));
    
    // Si la route actuelle est une route staff (commence par /staff), utiliser staff-login
    const isStaffRoute = location.pathname.startsWith('/staff');
    
    if (requiresStaff || isStaffRoute) {
      return '/auth/staff-login';
    }
    
    // Par défaut, rediriger vers member-login
    return '/auth/member-login';
  };

  // Attendre que le store soit hydraté avant toute vérification
  useEffect(() => {
    // Vérifier si le store persist a terminé l'hydratation
    const unsubscribe = useAuth.persist.onFinishHydration(() => {
      setStoreHydrated(true);
    });

    // Si déjà hydraté
    if (useAuth.persist.hasHydrated()) {
      setStoreHydrated(true);
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Ne vérifier l'autorisation qu'après l'hydratation du store
    if (!storeHydrated) return;

    const checkAuthorization = async () => {
      try {
        const authorized = await authGuard({
          requireAuth: true,
          allowedRoles
        });
        
        setIsAuthorized(authorized);
      } catch (error) {
        console.error('Erreur lors de la vérification d\'autorisation:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthorization();
  }, [storeHydrated, allowedRoles, location.pathname]);

  // État de chargement
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <span className="text-gray-300">Vérification de l'authentification...</span>
        </div>
      </div>
    );
  }

  // Non autorisé - redirection
  if (!isAuthorized) {
    const redirectPath = getRedirectPath();
    console.log(`🔒 Accès non autorisé. Redirection vers ${redirectPath}`);
    
    return (
      <Navigate 
        to={redirectPath} 
        state={{ from: location.pathname }}
        replace 
      />
    );
  }

  // Autorisé - afficher le contenu
  return children;
};

export default ProtectedRoute;
