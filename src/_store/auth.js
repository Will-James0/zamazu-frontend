import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { 
    loginMember,
    loginStaff,
    registerUser,
    logoutUser, 
    fetchUserProfile, 
    updateUserProfile 
 } from '../libs/authervice.js'

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

                loadUser: () => {
                    const userData = Cookies.get('auth');
                    const accessToken = Cookies.get('access_token');
                    const refreshToken = Cookies.get('refresh_token');

                    if (userData && accessToken) {
                        try {
                            const user = JSON.parse(userData);
                            set({
                                user,
                                accessToken,
                                refreshToken
                            }, false, 'loadUser');
                        } catch (error) {
                          console.error('Erreur lors du chargement de l\'utilisateur:', error);
                          get().clearUser();
                        }
                    }
                },

                setUser: (userData, tokens = {}) => {
                    const { accessToken, refreshToken } = tokens;

                    set({
                        user: userData,
                        accessToken: accessToken || get().accessToken,
                        refreshToken: refreshToken || get().refreshToken
                    }, false, 'setUser');

                    // Stockage sécurisé
                    Cookies.set('auth', JSON.stringify(userData), { 
                        expires: 1, 
                        secure: true,
                        sameSite: 'strict'
                    });
                    
                    if (accessToken) {
                        Cookies.set('access_token', accessToken, {
                        expires: 1,
                        secure: true,
                        sameSite: 'strict'
                        });
                    }
                    
                    if (refreshToken) {
                        Cookies.set('refresh_token', refreshToken, {
                        expires: 7, // Refresh token plus long
                        secure: true,
                        sameSite: 'strict'
                        });
                    }
                },

                getUser: () => {
                    return get().user;
                },

                clearUser: () => {
                    set({ 
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        dispensary: null
                    }, false, 'clearUser');
                    
                    Cookies.remove('auth');
                    Cookies.remove('access_token');
                    Cookies.remove('refresh_token');
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
                            refreshToken: token.refresh
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
                        
                        const updatedUser = await updateUserProfile(profileData);
                        
                        // Mise à jour locale
                        set(state => ({
                            user: { ...state.user, ...updatedUser }
                        }), false, 'update-profile');
                        
                        // Mise à jour des cookies
                        const newUserData = { ...get().user, ...updatedUser };
                        Cookies.set('auth', JSON.stringify(newUserData), { 
                        expires: 1, 
                        secure: true,
                        sameSite: 'strict'
                        });
                        
                        return updatedUser;
                    } finally {
                        set({ isLoading: false }, false, 'update-profile-end');
                    }
                },

                refreshProfile: async () => {
                    try {
                        const profile = await fetchUserProfile();
                        
                        set({ user: profile }, false, 'refresh-profile');
                        
                        Cookies.set('auth', JSON.stringify(profile), { 
                        expires: 1, 
                        secure: true,
                        sameSite: 'strict'
                        });
                        
                        return profile;
                    } catch (error) {
                        // Si le profil ne peut pas être chargé, déconnecter
                        get().clearUser();
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
                    return get().user?.role.code === 'admin';
                },

                isStaff: () => {
                    return get().user?.role.code === 'staff';
                },

                isMember: () => {
                    return get().user?.role.code === 'member';
                },

                getAccessToken: () => {
                    return get().accessToken;
                },

                getRefreshToken: () => {
                    return get().refreshToken;
                }
            }),
            {
                name: 'auth-storage',

                partialize: (state) => ({
                    user: state.user,
                    accessToken: state.accessToken,
                    refreshToken: state.refreshToken
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