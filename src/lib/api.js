export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    API_VERSION: import.meta.env.VITE_API_VERSION || 'v1',
    TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,

    ENDPOINTS: {
        
        AUTH : {
            LOGIN_USER: `${import.meta.env.VITE_API_AUTH_ENDPOINT || '/auth'}/login/user/`,
            LOGIN_ADMIN: `${import.meta.env.VITE_API_AUTH_ENDPOINT || '/auth'}/login/admin/`,
            LOGIN_REFRESH: `${import.meta.env.VITE_API_AUTH_ENDPOINT || '/auth'}/login/refresh/`,
            LOGOUT: `${import.meta.env.VITE_API_AUTH_ENDPOINT || '/auth'}/logout/`,
            REGISTER: `${import.meta.env.VITE_API_AUTH_ENDPOINT || '/auth'}/register/user/`,
        },

        MUSIC : {
            ALBUM : {
                LIST: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/albums/list/`,
                CREATE: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/albums/create/`,
                DETAIL: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/albums/detail`, // Append /:albumToken/
                UPDATE: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/albums/update`, // Append /:albumToken/
                DELETE: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/albums/delete`, // Append /:albumToken/
            },

            CLIP : {
                LIST: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/clips/list/`,
                CREATE: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/clips/create/`,
                DETAIL: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/clips/detail`, // Append /:clipToken/
                UPDATE: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/clips/update`, // Append /:clipToken/
                DELETE: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/clips/delete`, // Append /:clipToken/
            },
            
            TRACK : {
                LIST: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/tracks/list/`,
                CREATE: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/tracks/create/`,
                DETAIL: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/tracks/detail`, // Append /:trackToken/
                UPDATE: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/tracks/update`, // Append /:trackToken/
                DELETE: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/tracks/delete`, // Append /:trackToken/
            },

            LIKE: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/like`, // Append / <str:content_type>/<uuid:code>/
            VIEW: `${import.meta.env.VITE_API_MUSIC_ENDPOINT || '/music'}/view`, // Append / <str:content_type>/<uuid:code>/
        },

        USER : {
            LIST: `${import.meta.env.VITE_API_USER_ENDPOINT || '/users'}/list/`,
            CREATE: `${import.meta.env.VITE_API_USER_ENDPOINT || '/users'}/create/`,
            DETAIL: `${import.meta.env.VITE_API_USER_ENDPOINT || '/users'}/detail`, // Append /:userToken/
            UPDATE: `${import.meta.env.VITE_API_USER_ENDPOINT || '/users'}/update`, // Append /:userToken/
            DELETE: `${import.meta.env.VITE_API_USER_ENDPOINT || '/users'}/delete`, // Append /:userToken/
            TOGGLE_STATUS: `${import.meta.env.VITE_API_USER_ENDPOINT || '/users'}/toggle-status`, // Append /:userToken/
            DASHBOARD: `${import.meta.env.VITE_API_USER_ENDPOINT || '/users'}/dashboard/`,

            PROFILE : {
                GET: `${import.meta.env.VITE_API_USER_ENDPOINT || '/users'}/profile`, // Append /:userToken/
                UPDATE: `${import.meta.env.VITE_API_USER_ENDPOINT || '/users'}/profile/update`, // Append /:userToken/
            }
        }

    }
};

// Configuration des headers par défaut
const getDefaultHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  // Ajouter le token d'authentification si disponible
  const token = getAuthToken();
  if (token) {
    const headerName = import.meta.env.VITE_JWT_HEADER_NAME || 'Authorization';
    const prefix = import.meta.env.VITE_JWT_PREFIX || 'Bearer';
    headers[headerName] = `${prefix} ${token}`;
    console.log(`🔐 Header d'authentification ajouté: ${headerName}: ${prefix} ${token.substring(0, 20)}...`);
  } else {
    console.warn('⚠️ Aucun token disponible pour les headers');
  }
  
  return headers;
};

