/**
 * Point d'entrée centralisé pour tous les services API
 * Permet d'importer facilement les services depuis un seul endroit
 */

// Services d'authentification
export * from './authService.js';

// Services musicaux
export * from './albumService.js';
export * from './clipService.js';
export * from './trackService.js';

// Services utilisateur
export * from './userService.js';

// API de base
export { default as apiService, authAPI, musicAPI, userAPI, handleApiError } from './api.js';

// Exports par défaut pour faciliter l'utilisation
import authServiceDefault from './authService.js';
import albumServiceDefault from './albumService.js';
import clipServiceDefault from './clipService.js';
import trackServiceDefault from './trackService.js';
import userServiceDefault from './userService.js';

export const services = {
  auth: authServiceDefault,
  album: albumServiceDefault,
  clip: clipServiceDefault,
  track: trackServiceDefault,
  user: userServiceDefault
};

export default services;
