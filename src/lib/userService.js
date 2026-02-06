import { userAPI } from './api.js';
import { useNotify } from '../_store/notifications.js';

/**
 * Service de gestion des utilisateurs
 * Gère les opérations sur les profils et utilisateurs
 */

/**
 * Récupération du profil utilisateur actuel
 * @param {string} userToken - Token de l'utilisateur
 * @returns {Promise<Object>} Profil utilisateur
 */
export async function fetchUserProfile(userToken) {
  try {
    if (!userToken) {
      throw new Error('Token utilisateur requis.');
    }

    const response = await userAPI.getProfile(userToken);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 404) {
      throw new Error('Profil utilisateur non trouvé.');
    }
    
    throw new Error('Impossible de charger le profil utilisateur.');
  }
}

/**
 * Mise à jour du profil utilisateur
 * @param {string} userToken - Token de l'utilisateur
 * @param {Object} profileData - Nouvelles données du profil
 * @returns {Promise<Object>} Profil mis à jour
 */
export async function updateUserProfile(userToken, profileData) {
  try {
    if (!userToken) {
      throw new Error('Token utilisateur requis.');
    }

    const response = await userAPI.updateProfile(userToken, profileData);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    
    if (error.response?.status === 400) {
      throw new Error('Données invalides. Vérifiez les informations.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de mettre à jour le profil.');
  }
}

/**
 * Récupération de la liste de tous les utilisateurs (Admin uniquement)
 * @returns {Promise<Array>} Liste des utilisateurs
 */
export async function getAllUsers() {
  try {
    const response = await userAPI.getUsers();
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour accéder à cette ressource.');
    }
    
    throw new Error('Impossible de charger les utilisateurs.');
  }
}

/**
 * Récupération des détails d'un utilisateur (Admin uniquement)
 * @param {string} userToken - Token de l'utilisateur
 * @returns {Promise<Object>} Détails de l'utilisateur
 */
export async function getUserDetail(userToken) {
  try {
    if (!userToken) {
      throw new Error('Token utilisateur requis.');
    }

    const response = await userAPI.getUserDetail(userToken);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Utilisateur non trouvé.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour accéder à cette ressource.');
    }
    
    throw new Error('Impossible de charger les détails de l\'utilisateur.');
  }
}

/**
 * Création d'un nouvel utilisateur (Admin uniquement)
 * @param {Object} userData - Données de l'utilisateur
 * @returns {Promise<Object>} Utilisateur créé
 */
export async function createUser(userData) {
  try {
    if (!userData.email || !userData.password) {
      throw new Error('Email et mot de passe requis.');
    }
    if (!userData.first_name || !userData.last_name) {
      throw new Error('Prénom et nom requis.');
    }

    const response = await userAPI.creataUser(userData);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    
    if (error.response?.status === 400) {
      const errorData = error.response.data;
      if (errorData.email) {
        throw new Error('Cet email est déjà utilisé.');
      }
      if (errorData.username) {
        throw new Error('Ce nom d\'utilisateur est déjà utilisé.');
      }
      throw new Error('Données invalides. Vérifiez les informations.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour créer un utilisateur.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de créer l\'utilisateur.');
  }
}

/**
 * Mise à jour d'un utilisateur (Admin uniquement)
 * @param {string} userToken - Token de l'utilisateur
 * @param {Object} userData - Nouvelles données de l'utilisateur
 * @returns {Promise<Object>} Utilisateur mis à jour
 */
export async function updateUser(userToken, userData) {
  try {
    if (!userToken) {
      throw new Error('Token utilisateur requis.');
    }

    const response = await userAPI.updateUser(userToken, userData);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Utilisateur non trouvé.');
    }
    if (error.response?.status === 400) {
      throw new Error('Données invalides. Vérifiez les informations.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour modifier cet utilisateur.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de mettre à jour l\'utilisateur.');
  }
}

/**
 * Suppression d'un utilisateur (Admin uniquement)
 * @param {string} userToken - Token de l'utilisateur
 * @returns {Promise<boolean>} Succès de la suppression
 */
export async function deleteUser(userToken) {
  try {
    if (!userToken) {
      throw new Error('Token utilisateur requis.');
    }

    await userAPI.deleteUser(userToken);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Utilisateur non trouvé.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour supprimer cet utilisateur.');
    }
    
    throw new Error('Impossible de supprimer l\'utilisateur.');
  }
}

/**
 * Récupération du dashboard utilisateur
 * @returns {Promise<Object>} Données du dashboard
 */
export async function getDashboard() {
  try {
    const response = await userAPI.getDashboard();
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la récupération du dashboard:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    
    throw new Error('Impossible de charger le dashboard.');
  }
}

/**
 * Hook personnalisé pour les opérations utilisateur
 */
export function useUserAPI() {
  const notify = useNotify();

  return {
    // Opérations de profil
    async loadProfile(userToken) {
      try {
        const profile = await fetchUserProfile(userToken);
        return profile;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async saveProfile(userToken, profileData) {
      try {
        const result = await updateUserProfile(userToken, profileData);
        notify.success('Profil mis à jour avec succès');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Opérations admin sur les utilisateurs
    async getAllUsers() {
      try {
        const users = await getAllUsers();
        return users;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async getUser(userToken) {
      try {
        const user = await getUserDetail(userToken);
        return user;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async createUser(userData) {
      try {
        const result = await createUser(userData);
        notify.success('Utilisateur créé avec succès !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async updateUser(userToken, userData) {
      try {
        const result = await updateUser(userToken, userData);
        notify.success('Utilisateur mis à jour avec succès !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async deleteUser(userToken) {
      try {
        await deleteUser(userToken);
        notify.success('Utilisateur supprimé avec succès !');
        return true;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Dashboard
    async getDashboard() {
      try {
        const dashboard = await getDashboard();
        return dashboard;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    }
  };
}

export default {
  fetchUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser,
  getDashboard,
  useUserAPI
};