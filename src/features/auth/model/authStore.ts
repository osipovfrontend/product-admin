import { create } from 'zustand'

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender?: string;
    image?: string;
}

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    rememberMe: boolean;
    isLoading: boolean;
    setAuth: (token: string, rememberMe: boolean, user: User) => void;
    logout: () => void;
    loadFromStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    isAuthenticated: false,
    user: null,
    rememberMe: false,
    isLoading: true,

    setAuth: (token, rememberMe, user) => {
        set({ token, isAuthenticated: true, user, rememberMe, isLoading: false })

        const authData = {
            token,
            isAuthenticated: true,
            user,
            rememberMe,
            timestamp: Date.now()
        }

        if (rememberMe) {
            localStorage.setItem('auth_data', JSON.stringify(authData))
        } else {
            sessionStorage.setItem('auth_data', JSON.stringify(authData))
        }
    },

    logout: () => {
        set({ token: null, isAuthenticated: false, user: null, rememberMe: false, isLoading: false })

        localStorage.removeItem('auth_data')
        sessionStorage.removeItem('auth_data')
    },

    loadFromStorage: async () => {
        await new Promise(resolve => setTimeout(resolve, 50))

        const localData = localStorage.getItem('auth_data')
        if (localData) {
            try {
                const parsed = JSON.parse(localData)

                const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000
                if (!isExpired) {
                    set({
                        token: parsed.token,
                        isAuthenticated: true,
                        user: parsed.user,
                        rememberMe: true,
                        isLoading: false
                    })
                    return
                } else {
                    localStorage.removeItem('auth_data')
                }
            } catch (error) {
                localStorage.removeItem('auth_data')
            }
        }

        const sessionData = sessionStorage.getItem('auth_data')
        if (sessionData) {
            try {
                const parsed = JSON.parse(sessionData)
                set({
                    token: parsed.token,
                    isAuthenticated: true,
                    user: parsed.user,
                    rememberMe: false,
                    isLoading: false
                })
                return
            } catch (error) {
                sessionStorage.removeItem('auth_data')
            }
        }
        set({ isLoading: false })
    },
}))