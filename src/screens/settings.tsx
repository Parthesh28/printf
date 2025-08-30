import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Appbar,
  Text,
  Switch,
  useTheme,
  Avatar,
  Icon,
  Divider,
} from 'react-native-paper';
import { useAuth } from '../context/authContext';

const SettingsScreen = ({ navigation }) => {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('system');
  const theme = useTheme();
  const { signOut, clearIdToken} = useAuth();

  // Mock user data
  const user = {
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1ef?w=150&h=150&fit=crop&crop=face'
  };

  const handleGoBack = () => {
    // Navigate back to home or previous screen
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Navigate back to home');
    }
  };

  const handleSignOut = () => {
  try {
    signOut();
    clearIdToken();
  } catch (error) {
    console.log(error)
  }
  };

  const themeOptions = [
    { id: 'system', label: 'System', icon: 'theme-light-dark' },
    { id: 'light', label: 'Light', icon: 'white-balance-sunny' },
    { id: 'dark', label: 'Dark', icon: 'weather-night' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header mode="small" elevated={false}>
        <Appbar.BackAction onPress={handleGoBack} />
        <Appbar.Content title="Settings" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Avatar.Image
              size={72}
              source={{ uri: user.avatar }}
            />
            <View style={styles.profileInfo}>
              <Text variant="headlineSmall" style={[styles.profileName, { color: theme.colors.onSurface }]}>
                {user.name}
              </Text>
              <Text variant="bodyMedium" style={[styles.profileEmail, { color: theme.colors.onSurfaceVariant }]}>
                {user.email}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.signOutRow}
            onPress={handleSignOut}
            activeOpacity={0.6}
          >
            <Icon
              source="logout"
              size={20}
              color={theme.colors.error}
            />
            <Text
              variant="bodyLarge"
              style={[styles.signOutText, { color: theme.colors.error }]}
            >
              Sign Out
            </Text>
            <Icon
              source="chevron-right"
              size={20}
              color={theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        </View>

        <Divider style={[styles.mainDivider, { backgroundColor: theme.colors.outlineVariant }]} />

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Appearance
          </Text>

          <View style={styles.settingGroup}>
            <Text variant="bodyLarge" style={[styles.settingTitle, { color: theme.colors.onSurface }]}>
              Theme
            </Text>
            <Text variant="bodySmall" style={[styles.settingSubtitle, { color: theme.colors.onSurfaceVariant }]}>
              Choose how the app looks
            </Text>

            <View style={styles.themeGrid}>
              {themeOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.themeOption,
                    {
                      backgroundColor: selectedTheme === option.id
                        ? theme.colors.primaryContainer
                        : theme.colors.surfaceVariant,
                      borderColor: selectedTheme === option.id
                        ? theme.colors.primary
                        : 'transparent',
                    }
                  ]}
                  onPress={() => setSelectedTheme(option.id)}
                  activeOpacity={0.7}
                >
                  <Icon
                    source={option.icon}
                    size={28}
                    color={selectedTheme === option.id ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant}
                  />
                  <Text
                    variant="labelLarge"
                    style={[
                      styles.themeLabel,
                      { color: selectedTheme === option.id ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant }
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <Divider style={[styles.sectionDivider, { backgroundColor: theme.colors.outlineVariant }]} />

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Notifications
          </Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text variant="bodyLarge" style={[styles.settingTitle, { color: theme.colors.onSurface }]}>
                Push Notifications
              </Text>
              <Text variant="bodySmall" style={[styles.settingSubtitle, { color: theme.colors.onSurfaceVariant }]}>
                Receive important updates and alerts
              </Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Profile Section
  profileSection: {
    paddingVertical: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  profileName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    opacity: 0.8,
  },
  signOutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    gap: 12,
  },
  signOutText: {
    flex: 1,
    fontWeight: '500',
  },

  // Dividers
  mainDivider: {
    height: 1,
    opacity: 0.5,
  },
  sectionDivider: {
    height: 1,
    opacity: 0.3,
    marginVertical: 8,
  },

  // Sections
  section: {
    paddingVertical: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 20,
    paddingHorizontal: 4,
  },

  // Setting Groups
  settingGroup: {
    marginBottom: 8,
  },
  settingTitle: {
    fontWeight: '500',
    marginBottom: 4,
  },
  settingSubtitle: {
    opacity: 0.8,
    marginBottom: 20,
  },

  // Theme Options
  themeGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    minHeight: 100,
  },
  themeLabel: {
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Settings Row
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
});

export default SettingsScreen;