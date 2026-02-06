import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useEffect } from 'react';
import { 
    loginMember,
    loginStaff,
    registerUser,
    logoutUser
 } from '../lib/authService.js';
import { 
    fetchUserProfile, 
    updateUserProfile 
 } from '../lib/userService.js';
import { getMediaUrl } from '../lib/api.js';

 // Store Zustand équivalent au store Pinia avec intégration API
export const useAuth = create()(
    devtools(
        persist(
            (set, get) => ({
                //Etat
                user: null,
                isLoading: false,
                accessToken: null,
                refreshToken: null,
                accessExpiresAt: null,
                refreshExpiresAt: null,

                loadUser: () => {
                    // Le middleware persist gère automatiquement le chargement depuis localStorage
                    // Cette fonction est conservée pour compatibilité mais ne fait plus rien
                    console.log('\ud83d\udd04 Store hydraté depuis localStorage');
                },

                setUser: (userData, tokens = {}) => {
                    const { accessToken, refreshToken, accessExpiresIn, refreshExpiresIn } = tokens;
                    
                    // Calculer les timestamps d'expiration si les durées sont fournies
                    const now = Math.floor(Date.now() / 1000); // timestamp en secondes
                    const accessExpiresAt = accessExpiresIn ? now + accessExpiresIn : get().accessExpiresAt;
                    const refreshExpiresAt = refreshExpiresIn ? now + refreshExpiresIn : get().refreshExpiresAt;

                    // Transformer l'URL de l'image de profil si présente
                    const userWithFullUrls = userData ? {
                        ...userData,
                        image: userData.image ? getMediaUrl(userData.image) : userData.image
                    } : userData;

                    set({
                        user: userWithFullUrls,
                        accessToken: accessToken || get().accessToken,
                        refreshToken: refreshToken || get().refreshToken,
                        accessExpiresAt,
                        refreshExpiresAt
                    }, false, 'setUser');
                    
                    console.log('✅ Tokens enregistrés dans le store', { accessToken: !!accessToken, refreshToken: !!refreshToken });
                },

                getUser: () => {
                    return get().user;
                },

                clearUser: () => {
                    set({ 
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        accessExpiresAt: null,
                        refreshExpiresAt: null,
                        dispensary: null
                    }, false, 'clearUser');
                    
                    console.log('🧹 Store nettoyé');
                },

                setLoading: (loading) => {
                    set({ isLoading: loading }, false, 'setLoading');
                },

                // Nouvelles actions avec intégration API
                login: async (credentials) => {
                    try {
                        set({ isLoading: true}, false, 'login-start');

                        // Déterminer le type de login selon le rôle spécifié
                        let loginFunction = loginMember;  // Par défaut, login membre
                        
                        if (credentials.role === 'staff') {
                            loginFunction = loginStaff;
                        }

                        const { user, token } = await loginFunction(credentials);

                        get().setUser(user, {
                            accessToken: token.access,
                            refreshToken: token.refresh,
                            accessExpiresIn: token.access_expires_in,
                            refreshExpiresIn: token.refresh_expires_in
                        });

                        // Sauvegarder également dans localStorage pour compatibilité
                        localStorage.setItem('zamazu_auth', JSON.stringify({
                            user,
                            token
                        }));

                        return user;
                    } finally {
                        set({ isLoading: false }, false, 'login-end');
                    }
                },

                register: async (userData) => {
                    try {
                        set({ isLoading: true }, false, 'register-start');

                        const { user, message } = await registerUser(userData);
              
                        // Pour l'inscription patient, on peut directement connecter l'utilisateur
                        if (user) {
                            get().setUser(user);
                        }
                        
                        return { user, message };
                    } finally {
                        set({ isLoading: false }, false, 'register-end');
                    }
                },

                logout: async () => {
                    try {
                        set({ isLoading: true }, false, 'logout-start');
                        
                        await logoutUser();
                        
                    } catch (error) {
                        // On continue même en cas d'erreur
                        console.error('Erreur lors de la déconnexion API:', error);
                    } finally {
                        get().clearUser();
                        set({ isLoading: false }, false, 'logout-end');
                    }
                },

                updateProfile: async (profileData) => {
                    try {
                        set({ isLoading: true }, false, 'update-profile-start');
                        
                        const user = get().user;
                        console.log('📝 updateProfile - user actuel:', user);
                        
                        if (!user) {
                            throw new Error('Aucun utilisateur connecté');
                        }
                        
                        // Vérifier si user.code existe, sinon utiliser user.id ou user.username
                        const userIdentifier = user.code || user.id || user.username;
                        
                        if (!userIdentifier) {
                            console.error('❌ Impossible de trouver un identifiant utilisateur:', user);
                            throw new Error('Identifiant utilisateur manquant');
                        }
                        
                        console.log('📝 Mise à jour du profil avec identifiant:', userIdentifier);
                        const updatedUser = await updateUserProfile(userIdentifier, profileData);
                        
                        // Transformer l'URL de l'image de profil
                        const updatedUserWithFullUrls = {
                            ...updatedUser,
                            image: updatedUser.image ? getMediaUrl(updatedUser.image) : updatedUser.image
                        };
                        
                        // Mise à jour locale - préserver les tokens
                        set(state => ({
                            user: { ...state.user, ...updatedUserWithFullUrls }
                        }), false, 'update-profile');
                        
                        return updatedUserWithFullUrls;
                    } finally {
                        set({ isLoading: false }, false, 'update-profile-end');
                    }
                },

                refreshProfile: async () => {
                    try {
                        const user = get().user;
                        console.log('🔄 refreshProfile - user actuel:', user);
                        
                        if (!user) {
                            throw new Error('Aucun utilisateur connecté');
                        }
                        
                        // Vérifier si user.code existe, sinon utiliser user.id ou user.username
                        const userIdentifier = user.code || user.id || user.username;
                        
                        if (!userIdentifier) {
                            console.error('❌ Impossible de trouver un identifiant utilisateur:', user);
                            throw new Error('Identifiant utilisateur manquant');
                        }
                        
                        console.log('🔄 Rafraîchissement du profil avec identifiant:', userIdentifier);
                        const profile = await fetchUserProfile(userIdentifier);
                        
                        // Transformer l'URL de l'image de profil
                        const profileWithFullUrls = {
                            ...profile,
                            image: profile.image ? getMediaUrl(profile.image) : profile.image
                        };
                        
                        // Mettre à jour seulement les données utilisateur, pas les tokens
                        set(state => ({
                            user: { ...state.user, ...profileWithFullUrls }
                        }), false, 'refresh-profile');
                        
                        return profileWithFullUrls;
                    } catch (error) {
                        // Si le profil ne peut pas être chargé, déconnecter
                        console.error('Erreur lors du rafraîchissement du profil:', error);
                        throw error;
                    }
                },

                    // Getters calculés (équivalents aux computed de Vue)
                isAuthenticated: () => {
                    return get().user !== null && get().accessToken !== null;
                },

                getUserName: () => {
                    const user = get().user;
                    return user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : '';
                },

                getUserEmail: () => {
                    return get().user?.email || '';
                },

                getUserRole: () => {
                    return get().user?.role || null;
                },

                isOwner: () => {
                    return get().user?.role.code === 'owner';
                },

                isAdmin: () => {
                    return get().user?.role.code === 'administrator';
                },

                isStaff: () => {
                    return get().user?.role.code === 'moderator';
                },

                isMember: () => {
                    return get().user?.role.code === 'member';
                },

                getAccessToken: () => {
                    return get().accessToken;
                },

                getRefreshToken: () => {
                    return get().refreshToken;
                },

                getAccessExpiresAt: () => {
                    return get().accessExpiresAt;
                },

                getRefreshExpiresAt: () => {
                    return get().refreshExpiresAt;
                }
            }),
            {
                name: 'auth-storage',

                partialize: (state) => ({
                    user: state.user,
                    accessToken: state.accessToken,
                    refreshToken: state.refreshToken,
                    accessExpiresAt: state.accessExpiresAt,
                    refreshExpiresAt: state.refreshExpiresAt
                }),

                onRehydrateStorage: () => (state) => {
                    if (state) {
                        state.loadUser();
                    }
                }
            }
        ),
        {
            name: 'auth-store'
        }
    )
);

