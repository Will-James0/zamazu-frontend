import { musicAPI } from './api.js';
import { useNotify } from '../_store/notifications.js';

/**
 * Service de gestion des tracks (pistes audio)
 * Gère les opérations CRUD sur les tracks
 */

/**
 * Récupération de la liste de toutes les pistes
 * @returns {Promise<Array>} Liste des tracks
 */
export const getAllTracks = async () => {
  try {
    const response = await musicAPI.getTracks();
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la récupération des tracks:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    
    throw new Error('Impossible de charger les pistes.');
  }
};

/**
 * Récupération des détails d'une piste
 * @param {string} trackToken - Token unique de la piste
 * @returns {Promise<Object>} Détails de la piste
 */
export const getTrackDetail = async (trackToken) => {
  try {
    if (!trackToken) {
      throw new Error('Token de la piste requis.');
    }

    const response = await musicAPI.getTrackDetail(trackToken);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la récupération de la piste:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Piste non trouvée.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    
    throw new Error('Impossible de charger les détails de la piste.');
  }
};

/**
 * Création d'une nouvelle piste
 * @param {Object} trackData - Données de la piste
 * @param {string} trackData.title - Titre de la piste
 * @param {string} trackData.artist - Artiste
 * @param {string} trackData.album - Album (optionnel)
 * @param {number} trackData.duration - Durée en secondes (optionnel)
 * @param {string} trackData.audio_url - URL du fichier audio
 * @returns {Promise<Object>} Piste créée
 */
export const createTrack = async (trackData) => {
  try {
    if (!trackData.title || !trackData.audio_url) {
      throw new Error('Titre et URL audio requis.');
    }

    const response = await musicAPI.createTrack(trackData);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la création de la piste:', error);
    
    if (error.response?.status === 400) {
      throw new Error('Données invalides. Vérifiez les informations.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour créer une piste.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de créer la piste.');
  }
};

/**
 * Mise à jour d'une piste existante
 * @param {string} trackToken - Token unique de la piste
 * @param {Object} trackData - Nouvelles données de la piste
 * @returns {Promise<Object>} Piste mise à jour
 */
export const updateTrack = async (trackToken, trackData) => {
  try {
    if (!trackToken) {
      throw new Error('Token de la piste requis.');
    }

    const response = await musicAPI.updateTrack(trackToken, trackData);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la piste:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Piste non trouvée.');
    }
    if (error.response?.status === 400) {
      throw new Error('Données invalides. Vérifiez les informations.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour modifier cette piste.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de mettre à jour la piste.');
  }
};

/**
 * Suppression d'une piste
 * @param {string} trackToken - Token unique de la piste
 * @returns {Promise<boolean>} Succès de la suppression
 */
export const deleteTrack = async (trackToken) => {
  try {
    if (!trackToken) {
      throw new Error('Token de la piste requis.');
    }

    await musicAPI.deleteTrack(trackToken);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de la piste:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Piste non trouvée.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour supprimer cette piste.');
    }
    
    throw new Error('Impossible de supprimer la piste.');
  }
};

/**
 * Hook personnalisé pour les opérations sur les tracks
 */
export function useTrackAPI() {
  const notify = useNotify();

  return {
    // Récupération de toutes les pistes
    async getAll() {
      try {
        const tracks = await getAllTracks();
        return tracks;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Récupération d'une piste spécifique
    async getOne(trackToken) {
      try {
        const track = await getTrackDetail(trackToken);
        return track;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Création d'une piste
    async create(trackData) {
      try {
        const result = await createTrack(trackData);
        notify.success('Piste créée avec succès !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Mise à jour d'une piste
    async update(trackToken, trackData) {
      try {
        const result = await updateTrack(trackToken, trackData);
        notify.success('Piste mise à jour avec succès !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Suppression d'une piste
    async delete(trackToken) {
      try {
        await deleteTrack(trackToken);
        notify.success('Piste supprimée avec succès !');
        return true;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    }
  };
}

export default {
  getAllTracks,
  getTrackDetail,
  createTrack,
  updateTrack,
  deleteTrack,
  useTrackAPI
};