import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
const theme = useTheme();

export const LoginStyles = StyleSheet.create({
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
})