// Hook personnalisé pour l'initialisation (équivalent à l'auto-chargement de Pinia)
export const useAuthInit = () => {
  const loadUser = useAuth((state) => state.loadUser);
  
  // Charger l'utilisateur au premier rendu
  useEffect(() => {
    loadUser();
  }, [loadUser]);
};

// Hook personnalisé pour récupérer seulement les actions d'auth
export const useAuthActions = () => {
  const login = useAuth((state) => state.login);
  const register = useAuth((state) => state.register);
  const logout = useAuth((state) => state.logout);
  const updateProfile = useAuth((state) => state.updateProfile);
  const refreshProfile = useAuth((state) => state.refreshProfile);
  
  return {
    login,
    register,
    logout,
    updateProfile,
    refreshProfile
  };
};

// Hook personnalisé pour récupérer seulement l'état d'auth
export const useAuthState = () => {
  const user = useAuth((state) => state.user);
  const isLoading = useAuth((state) => state.isLoading);
  const isAuthenticated = useAuth((state) => state.isAuthenticated());
  const getUserName = useAuth((state) => state.getUserName);
  const getUserEmail = useAuth((state) => state.getUserEmail);
  const getUserRole = useAuth((state) => state.getUserRole);
  const isOwner = useAuth((state) => state.isOwner);
  const isAdmin = useAuth((state) => state.isAdmin);
  const isStaff = useAuth((state) => state.isStaff);
  const isMember = useAuth((state) => state.isMember);
  
  return {
    user,
    isLoading,
    isAuthenticated,
    userName: getUserName(),
    userEmail: getUserEmail(),
    userRole: getUserRole(),
    isAdmin: isAdmin(),
    isOwner: isOwner(),
    isStaff: isStaff(),
    isMember: isMember()
  };
};
export const useAuthUser = () => useAuth((state) => state.user);
export const useIsAuthenticated = () => useAuth((state) => state.isAuthenticated());
export const useUserRole = () => useAuth((state) => state.getUserRole());

// Support HMR pour Vite (équivalent au HMR de Pinia)
if (import.meta.hot) {
  import.meta.hot.accept();
}