// Récupération du token d'authentification
const getAuthToken = () => {
  try {
    // Essayer d'abord depuis le localStorage géré par Zustand persist
    const authStorage = localStorage.getItem('auth-storage');
    console.log('🔍 Récupération du token depuis auth-storage:', authStorage ? 'trouvé' : 'non trouvé');
    
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      console.log('📦 Structure auth-storage:', {
        hasState: !!parsed.state,
        hasAccessToken: !!parsed.state?.accessToken,
        tokenPreview: parsed.state?.accessToken ? parsed.state.accessToken.substring(0, 20) + '...' : null
      });
      
      const accessToken = parsed.state?.accessToken;
      if (accessToken) {
        console.log('✅ Token trouvé dans auth-storage');
        return accessToken;
      }
    }
    
    // Fallback vers l'ancien format pour compatibilité
    const authData = localStorage.getItem('zamazu_auth');
    if (authData) {
      const parsed = JSON.parse(authData);
      console.log('📦 Utilisation du fallback zamazu_auth');
      return parsed.token?.access;
    }
    
    console.warn('⚠️ Aucun token trouvé dans le localStorage');
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du token:', error);
  }
  return null;
};

// Vérification de la validité du token
const isTokenValid = () => {
  try {
    const authData = localStorage.getItem('zamazu_auth');
    if (authData) {
      const parsed = JSON.parse(authData);
      // Calculer l'expiration basée sur le timestamp de sauvegarde et access_expires_in
      const savedTime = parsed.savedAt || Date.now();
      const expiresIn = (parsed.token?.access_expires_in || 3600) * 1000; // convertir en ms
      return Date.now() < (savedTime + expiresIn);
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
  }
  return false;
};

// Classe principale pour les requêtes API
class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.isRefreshing = false;
    this.refreshSubscribers = [];
  }

  // Gestion des requêtes en attente pendant le refresh
  onRefreshed(token) {
    this.refreshSubscribers.forEach(callback => callback(token));
    this.refreshSubscribers = [];
  }

  addRefreshSubscriber(callback) {
    this.refreshSubscribers.push(callback);
  }

  // Tentative de refresh du token
  async refreshAccessToken() {
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (!authStorage) {
        throw new Error('Aucun refresh token trouvé');
      }

      const parsed = JSON.parse(authStorage);
      const refreshToken = parsed.state?.refreshToken;

      if (!refreshToken) {
        throw new Error('Refresh token manquant');
      }

      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN_REFRESH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken })
      });

      if (!response.ok) {
        throw new Error('Refresh token invalide');
      }

      const data = await response.json();
      
      // Mettre à jour le store avec le nouveau token
      const currentState = JSON.parse(localStorage.getItem('auth-storage'));
      const now = Math.floor(Date.now() / 1000);
      currentState.state.accessToken = data.access;
      currentState.state.accessExpiresAt = now + (data.access_expires_in || 3600);
      
      localStorage.setItem('auth-storage', JSON.stringify(currentState));
      
      console.log('✅ Token rafraîchi avec succès');
      return data.access;
    } catch (error) {
      console.error('❌ Erreur lors du refresh du token:', error);
      throw error;
    }
  }

  // Méthode générique pour les requêtes
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method: 'GET',
      timeout: this.timeout,
      ...options
    };

    // Définir les headers seulement si ce n'est pas FormData
    if (!(config.body instanceof FormData)) {
      // Ne pas inclure l'auth token si skipAuth est true
      if (config.skipAuth) {
        config.headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers
        };
      } else {
        config.headers = {
          ...getDefaultHeaders(),
          ...options.headers
        };
      }
    } else {
      // Pour FormData, on garde seulement les headers d'auth sans Content-Type (sauf si skipAuth)
      config.headers = {};
      if (!config.skipAuth) {
        const token = getAuthToken();
        if (token) {
          const headerName = import.meta.env.VITE_JWT_HEADER_NAME || 'Authorization';
          const prefix = import.meta.env.VITE_JWT_PREFIX || 'Bearer';
          config.headers[headerName] = `${prefix} ${token}`;
        }
      }
    }

    try {
      console.log(`🌐 API Request: ${config.method} ${url}`);
      console.log('📋 Headers envoyés:', config.headers);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Vérifier si la réponse est ok
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Essayer de parser en JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      console.log(`✅ API Response: ${config.method} ${url}`, data);
      return data;
      
    } catch (error) {
      console.error(`❌ API Error: ${config.method} ${url}`, error);
      
      if (error.name === 'AbortError') {
        throw new Error('Timeout: La requête a pris trop de temps');
      }
      
      if (error.message.includes('401') && !options.skipRefresh) {
        // Token expiré, tenter de le rafraîchir
        console.log('🔄 Token expiré, tentative de refresh...');
        
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          
          try {
            const newToken = await this.refreshAccessToken();
            this.isRefreshing = false;
            this.onRefreshed(newToken);
            
            // Réessayer la requête originale avec le nouveau token
            return this.request(endpoint, { ...options, skipRefresh: true });
          } catch (refreshError) {
            this.isRefreshing = false;
            this.clearAuth();
            throw new Error('Session expirée, veuillez vous reconnecter');
          }
        } else {
          // Une autre requête est en train de rafraîchir le token
          // Attendre qu'elle se termine
          return new Promise((resolve, reject) => {
            this.addRefreshSubscriber((token) => {
              // Réessayer avec le nouveau token
              this.request(endpoint, { ...options, skipRefresh: true })
                .then(resolve)
                .catch(reject);
            });
          });
        }
      }
      
      throw error;
    }
  }

  // Méthodes HTTP spécifiques
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  async post(endpoint, data = {}, options = {}) {
    const config = {
      method: 'POST'
    };
    
    // Si c'est FormData, ne pas stringify et laisser le navigateur définir le Content-Type
    if (data instanceof FormData) {
      config.body = data;
      // Ne pas définir Content-Type, le navigateur le fera avec boundary
    } else {
      config.body = JSON.stringify(data);
    }
    
    // Passer les options à la méthode request
    return this.request(endpoint, { ...config, ...options });
  }

  async put(endpoint, data = {}) {
    const config = {
      method: 'PUT'
    };
    
    // Si c'est FormData, ne pas stringify
    if (data instanceof FormData) {
      config.body = data;
    } else {
      config.body = JSON.stringify(data);
    }
    
    return this.request(endpoint, config);
  }

  async patch(endpoint, data = {}) {
    const config = {
      method: 'PATCH'
    };
    
    // Si c'est FormData, ne pas stringify
    if (data instanceof FormData) {
      config.body = data;
    } else {
      config.body = JSON.stringify(data);
    }
    
    return this.request(endpoint, config);
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  async uploadFile(endpoint, formData) {
    const headers = getDefaultHeaders();
    delete headers['Content-Type']; // Laisser le navigateur définir le Content-Type pour FormData
    
    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: formData
    });
  }

  // Gestion de l'authentification
  setAuthToken(tokenData) {
    try {
      const dataToStore = {
        ...tokenData,
        savedAt: Date.now()
      };
      localStorage.setItem('zamazu_auth', JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du token:', error);
    }
  }

  clearAuth() {
    try {
      localStorage.removeItem('zamazu_auth');
    } catch (error) {
      console.error('Erreur lors de la suppression du token:', error);
    }
  }

  isAuthenticated() {
    return getAuthToken() && isTokenValid();
  }

  getCurrentUser() {
    try {
      const authData = localStorage.getItem('zamazu_auth');
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.user;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    }
    return null;
  }
}

