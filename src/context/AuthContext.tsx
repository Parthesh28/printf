import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

// Define types for type safety
interface User {
    id: string;
    email: string;
    name?: string;
    photo?: string;
    idToken?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: () => Promise<User>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook for accessing auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Initialize Google Sign-In configuration (called once)
const configureGoogleSignin = () => {
    GoogleSignin.configure({
        webClientId: process.env.GOOGLE_WEB_CLIENT_ID || '',
        offlineAccess: true,
        iosClientId: process.env.GOOGLE_IOS_CLIENT_ID || '',
        forceCodeForRefreshToken: true, // Ensures we can refresh tokens
    });
};

// Auth service for storage and token handling
class AuthService {
    static USER_KEY = 'auth_user';
    static TOKEN_KEY = 'auth_token';

    static async saveUser(user: User): Promise<void> {
        try {
            // Store non-sensitive data in AsyncStorage
            await AsyncStorage.setItem(this.USER_KEY, JSON.stringify({
                id: user.id,
                email: user.email,
                name: user.name,
                photo: user.photo,
            }));

            // Store sensitive token in Keychain
            if (user.idToken) {
                await Keychain.setGenericPassword(this.TOKEN_KEY, user.idToken, {
                    service: this.TOKEN_KEY,
                    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE, // Enhanced security
                });
            }
        } catch (error) {
            console.error('Failed to save user data:', error);
            throw new Error('Failed to save user data');
        }
    }

    static async getUser(): Promise<User | null> {
        try {
            const userData = await AsyncStorage.getItem(this.USER_KEY);
            if (!userData) return null;

            const user = JSON.parse(userData);

            // Get token from keychain
            const credentials = await Keychain.getGenericPassword({ service: this.TOKEN_KEY });

            return {
                ...user,
                idToken: credentials ? credentials.password : undefined,
            };
        } catch (error) {
            console.error('Failed to get user data:', error);
            return null;
        }
    }

    static async clearUser(): Promise<void> {
        try {
            await Promise.all([
                AsyncStorage.removeItem(this.USER_KEY),
                Keychain.resetGenericPassword({ service: this.TOKEN_KEY })
            ]);
        } catch (error) {
            console.error('Failed to clear user data:', error);
            // Don't throw here - clearing should always succeed
        }
    }

    static async validateToken(token: string): Promise<boolean> {
        try {
            // Example validation with Google's tokeninfo endpoint
            const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
            const tokenInfo = await response.json();

            if (response.ok && tokenInfo.aud === process.env.GOOGLE_WEB_CLIENT_ID) {
                // Check if token is not expired
                const currentTime = Math.floor(Date.now() / 1000);
                return tokenInfo.exp > currentTime;
            }
            return false;
        } catch (error) {
            console.error('Token validation failed:', error);
            return false;
        }
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Clear error after some time
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Initialize auth
    const initializeAuth = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            configureGoogleSignin();

            const storedUser = await AuthService.getUser();
            if (storedUser?.idToken) {
                const isValid = await AuthService.validateToken(storedUser.idToken);
                if (isValid) {
                    setUser(storedUser);
                } else {
                    await AuthService.clearUser();
                }
            }
        } catch (error) {
            console.error('Auth initialization failed:', error);
            setError('Failed to initialize authentication');
            await AuthService.clearUser();
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    const login = useCallback(async (): Promise<User> => {
        try {
            setIsLoading(true);
            setError(null);

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const data = userInfo.data; 

            const user : User = {
                id: data?.idToken
                email: userInfo.user.email,
                name: userInfo.user.name || undefined,
                photo: userInfo.user.photo || undefined,
                idToken: userInfo.idToken || undefined,
            };

            await AuthService.saveUser(user);
            setUser(user);
            return user;
        } catch (error: any) {
            let errorMessage = 'Login failed';

            // Handle specific Google Sign-In errors
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                errorMessage = 'Sign in was cancelled';
            } else if (error.code === statusCodes.IN_PROGRESS) {
                errorMessage = 'Sign in is in progress';
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                errorMessage = 'Play Services not available';
            }

            console.error('Login failed:', error);
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);

            await GoogleSignin.signOut();
            await AuthService.clearUser();
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
            setError('Logout failed');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refreshToken = useCallback(async (): Promise<void> => {
        if (!user) return;

        try {
            setIsLoading(true);
            const tokens = await GoogleSignin.getTokens();

            const updatedUser: User = {
                ...user,
                idToken: tokens.idToken,
            };

            await AuthService.saveUser(updatedUser);
            setUser(updatedUser);
        } catch (error) {
            console.error('Token refresh failed:', error);
            setError('Failed to refresh token');
            await logout();
        } finally {
            setIsLoading(false);
        }
    }, [user, logout]);

    const contextValue: AuthContextType = {
        user,
        isLoading,
        error,
        login,
        logout,
        refreshToken,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};