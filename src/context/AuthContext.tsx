import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { GoogleSignin,  } from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain';

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

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const clearError = useCallback(() => {
        setError(null);
    }, []);


 const saveIdToken = async (idToken: string) => {
        try {
           await Keychain.setGenericPassword('googleUser', idToken, {
                accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
                service: 'com.myapp.idToken', 
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

    const signIn = useCallback(async (): Promise<GoogleUser | null> => {
        try {
            setError(null);
            setIsLoading(true);
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

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

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error(
            'useAuth must be used within an AuthProvider. ' +
            'Make sure your component is wrapped with AuthProvider.'
        );
    }

    return context;
};

export { AuthContext };