// Instance singleton du service API
const apiService = new ApiService();

// Services spécialisés pour chaque domaine
export const authAPI = {
  // Connexion utilisateur
  loginUser: async (credentials) => {
    const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN_USER, {
      email: credentials.email,
      password: credentials.password
    }, { skipAuth: true }); // Skip authentication for login
    return response;
  },

  // Connexion admin
  loginAdmin: async (credentials) => {
    const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN_ADMIN, {
      email: credentials.email,
      password: credentials.password
    }, { skipAuth: true }); // Skip authentication for login
    return response;
  },

  // Inscription utilisateur
  registerUser: async (userData) => {
    // S'assurer que le username est présent
    const dataToSend = {
      ...userData,
      username: userData.username || userData.email
    };
    return apiService.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, dataToSend, { skipAuth: true });
  },

  refreshToken: async () => {
    // Récupérer le refresh token depuis localStorage
    const authData = localStorage.getItem('zamazu_auth');
    if (!authData) {
      throw new Error('Aucun refresh token trouvé');
    }
    
    const parsed = JSON.parse(authData);
    const refreshToken = parsed.token?.refresh;
    
    if (!refreshToken) {
      throw new Error('Refresh token manquant');
    }
    
    return apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN_REFRESH, {
      refresh: refreshToken
    }, { skipAuth: true });
  },

  // Déconnexion
  logout: () => {
    apiService.clearAuth();
  }
};

