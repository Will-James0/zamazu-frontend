import { authAPI } from './api.js';
import { useNotify } from '../_store/notifications.js';

/**
 * Service d'authentification
 * Gère les opérations de connexion, inscription et profil utilisateur
 */

/**
 * Connexion d'un utilisateur patient
 * @param {Object} credentials - Identifiants de connexion
 * @param {string} credentials.email - Email ou nom d'utilisateur
 * @param {string} credentials.password - Mot de passe
 * @returns {Promise<Object>} Données utilisateur et tokens
 */
export const loginMember = async (credentials) => {
  try {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email et mot de passe requis.');
    }

    const response = await authAPI.loginUser(credentials);

    return {
        user: response.user,

        token: {
            access :response.access,
            refresh: response.refresh,
            access_expires_in: response.access_expires_in,
            refresh_expires_in: response.refresh_expires_in,
        }
    }
  } catch (error) {
    console.error('Erreur lors de la connexion patient:', error);
    
    if (error.response?.status === 400) {
      throw new Error('Identifiants invalides. Vérifiez votre email et mot de passe.');
    }
    if (error.response?.status === 401) {
      throw new Error('Email ou mot de passe incorrect.');
    }
    if (error.response?.status === 403) {
      throw new Error('Compte désactivé. Contactez l\'administrateur.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Erreur de connexion. Vérifiez votre connexion.');
  }
}

/**
 * Connexion d'un médecin ou propriétaire de dispensaire
 * @param {Object} credentials - Identifiants de connexion
 * @returns {Promise<Object>} Données utilisateur et tokens
 */
export const loginStaff = async (credentials) => {
  try {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email et mot de passe requis.');
    }

    const response = await authAPI.loginAdmin(credentials);

    return {
        user: response.user,

        token: {
            access :response.access,
            refresh: response.refresh,
            access_expires_in: response.access_expires_in,
            refresh_expires_in: response.refresh_expires_in,
        }
    }
  } catch (error) {
    console.error('Erreur lors de la connexion staff:', error);
    
    if (error.response?.status === 400) {
      throw new Error('Identifiants invalides. Vérifiez votre email et mot de passe.');
    }
    if (error.response?.status === 401) {
      throw new Error('Email ou mot de passe incorrect.');
    }
    if (error.response?.status === 403) {
      throw new Error('Compte désactivé. Contactez l\'administrateur.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Erreur de connexion. Vérifiez votre connexion.');
  }
}

/**
 * Inscription d'un nouvel utilisateur patient
 * @param {Object} userData - Données d'inscription
 * @returns {Promise<Object>} Données utilisateur créé
 */
export async function registerUser(userData) {
  try {
    // Validation côté frontend
    if (!userData.email || !userData.password) {
      throw new Error('Email et mot de passe requis.');
    }
    if (!userData.first_name || !userData.last_name) {
      throw new Error('Prénom et nom requis.');
    }
    if (userData.password.length < 8) {
      throw new Error('Le mot de passe doit contenir au moins 8 caractères.');
    }
    if (userData.password !== userData.confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }

    // Suppression du champ de confirmation avant envoi
    const { confirmPassword, acceptTerms, ...dataToSend } = userData;

    console.log(confirmPassword, acceptTerms);
    
    // Générer le username à partir de l'email si non fourni
    if (!dataToSend.username) {
      dataToSend.username = userData.email;
    }
    
    // Log de débogage pour vérifier les données envoyées
    console.log('🔍 DEBUG registerUser - Données envoyées au backend:', dataToSend);
    
    const response = await authAPI.registerUser(dataToSend);
    
    return {
      user: response.user || response,
      message: response.message || 'Inscription réussie !'
    };
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    
    if (error.response?.status === 400) {
      const errorData = error.response.data;
      if (errorData.email) {
        throw new Error('Cet email est déjà utilisé.');
      }
      if (errorData.username) {
        throw new Error('Ce nom d\'utilisateur est déjà utilisé.');
      }
      if (errorData.message) {
        throw new Error(errorData.message);
      }
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Erreur lors de l\'inscription. Vérifiez vos données.');
  }
}

