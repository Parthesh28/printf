import React from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import {
  Surface,
  Text,
  Provider as PaperProvider,
  MD3LightTheme,
  Button,
} from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

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

GoogleSignin.configure({
  webClientId:
    '5347000708-huid8jinh9am79lkn3fvuf8ddisdconv.apps.googleusercontent.com',
  offlineAccess: true,
});

const LoginScreen = () => {
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens();
      return userInfo;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      <View style={styles.container}>
        <Surface style={styles.surface} elevation={3}>
          <View style={styles.logoWrapper}>
            <MaterialDesignIcons
              name="printer"
              size={64}
              color={theme.colors.primary}
            />
          </View>

          {/* Header */}
          <Text variant="headlineLarge" style={styles.title}>
            Welcome to PrintF
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Continue to google
          </Text>

          {/* Google Sign-In Button (Paper only) */}
          <Button
            mode="contained"
            icon={'google'}
            onPress={onGoogleButtonPress}
          >
            Sign in with Google
          </Button>
        </Surface>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  surface: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 28,
    paddingVertical: 40,
    paddingHorizontal: 28,
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
    marginBottom: 24,
  },
  title: {
    fontWeight: '700',
    color: '#1D1B20',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    color: '#49454F',
    opacity: 0.9,
    marginBottom: 36,
    textAlign: 'center',
  },
});

export default LoginScreen;
