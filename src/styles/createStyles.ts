import { StyleSheet } from "react-native";
import { MD3Theme} from "react-native-paper";

export const createNewStyles = (theme: MD3Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.surface,
    },
    content: {
        paddingBottom: 120,
    },

    // --- Sections ---
    sectionContainer: {
        padding: 20,
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionHeaderText: {
        ...(theme.fonts.titleMedium),
        marginLeft: 12,
        color: theme.colors.onSurface,
    },
    separator: {
        // Simple, clean divider
    },

    // --- Document Selector ---
    fileSelectorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: theme.colors.outline,
        borderRadius: 12,
    },
    hubText: { ...(theme.fonts.titleMedium   ) },

    // --- Selected Document Display ---
    selectedFileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: 12,
    },
    fileIcon: { margin: 0, marginRight: 8 },
    fileInfo: { flex: 1 },
    fileName: { ...(theme.fonts.bodyLarge), fontWeight: 'bold' },
    fileDetails: { ...(theme.fonts.bodySmall ), color: theme.colors.onSurfaceVariant },

    textInput: {
        marginTop: 16,
        backgroundColor: theme.colors.surface,
    },

    // --- Accordion Styles ---
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    accordionTitle: {
        ...(theme.fonts.titleMedium   ),
        marginLeft: 12,
        color: theme.colors.onSurface,
    },
    accordionContent: {
        paddingTop: 8,
    },

    // --- Inline Controls ---
    inlineSegmentedButtons: {
        height: 40,
        minWidth: 220,
    },
    inlineInput: {
        width: 80,
        height: 40,
        textAlign: 'center',
    },
    inlineInputFull: {
        width: 150,
        height: 40,
    },

    // --- Stepper Input ---
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: theme.colors.surface,
        borderRadius: 20, // Fully rounded corners for pill shape
        borderWidth: 1,
        borderColor: theme.colors.outline,
        height: 40,
    },
    stepperButton: {
        margin: 0,
        height: 40,
        width: 40,
    },
    stepperValue: {
        ...(theme.fonts.bodyLarge),
        textAlign: 'center',
        minWidth: 30, // Ensure text doesn't jump around
        paddingHorizontal: 8,
        color: theme.colors.onSurface,
    },

    // --- Bottom Bar ---
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        paddingBottom: 24,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.outlineVariant,
    },
    proceedButton: {
        paddingVertical: 6,
        borderRadius: 30,
    },
    proceedButtonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});