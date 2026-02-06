import { useAuth } from "@/_store/auth";
import { authAPI } from "@/lib/api";

/**
 * AuthGuard - Protection des routes avec gestion automatique du refresh token
 * 
 * Fonctionnalités:
 * - Vérifie la présence du token d'authentification
 * - Vérifie la validité et l'expiration du token via les timestamps stockés
 * - Tente automatiquement de rafraîchir le token s'il est expiré
 * - Met à jour les tokens dans le store si le refresh réussit
 * - Redirige vers le login en cas d'échec
 */

/**
 * Vérifie l'expiration d'un token via son timestamp
 * @param {number} expiresAt - Timestamp d'expiration (en secondes)
 * @returns {Object} - { isValid: boolean, isExpired: boolean, expiresIn: number }
 */
const checkTokenExpiration = (expiresAt) => {
  try {
    if (!expiresAt) {
      return { isValid: false, isExpired: true, expiresIn: 0 };
    }

    const currentTime = Math.floor(Date.now() / 1000); // en secondes
    const expiresIn = expiresAt - currentTime; // temps restant en secondes

    // On considère le token expiré s'il reste moins de 60 secondes
    const isExpired = expiresIn < 60;
    const isValid = expiresIn > 0;

    return {
      isValid,
      isExpired,
      expiresIn
    };
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de l\'expiration:', error);
    return { isValid: false, isExpired: true, expiresIn: 0 };
  }
};

/**
 * Tente de rafraîchir le token d'accès
 * @param {string} refreshToken - Le refresh token
 * @param {number} refreshExpiresAt - Timestamp d'expiration du refresh token
 * @returns {Promise<Object|null>} - Les nouveaux tokens ou null si échec
 */
const attemptTokenRefresh = async (refreshToken, refreshExpiresAt) => {
  try {
    console.log('🔄 Tentative de rafraîchissement du token...');
    
    // Vérifier d'abord que le refresh token n'est pas expiré
    const refreshCheck = checkTokenExpiration(refreshExpiresAt);
    if (!refreshCheck.isValid) {
      console.warn('⚠️ Le refresh token est invalide ou expiré');
      return null;
    }

    // Appeler l'API pour rafraîchir le token
    const response = await authAPI.refreshToken();
    
    if (response && response.access) {
      console.log('✅ Token rafraîchi avec succès');
      return {
        accessToken: response.access,
        refreshToken: response.refresh || refreshToken, // Utiliser le nouveau refresh ou garder l'ancien
        accessExpiresIn: response.access_expires_in,
        refreshExpiresIn: response.refresh_expires_in
      };
    }

    return null;
  } catch (error) {
    console.error('❌ Échec du rafraîchissement du token:', error);
    return null;
  }
};

/**
 * Met à jour les tokens dans le store et les cookies
 * @param {Object} tokens - Les nouveaux tokens
 */
const updateTokensInStore = (tokens) => {
  const { accessToken, refreshToken, accessExpiresIn, refreshExpiresIn } = tokens;
  
  // Récupérer l'utilisateur actuel
  const currentUser = useAuth.getState().user;
  
  if (currentUser) {
    // Mettre à jour via le store
    useAuth.getState().setUser(currentUser, {
      accessToken,
      refreshToken,
      accessExpiresIn,
      refreshExpiresIn
    });

    // Mettre à jour également dans localStorage pour compatibilité
    const authData = JSON.parse(localStorage.getItem('zamazu_auth') || '{}');
    authData.token = {
      ...authData.token,
      access: accessToken,
      refresh: refreshToken,
      access_expires_in: accessExpiresIn,
      refresh_expires_in: refreshExpiresIn
    };
    authData.savedAt = Date.now();
    localStorage.setItem('zamazu_auth', JSON.stringify(authData));

    console.log('✅ Tokens mis à jour dans le store et localStorage');
  }
};

/**
 * Nettoie l'authentification (sans redirection - géré par le composant)
 * @param {string} reason - Raison de la déconnexion
 */
const clearAuth = (reason = 'Session expirée') => {
  console.warn(`⚠️ Déconnexion: ${reason}`);
  
  // Nettoyer le store
  useAuth.getState().clearUser();
  
  // Nettoyer localStorage
  localStorage.removeItem('zamazu_auth');
};

