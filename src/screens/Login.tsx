import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import {
    Surface,
    Text,
    Provider as PaperProvider,
    MD3LightTheme,
    Button,
    ActivityIndicator,
} from 'react-native-paper';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useAuth } from '../context/authContext';

const theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#6750A4',
        primaryContainer: '#EADDFF',
        surface: '#FFFBFE',
        surfaceVariant: '#F7F2FA',
        outline: '#79747E',
        outlineVariant: '#CAC4D0',
    },
};

const Login = () => {
    const { signIn, isLoading, error, clearError } = useAuth();

    return (
        <PaperProvider theme={theme}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <View style={styles.container}>
                <Surface style={styles.surface} elevation={4}>
                    <View style={styles.logoWrapper}>
                        <MaterialDesignIcons
                            name="printer"
                            size={64}
                            color={theme.colors.primary}
                        />
                    </View>

                    <Text variant="headlineLarge" style={styles.title}>
                        PrintF
                    </Text>

                    <Text variant="bodyMedium" style={styles.subtitle}>
                        Printing made easy
                    </Text>

                    {/* Show error if any */}
                    {error ? (
                        <Text variant="bodySmall" style={styles.error} onPress={clearError}>
                            {error}
                        </Text>
                    ) : null}

                    {/* Show loader while signing in */}
                    {isLoading ? (
                        <ActivityIndicator animating size="large" style={{ marginVertical: 20 }} />
                    ) : (
                        <Button
                            mode="contained"
                            icon="google"
                            style={styles.button}
                            contentStyle={{ height: 50 }}
                            onPress={signIn}
                        >
                            Sign in with Google
                        </Button>
                    )}
                </Surface>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surfaceVariant,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    surface: {
        width: '100%',
        maxWidth: 380,
        borderRadius: 28,
        paddingVertical: 48,
        paddingHorizontal: 32,
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
    },
    logoWrapper: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: theme.colors.primaryContainer,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 28,
    },
    title: {
        fontWeight: '700',
        color: '#1D1B20',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        color: '#49454F',
        opacity: 0.9,
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        borderRadius: 12,
        width: '100%',
        maxWidth: 280,
    },
    error: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Login;