// Services pour la gestion de la musique
export const musicAPI = {
  // Albums
  getAlbums: async () => {
    return apiService.get(API_CONFIG.ENDPOINTS.MUSIC.ALBUM.LIST);
  },

  createAlbum: async (albumData) => {
    return apiService.post(API_CONFIG.ENDPOINTS.MUSIC.ALBUM.CREATE, albumData);
  },

  getAlbumDetail: async (albumToken) => {
    return apiService.get(`${API_CONFIG.ENDPOINTS.MUSIC.ALBUM.DETAIL}/${albumToken}/`);
  },

  updateAlbum: async (albumToken, albumData) => {
    return apiService.put(`${API_CONFIG.ENDPOINTS.MUSIC.ALBUM.UPDATE}/${albumToken}/`, albumData);
  },

  deleteAlbum: async (albumToken) => {
    return apiService.delete(`${API_CONFIG.ENDPOINTS.MUSIC.ALBUM.DELETE}/${albumToken}/`);
  },

  // Clips
  getClips: async () => {
    return apiService.get(API_CONFIG.ENDPOINTS.MUSIC.CLIP.LIST);
  },

  createClip: async (clipData) => {
    return apiService.post(API_CONFIG.ENDPOINTS.MUSIC.CLIP.CREATE, clipData);
  },

  getClipDetail: async (clipToken) => {
    return apiService.get(`${API_CONFIG.ENDPOINTS.MUSIC.CLIP.DETAIL}/${clipToken}/`);
  },

  updateClip: async (clipToken, clipData) => {
    return apiService.put(`${API_CONFIG.ENDPOINTS.MUSIC.CLIP.UPDATE}/${clipToken}/`, clipData);
  },

  deleteClip: async (clipToken) => {
    return apiService.delete(`${API_CONFIG.ENDPOINTS.MUSIC.CLIP.DELETE}/${clipToken}/`);
  },

  // Tracks
  getTracks: async () => {
    return apiService.get(API_CONFIG.ENDPOINTS.MUSIC.TRACK.LIST);
  },

  createTrack: async (trackData) => {
    return apiService.post(API_CONFIG.ENDPOINTS.MUSIC.TRACK.CREATE, trackData);
  },

  getTrackDetail: async (trackToken) => {
    return apiService.get(`${API_CONFIG.ENDPOINTS.MUSIC.TRACK.DETAIL}/${trackToken}/`);
  },

  updateTrack: async (trackToken, trackData) => {
    return apiService.put(`${API_CONFIG.ENDPOINTS.MUSIC.TRACK.UPDATE}/${trackToken}/`, trackData);
  },

  deleteTrack: async (trackToken) => {
    return apiService.delete(`${API_CONFIG.ENDPOINTS.MUSIC.TRACK.DELETE}/${trackToken}/`);
  },

  // Likes
  toggleLike: async (contentType, code) => {
    return apiService.post(`${API_CONFIG.ENDPOINTS.MUSIC.LIKE}/${contentType}/${code}/`);
  },

  // Views
  recordView: async (contentType, code) => {
    return apiService.post(`${API_CONFIG.ENDPOINTS.MUSIC.VIEW}/${contentType}/${code}/`);
  }
}



