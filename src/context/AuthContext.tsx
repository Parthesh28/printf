import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { GoogleSignin,  } from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain';

// Type definitions
interface GoogleUser {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
}

interface UserInfo {
    user: GoogleUser;
    scopes: string[];
    idToken: string | null;
    serverAuthCode: string | null;
}

interface AuthContextType {
    user: UserInfo | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;
    signIn: () => Promise<GoogleUser | null>;
    saveIdToken: (idToken : string) => Promise<void>;
    loadIdToken: () => Promise<string | null>;
    clearIdToken: () => Promise<void>;
    signOut: () => Promise<void>;
    clearError: () => void;
}

// Context with proper error handling for usage outside provider
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Clear error function
    const clearError = useCallback(() => {
        setError(null);
    }, []);


 const saveIdToken = async (idToken: string) => {
        try {
           await Keychain.setGenericPassword('googleUser', idToken, {
                accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
                service: 'com.myapp.idToken', // unique service name
            });
        } catch (err) {
            console.error('Failed to save idToken:', err);
        }
    };

 const loadIdToken = async (): Promise<string | null> => {
        try {
            const creds = await Keychain.getGenericPassword({
                service: 'com.myapp.idToken',
            });
            return creds ? creds.password : null;
        } catch (err) {
            console.error('Failed to load idToken:', err);
            return null;
        }
    };

    const clearIdToken = async () => {
        await Keychain.resetGenericPassword({ service: 'com.myapp.idToken' });
    };

    // Check for existing signed-in user on app start
    useEffect(() => {
        const checkSignedInUser = async () => {
            try {
                setError(null);
                const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();

                if (hasPreviousSignIn) {
                    const userInfo = await GoogleSignin.signInSilently();

                    if (userInfo) {
                        setUser(userInfo.data);
                        setIsLoggedIn(true);
                    }

                    if (userInfo.data?.idToken) {
                        await saveIdToken(userInfo.data?.idToken);
                    }
                }

            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to check signed-in user';
                setError(errorMessage);
                console.error('Error checking signed-in user:', err);
            } finally {
                setIsLoading(false);
            }
        };

        checkSignedInUser();
    }, []);

    // Sign in function with proper error handling and type safety
    const signIn = useCallback(async (): Promise<GoogleUser | null> => {
        try {
            setError(null);
            setIsLoading(true);
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            // Validate response structure
            if (!userInfo?.data?.user) {
                throw new Error('Invalid sign-in response from Google');
            }

            setUser(userInfo.data);
            setIsLoggedIn(true);

            if (userInfo.data.idToken) {
                await saveIdToken(userInfo.data.idToken);
            }

            return userInfo.data.user;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Google Sign-In failed';
            setError(errorMessage);
            console.error('Google Sign-In error:', err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Sign out function with proper cleanup
    const signOut = useCallback(async (): Promise<void> => {
        try {
            setError(null);
            setIsLoading(true);

            await GoogleSignin.signOut();
            setUser(null);
            setIsLoggedIn(false);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Google Sign-Out failed';
            setError(errorMessage);
            console.error('Google Sign-Out error:', err);

            // Even if sign-out fails, clear local state
            setUser(null);
            setIsLoggedIn(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const contextValue: AuthContextType = {
        user,
        isLoggedIn,
        isLoading,
        error,
        saveIdToken,
        loadIdToken,
        clearIdToken,
        signIn,
        signOut,
        clearError,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook with proper error handling for usage outside provider
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error(
            'useAuth must be used within an AuthProvider. ' +
            'Make sure your component is wrapped with <AuthProvider>.'
        );
    }

    return context;
};

export { AuthContext };