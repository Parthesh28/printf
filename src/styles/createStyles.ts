import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const createNewStyles = (theme: MD3Theme) => StyleSheet.create({
    // --- Main Layout ---
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: 16,
        paddingBottom: 100,
    },

    // --- Document Hub ---
    documentHub: {
        borderRadius: 20,
        backgroundColor: theme.colors.surfaceVariant,
        marginBottom: 24,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hubText: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.onSurfaceVariant,
        marginTop: 12,
        marginBottom: 4,
    },
    hubSubtext: {
        color: theme.colors.onSurfaceVariant,
        marginBottom: 16,
    },
    selectedFileCard: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileInfo: {
        flex: 1,
        marginLeft: 16,
    },
    fileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.onSurfaceVariant,
        marginBottom: 4,
    },
    fileDetails: {
        fontSize: 14,
        color: theme.colors.onSurfaceVariant,
    },

    // --- Accordion & List Items ---
    accordionGroup: {
        borderRadius: 20,
        backgroundColor: theme.colors.surface,
        overflow: 'hidden',
    },
    accordion: {
        backgroundColor: theme.colors.surface,
        paddingVertical: 4,
    },
    accordionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    listItem: {
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listItemTitle: {
        fontSize: 15,
        fontWeight: '500',
        flexShrink: 1,
        marginRight: 8,
    },
    divider: {
        backgroundColor: theme.colors.surfaceVariant,
    },

    // --- UPDATED: Polished Inline Controls ---
    inlineSegmentedButtons: {
        height: 40,
        width: 190,
    },
    inlineInput: {
        width: 90, // Adjusted width for outlined style
        height: 40, // Compact height
        textAlign: 'center',
    },
    inlineInputFull: {
        flex: 1,
        height: 40,
        marginLeft: 16,
    },

    // --- Floating Action Button ---
    fab: {
        position: 'absolute',
        margin: 16,
        right: 5,
        bottom: 50,
    },
});