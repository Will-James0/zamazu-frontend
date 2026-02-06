import { musicAPI } from './api.js';
import { useNotify } from '../_store/notifications.js';

/**
 * Service de gestion des albums
 * Gère les opérations CRUD sur les albums
 */

/**
 * Récupération de la liste de tous les albums
 * @returns {Promise<Array>} Liste des albums
 */
export const getAllAlbums = async () => {
  try {
    const response = await musicAPI.getAlbums();
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la récupération des albums:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    
    throw new Error('Impossible de charger les albums.');
  }
};

/**
 * Récupération des détails d'un album
 * @param {string} albumToken - Token unique de l'album
 * @returns {Promise<Object>} Détails de l'album
 */
export const getAlbumDetail = async (albumToken) => {
  try {
    if (!albumToken) {
      throw new Error('Token de l\'album requis.');
    }

    const response = await musicAPI.getAlbumDetail(albumToken);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'album:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Album non trouvé.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    
    throw new Error('Impossible de charger les détails de l\'album.');
  }
};

/**
 * Création d'un nouvel album
 * @param {Object} albumData - Données de l'album
 * @param {string} albumData.title - Titre de l'album
 * @param {string} albumData.artist - Artiste
 * @param {string} albumData.release_date - Date de sortie (optionnel)
 * @param {string} albumData.cover_url - URL de la pochette (optionnel)
 * @param {string} albumData.description - Description (optionnel)
 * @returns {Promise<Object>} Album créé
 */
export const createAlbum = async (albumData) => {
  try {
    if (!albumData.title || !albumData.artist) {
      throw new Error('Titre et artiste requis.');
    }

    const response = await musicAPI.createAlbum(albumData);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la création de l\'album:', error);
    
    if (error.response?.status === 400) {
      throw new Error('Données invalides. Vérifiez les informations.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour créer un album.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de créer l\'album.');
  }
};

/**
 * Mise à jour d'un album existant
 * @param {string} albumToken - Token unique de l'album
 * @param {Object} albumData - Nouvelles données de l'album
 * @returns {Promise<Object>} Album mis à jour
 */
export const updateAlbum = async (albumToken, albumData) => {
  try {
    if (!albumToken) {
      throw new Error('Token de l\'album requis.');
    }

    const response = await musicAPI.updateAlbum(albumToken, albumData);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'album:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Album non trouvé.');
    }
    if (error.response?.status === 400) {
      throw new Error('Données invalides. Vérifiez les informations.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour modifier cet album.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de mettre à jour l\'album.');
  }
};

/**
 * Suppression d'un album
 * @param {string} albumToken - Token unique de l'album
 * @returns {Promise<boolean>} Succès de la suppression
 */
export const deleteAlbum = async (albumToken) => {
  try {
    if (!albumToken) {
      throw new Error('Token de l\'album requis.');
    }

    await musicAPI.deleteAlbum(albumToken);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'album:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Album non trouvé.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour supprimer cet album.');
    }
    
    throw new Error('Impossible de supprimer l\'album.');
  }
};

/**
 * Hook personnalisé pour les opérations sur les albums
 */
export function useAlbumAPI() {
  const notify = useNotify();

  return {
    // Récupération de tous les albums
    async getAll() {
      try {
        const albums = await getAllAlbums();
        return albums;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Récupération d'un album spécifique
    async getOne(albumToken) {
      try {
        const album = await getAlbumDetail(albumToken);
        return album;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Création d'un album
    async create(albumData) {
      try {
        const result = await createAlbum(albumData);
        notify.success('Album créé avec succès !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Mise à jour d'un album
    async update(albumToken, albumData) {
      try {
        const result = await updateAlbum(albumToken, albumData);
        notify.success('Album mis à jour avec succès !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Suppression d'un album
    async delete(albumToken) {
      try {
        await deleteAlbum(albumToken);
        notify.success('Album supprimé avec succès !');
        return true;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    }
  };
}

export default {
  getAllAlbums,
  getAlbumDetail,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  useAlbumAPI
};
