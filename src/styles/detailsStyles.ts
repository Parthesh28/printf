import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const theme = useTheme();
const insets = useSafeAreaInsets();

export const DetailsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        paddingTop: insets.top + 16,
        paddingBottom: 20,
        paddingHorizontal: 20,
        elevation: 1,
    },
    headerX: {
        paddingTop: 16,
        paddingBottom: 20,
        paddingHorizontal: 20,
        elevation: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginLeft: -8,
        marginRight: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.onSurface,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 16,
    },
    titleSection: {
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: theme.colors.onSurface,
        marginBottom: 4,
        lineHeight: 28,
    },
    printId: {
        fontSize: 12,
        color: theme.colors.onSurfaceVariant,
        fontFamily: 'monospace',
    },
    metaInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    metaItem: {
        alignItems: 'center',
    },
    metaLabel: {
        fontSize: 11,
        color: theme.colors.onSurfaceVariant,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    metaValue: {
        fontSize: 13,
        fontWeight: '500',
        color: theme.colors.onSurface,
    },
    statusDot: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.primary,
    },
    content: {
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.onSurface,
        marginBottom: 12,
    },
    card: {
        borderRadius: 12,
        elevation: 1,
    },
    cardContent: {
        padding: 16,
    },
    // Specifications
    specsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    specItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surfaceVariant,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        minWidth: '47%',
    },
    specIcon: {
        marginRight: 8,
    },
    specText: {
        fontSize: 13,
        fontWeight: '500',
        color: theme.colors.onSurfaceVariant,
    },
    // Files
    fileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: 8,
        marginBottom: 8,
    },
    fileIcon: {
        marginRight: 12,
    },
    fileName: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.onSurface,
        flex: 1,
    },
    fileSize: {
        fontSize: 12,
        color: theme.colors.onSurfaceVariant,
    },
});