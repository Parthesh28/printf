import { StyleSheet, View } from "react-native";
import { Card, Divider, IconButton, Text, useTheme } from "react-native-paper";
import { NavigationProp } from '@react-navigation/native';
import { CardStyles as styles } from '../styles/cardStyles';

interface PrintJob {
    name: string
    description: string;
    amount: number;
    status: string;
    createdAt: Date;
    id: string;
    isLandscape: boolean;
    isColor: boolean;
    copies: number;
    paperFormat: string;
    file: string[];
}

const PrintCard = ({ navigation, item }: { navigation: NavigationProp<any>; item: PrintJob }) => {
    const theme = useTheme();

    const handlePrintJobPress = (printJob: PrintJob) => {
        navigation.navigate('Details', { printData: printJob });
    };

    const getStatusColor = (status: PrintJob['status']) => {
        switch (status) {
            case 'pending':
                return '#FF9800';
            case 'processing':
                return '#2196F3';
            case 'completed':
                return '#4CAF50';
            case 'cancelled':
                return '#F44336';
            default:
                return theme.colors.outline;
        }
    };

    const getStatusIcon = (status: PrintJob['status']) => {
        switch (status) {
            case 'pending':
                return 'clock-outline';
            case 'processing':
                return 'printer';
            case 'completed':
                return 'check-circle';
            case 'cancelled':
                return 'alert-circle';
            default:
                return 'help-circle';
        }
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Today';
        if (diffDays === 2) return 'Yesterday';
        return `${diffDays - 1} days ago`;
    };

    return (
        <Card
            style={styles.card}
            onPress={() => handlePrintJobPress(item)}
            mode="elevated"
        >
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardTitleSection}>
                        <Text variant="titleMedium" style={styles.printName}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={styles.statusSection}>
                        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]}>
                            <IconButton
                                icon={getStatusIcon(item.status)}
                                size={16}
                                iconColor="white"
                                style={styles.statusIcon}
                            />
                        </View>
                    </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.cardFooter}>
                    <View style={styles.amountSection}>
                        <Text variant="bodySmall" style={styles.amountLabel}>
                            Amount
                        </Text>
                        <Text variant="titleSmall" style={styles.printAmount}>
                            ₹{item.amount}
                        </Text>
                    </View>

                    <View style={styles.dateSection}>
                        <Text variant="bodySmall" style={styles.dateLabel}>
                            {formatDate(item.createdAt)}
                        </Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}

export default PrintCard