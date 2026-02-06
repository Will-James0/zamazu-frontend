import { musicAPI } from './api.js';
import { useNotify } from '../_store/notifications.js';

/**
 * Service de gestion des clips vidéo
 * Gère les opérations CRUD sur les clips
 * Un clip est une version vidéo d'un track
 */

/**
 * Récupération de la liste de tous les clips
 * @returns {Promise<Array>} Liste des clips avec leurs tracks associés
 */
export const getAllClips = async () => {
  try {
    const response = await musicAPI.getClips();
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la récupération des clips:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    
    throw new Error('Impossible de charger les clips.');
  }
};

/**
 * Récupération des détails d'un clip
 * @param {string} clipCode - Code unique du clip (UUID)
 * @returns {Promise<Object>} Détails du clip avec le track associé
 */
export const getClipDetail = async (clipCode) => {
  try {
    if (!clipCode) {
      throw new Error('Code du clip requis.');
    }

    const response = await musicAPI.getClipDetail(clipCode);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la récupération du clip:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Clip non trouvé.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    
    throw new Error('Impossible de charger les détails du clip.');
  }
};

/**
 * Création d'un nouveau clip
 * @param {Object} clipData - Données du clip
 * @param {string} clipData.track_code - Code UUID du track associé (requis)
 * @param {File} clipData.video_file - Fichier vidéo (requis)
 * @param {string} clipData.release_date - Date de sortie (optionnel, format: YYYY-MM-DD)
 * @returns {Promise<Object>} Message de succès
 */
export const createClip = async (clipData) => {
  try {
    if (!clipData.track_code || !clipData.video_file) {
      throw new Error('Track et fichier vidéo requis.');
    }

    // Créer un FormData pour l'upload du fichier
    const formData = new FormData();
    formData.append('track_code', clipData.track_code);
    formData.append('video_file', clipData.video_file);
    
    if (clipData.release_date) {
      formData.append('release_date', clipData.release_date);
    }

    const response = await musicAPI.createClip(formData);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la création du clip:', error);
    
    if (error.response?.status === 400) {
      throw new Error('Données invalides. Vérifiez les informations.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour créer un clip.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de créer le clip.');
  }
};

/**
 * Mise à jour d'un clip existant
 * @param {string} clipCode - Code unique du clip (UUID)
 * @param {Object} clipData - Nouvelles données du clip
 * @param {string} clipData.track_code - Code UUID du track associé (optionnel)
 * @param {File} clipData.video_file - Nouveau fichier vidéo (optionnel)
 * @param {string} clipData.release_date - Nouvelle date de sortie (optionnel, format: YYYY-MM-DD)
 * @returns {Promise<Object>} Message de succès
 */
export const updateClip = async (clipCode, clipData) => {
  try {
    if (!clipCode) {
      throw new Error('Code du clip requis.');
    }

    // Créer un FormData si un fichier vidéo est fourni
    let dataToSend = clipData;
    if (clipData.video_file && clipData.video_file instanceof File) {
      const formData = new FormData();
      
      if (clipData.track_code) {
        formData.append('track_code', clipData.track_code);
      }
      formData.append('video_file', clipData.video_file);
      
      if (clipData.release_date) {
        formData.append('release_date', clipData.release_date);
      }
      
      dataToSend = formData;
    } else {
      // Si pas de fichier vidéo, envoyer en JSON avec track_code si présent
      const jsonData = {};
      if (clipData.track_code) {
        jsonData.track_code = clipData.track_code;
      }
      if (clipData.release_date !== undefined) {
        jsonData.release_date = clipData.release_date;
      }
      dataToSend = jsonData;
    }

    const response = await musicAPI.updateClip(clipCode, dataToSend);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du clip:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Clip non trouvé.');
    }
    if (error.response?.status === 400) {
      throw new Error('Données invalides. Vérifiez les informations.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour modifier ce clip.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de mettre à jour le clip.');
  }
};

/**
 * Suppression d'un clip
 * @param {string} clipCode - Code unique du clip (UUID)
 * @returns {Promise<Object>} Message de succès
 */
export const deleteClip = async (clipCode) => {
  try {
    if (!clipCode) {
      throw new Error('Code du clip requis.');
    }

    const response = await musicAPI.deleteClip(clipCode);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la suppression du clip:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Clip non trouvé.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    if (error.response?.status === 403) {
      throw new Error('Vous n\'avez pas les droits pour supprimer ce clip.');
    }
    
    throw new Error('Impossible de supprimer le clip.');
  }
};

/**
 * Hook personnalisé pour les opérations sur les clips
 * Usage: const clipAPI = useClipAPI();
 */
export function useClipAPI() {
  const notify = useNotify();

  return {
    // Récupération de tous les clips
    async getAll() {
      try {
        const clips = await getAllClips();
        return clips;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Récupération d'un clip spécifique
    async getOne(clipCode) {
      try {
        const clip = await getClipDetail(clipCode);
        return clip;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Création d'un clip (avec upload de fichier vidéo)
    async create(clipData) {
      try {
        const result = await createClip(clipData);
        notify.success('Clip créé avec succès !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Mise à jour d'un clip
    async update(clipCode, clipData) {
      try {
        const result = await updateClip(clipCode, clipData);
        notify.success('Clip mis à jour avec succès !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    // Suppression d'un clip
    async delete(clipCode) {
      try {
        const result = await deleteClip(clipCode);
        notify.success('Clip supprimé avec succès !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    }
  };
}

export default {
  getAllClips,
  getClipDetail,
  createClip,
  updateClip,
  deleteClip,
  useClipAPI
};