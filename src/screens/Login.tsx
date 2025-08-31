import React from 'react';
import { View, StatusBar } from 'react-native';
import {
    Surface,
    Text,
    Provider as PaperProvider,
    Button,
    ActivityIndicator,
    IconButton,
    useTheme,
} from 'react-native-paper';
import { useAuth } from '../context/authContext';
import { LoginStyles as styles } from '../styles/loginStyles';


const Login = () => {
    const theme = useTheme();
    const { signIn, isLoading, error, clearError } = useAuth();

    return (
        <PaperProvider theme={theme}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <View style={styles.container}>
                <Surface style={styles.surface} elevation={4}>
                    <View style={styles.logoWrapper}>
                        <IconButton
                            icon="printer"
                            size={64}
                            iconColor={theme.colors.primary}
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

export default Login;