// Services pour la gestion des utilisateurs
export const userAPI = {
  // Profil utilisateur
  getProfile: async (token) => {
    return apiService.get(`${API_CONFIG.ENDPOINTS.USER.PROFILE.GET}/${token}/`);
  },

  updateProfile: async (token, data) => {
    return apiService.put(`${API_CONFIG.ENDPOINTS.USER.PROFILE.UPDATE}/${token}/`, data);
  },

  // Gestion des utilisateurs (Admin only)
  getUsers: async () => {
    return apiService.get(API_CONFIG.ENDPOINTS.USER.LIST);
  },

  getAllUsers: async () => {
    return apiService.get(API_CONFIG.ENDPOINTS.USER.LIST);
  },

  createUser: async (userData) => {
    return apiService.post(API_CONFIG.ENDPOINTS.USER.CREATE, userData);
  },

  getUserDetail: async (token) => {
    return apiService.get(`${API_CONFIG.ENDPOINTS.USER.DETAIL}/${token}/`);
  },

  updateUser: async (token, userData) => {
    return apiService.put(`${API_CONFIG.ENDPOINTS.USER.UPDATE}/${token}/`, userData);
  },

  deleteUser: async (userId) => {
    return apiService.delete(`${API_CONFIG.ENDPOINTS.USER.DELETE}/${userId}/`);
  },

  toggleUserStatus: async (userCode) => {
    return apiService.request(`${API_CONFIG.ENDPOINTS.USER.TOGGLE_STATUS}/${userCode}/`, {
      method: 'PATCH'
    });
  },

  // Dashboard
  getDashboard: async () => {
    return apiService.get(API_CONFIG.ENDPOINTS.USER.DASHBOARD);
  }
};

// Utilitaires pour les erreurs API
export const handleApiError = (error, defaultMessage = 'Une erreur est survenue') => {
  console.error('API Error:', error);
  
  if (error.message.includes('Session expirée')) {
    return {
      type: 'auth_error',
      message: 'Votre session a expiré. Veuillez vous reconnecter.',
      shouldRedirect: true
    };
  }
  
  if (error.message.includes('Timeout')) {
    return {
      type: 'timeout_error',
      message: 'La requête a pris trop de temps. Vérifiez votre connexion.',
      shouldRetry: true
    };
  }
  
  if (error.message.includes('400')) {
    return {
      type: 'validation_error',
      message: 'Données invalides. Vérifiez vos informations.',
      shouldRetry: false
    };
  }
  
  if (error.message.includes('500')) {
    return {
      type: 'server_error',
      message: 'Erreur du serveur. Veuillez réessayer plus tard.',
      shouldRetry: true
    };
  }
  
  return {
    type: 'unknown_error',
    message: defaultMessage,
    shouldRetry: false
  };
};

// Utilitaire pour construire les URLs des médias
export const getMediaUrl = (path) => {
  if (!path) return null;
  
  // Si c'est déjà une URL complète, la retourner telle quelle
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Construire l'URL complète avec le backend
  const baseUrl = API_CONFIG.BASE_URL.replace('/api', '');
  return `${baseUrl}${path}`;
};

// Export du service principal
export default apiService;

// Export des utilitaires
export { getAuthToken, isTokenValid };