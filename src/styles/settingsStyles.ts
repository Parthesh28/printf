import { StyleSheet } from "react-native";

export const SettingsStyles = StyleSheet.create({
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