/**
 * Déconnexion de l'utilisateur
 * @returns {Promise<boolean>} Succès de la déconnexion
 */
export async function logoutUser() {
  try {
    await authAPI.logout();
    return true;
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    // On continue la déconnexion côté client même si l'API échoue
    return true;
  }
}


/**
 * Changement de mot de passe
 * @param {Object} passwordData - Données de changement de mot de passe
 * @param {string} passwordData.currentPassword - Mot de passe actuel
 * @param {string} passwordData.newPassword - Nouveau mot de passe
 * @param {string} passwordData.confirmPassword - Confirmation du nouveau mot de passe
 * @returns {Promise<boolean>} Succès du changement
 */
export async function changePassword(passwordData) {
  try {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      throw new Error('Mot de passe actuel et nouveau mot de passe requis.');
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }
    if (passwordData.newPassword.length < 8) {
      throw new Error('Le nouveau mot de passe doit contenir au moins 8 caractères.');
    }

    await authAPI.changePassword({
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword
    });
    
    return true;
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    
    if (error.response?.status === 400) {
      throw new Error('Mot de passe actuel incorrect.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de changer le mot de passe.');
  }
}

/**
 * Réinitialisation de mot de passe (demande)
 * @param {string} email - Email pour la réinitialisation
 * @returns {Promise<boolean>} Succès de l'envoi
 */
export async function requestPasswordReset(email) {
  try {
    if (!email) {
      throw new Error('Email requis.');
    }

    await authAPI.requestPasswordReset({ email });
    return true;
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Aucun compte associé à cet email.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible d\'envoyer l\'email de réinitialisation.');
  }
}

/**
 * Vérification du statut de l'utilisateur connecté
 * @returns {Promise<Object>} Statut et informations utilisateur
 */
export async function checkAuthStatus() {
  try {
    const response = await authAPI.getProfile();
    return {
      isAuthenticated: true,
      user: response.data || response
    };
  } catch (error) {
    return {
      error,
      isAuthenticated: false,
      user: null
    };
  }
}

/**
 * Hook personnalisé pour l'authentification avec API
 */
export function useAuthAPI() {
  const notify = useNotify();

  return {
    // Opérations d'authentification
    async login(credentials) {
      try {
        const result = await loginMember(credentials);
        notify.success('Connexion réussie !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async register(userData) {
      try {
        const result = await registerUser(userData);
        notify.success('Inscription réussie !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async logout() {
      try {
        await logoutUser();
        notify.success('Déconnexion réussie');
        return true;
      } catch (error) {
        // On continue même en cas d'erreur
        notify.error('Déconnexion avec erreurs', error);
        return false;
      }
    },

    async changePassword(passwordData) {
      try {
        await changePassword(passwordData);
        notify.success('Mot de passe modifié avec succès');
        return true;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async resetPassword(email) {
      try {
        await requestPasswordReset(email);
        notify.success('Email de réinitialisation envoyé');
        return true;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async checkStatus() {
      try {
        const status = await checkAuthStatus();
        return status;
      } catch (error) {
        console.error('Erreur lors de la vérification du statut:', error);
        return { isAuthenticated: false, user: null };
      }
    },

    async refreshToken() {
      try {
        const response = await authAPI.refreshToken();
        return {
          access: response.access,
          refresh: response.refresh,
          access_expires_in: response.access_expires_in,
          refresh_expires_in: response.refresh_expires_in,
        };
      } catch (error) {
        console.error('Erreur lors du rafraîchissement du token:', error);
        throw new Error('Impossible de rafraîchir le token.');
      }
    }
  };
}

export default {
  loginMember,
  registerUser,
  logoutUser,
  changePassword,
  requestPasswordReset,
  checkAuthStatus,
  useAuthAPI
};