/**
 * AuthGuard principal - Vérifie l'authentification et gère le refresh
 * @param {Object} options - Options de configuration
 * @param {boolean} options.requireAuth - Si true, redirige vers login si non authentifié
 * @param {string[]} options.allowedRoles - Rôles autorisés (ex: ['admin', 'staff'])
 * @param {string} options.redirectTo - Chemin de redirection personnalisé
 * @returns {Promise<boolean>} - true si l'accès est autorisé, false sinon
 */
export const authGuard = async (options = {}) => {
  const {
    requireAuth = true,
    allowedRoles = [],
    // redirectTo = '/auth/login'
  } = options;

  try {
    // 1. Vérifier si l'authentification est requise
    if (!requireAuth) {
      return true;
    }

    // 2. Récupérer les tokens et timestamps depuis le store
    const { accessToken, refreshToken, accessExpiresAt, refreshExpiresAt, user } = useAuth.getState();

    // 3. Vérifier la présence des tokens
    if (!accessToken || !refreshToken) {
      console.warn('⚠️ Aucun token trouvé');
      clearAuth('Veuillez vous connecter');
      return false;
    }

    // 4. Vérifier l'expiration du token d'accès
    const tokenCheck = checkTokenExpiration(accessExpiresAt);

    // 5. Si le token est encore valide et non expiré
    if (tokenCheck.isValid && !tokenCheck.isExpired) {
      console.log(`✅ Token valide (expire dans ${Math.floor(tokenCheck.expiresIn / 60)} minutes)`);
      
      // Vérifier les rôles si spécifiés
      if (allowedRoles.length > 0 && user) {
        const userRole = user.role?.code || user.role;
        if (!allowedRoles.includes(userRole)) {
          console.warn(`⚠️ Rôle non autorisé: ${userRole}`);
          clearAuth('Accès non autorisé');
          return false;
        }
      }
      
      return true;
    }

    // 6. Token expiré ou invalide - Tenter le refresh
    console.log('⏰ Token expiré, tentative de rafraîchissement...');
    const newTokens = await attemptTokenRefresh(refreshToken, refreshExpiresAt);

    // 7. Si le refresh a réussi, mettre à jour les tokens
    if (newTokens) {
      updateTokensInStore(newTokens);
      console.log('✅ Authentification rafraîchie avec succès');
      
      // Vérifier les rôles après refresh
      if (allowedRoles.length > 0 && user) {
        const userRole = user.role?.code || user.role;
        if (!allowedRoles.includes(userRole)) {
          console.warn(`⚠️ Rôle non autorisé: ${userRole}`);
          clearAuth('Accès non autorisé');
          return false;
        }
      }
      
      return true;
    }

    // 8. Échec du refresh - Déconnecter l'utilisateur
    clearAuth('Session expirée, veuillez vous reconnecter');
    return false;

  } catch (error) {
    console.error('❌ Erreur dans authGuard:', error);
    clearAuth('Erreur d\'authentification');
    return false;
  }
};

/**
 * Variantes simplifiées du authGuard
 */

// Pour les routes utilisateur standard
export const requireAuth = () => authGuard({ requireAuth: true });

// Pour les routes admin uniquement
export const requireAdmin = () => authGuard({ 
  requireAuth: true, 
  allowedRoles: ['administrator', 'owner'] 
});

// Pour les routes staff (admin + staff)
export const requireStaff = () => authGuard({ 
  requireAuth: true, 
  allowedRoles: ['administrator', 'owner', 'moderator'] 
});

// Pour les routes membre uniquement
export const requireMember = () => authGuard({ 
  requireAuth: true, 
  allowedRoles: ['member'] 
});

/**
 * Utilitaire pour vérifier l'authentification sans redirection
 * Utile pour les composants qui doivent adapter leur affichage
 */
export const checkAuth = () => {
  const { accessToken, refreshToken, accessExpiresAt } = useAuth.getState();
  
  if (!accessToken || !refreshToken) {
    return false;
  }

  const tokenCheck = checkTokenExpiration(accessExpiresAt);
  return tokenCheck.isValid && !tokenCheck.isExpired;
};

/**
 * Hook pour utiliser authGuard dans les composants React
 */
export const useAuthGuard = (options = {}) => {
  return authGuard(options);
};

export default authGuard;