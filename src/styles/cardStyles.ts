import { StyleSheet } from "react-native";

export const CardStyles = StyleSheet.create({
    card: {
        marginBottom: 16,
    },
    cardContent: {
        paddingVertical: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    cardTitleSection: {
        flex: 1,
        marginRight: 16,
    },
    printName: {
        fontWeight: '600',
        marginBottom: 4,
    },
    printDescription: {
        opacity: 0.7,
        lineHeight: 18,
    },
    statusSection: {
        alignItems: 'center',
    },
    statusIndicator: {
        borderRadius: 20,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusIcon: {
        margin: 0,
    },
    divider: {
        marginVertical: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 8,
    },
    amountSection: {
        flex: 1,
    },
    amountLabel: {
        opacity: 0.6,
        marginBottom: 2,
    },
    printAmount: {
        fontWeight: '600',
        fontSize: 16,
    },
    dateSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    dateLabel: {
        opacity: 0.6,
    },
})