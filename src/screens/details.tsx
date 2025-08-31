import React from 'react';
import {
    View,
    ScrollView,
    StatusBar,
} from 'react-native';
import {
    Card,
    Text,
    IconButton,
    Chip,
    Surface,
    useTheme,
    Button,
    Divider,
    List,
} from 'react-native-paper';
import { DetailsStyles as styles } from '../styles/detailsStyles';

const Details = ({ navigation, route }) => {
    const { printData } = route.params;
    const theme = useTheme();


    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return {
                    background: theme.colors.secondaryContainer,
                    text: theme.colors.onSecondaryContainer,
                    icon: 'clock-outline'
                };
            case 'processing':
                return {
                    background: theme.colors.tertiaryContainer,
                    text: theme.colors.onTertiaryContainer,
                    icon: 'printer'
                };
            case 'completed':
                return {
                    background: theme.colors.primaryContainer,
                    text: theme.colors.onPrimaryContainer,
                    icon: 'check-circle'
                };
            case 'cancelled':
                return {
                    background: theme.colors.errorContainer,
                    text: theme.colors.onErrorContainer,
                    icon: 'close-circle'
                };
            default:
                return {
                    background: theme.colors.surfaceVariant,
                    text: theme.colors.onSurfaceVariant,
                    icon: 'help-circle'
                };
        }
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const statusInfo = getStatusColor(printData.status);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <IconButton
                        icon="arrow-left"
                        size={20}
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerTitle}>Print Details</Text>
                </View>
            </View>

            {/* Header */}
            <View style={styles.headerX}>

                <View style={styles.titleSection}>
                    <Text style={styles.title} numberOfLines={2}>
                        {printData.name}
                    </Text>
                    <Text style={styles.printId}>#{printData.id}</Text>
                </View>

                <View style={styles.metaInfo}>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>Status</Text>
                        <View style={[styles.statusDot, { backgroundColor: statusInfo.background }]}>
                            <Text style={[styles.statusText, { color: statusInfo.text }]}>
                                {printData.status}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>Created</Text>
                        <Text style={styles.metaValue}>{formatDate(printData.createdAt)}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>Amount</Text>
                        <Text style={styles.totalAmount}>₹{printData.amount.toLocaleString()}</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>

                    {/* Print Specifications */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Specifications</Text>
                        <Card style={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.specsGrid}>
                                    <View style={styles.specItem}>
                                        <IconButton
                                            icon={printData.isLandscape ? "phone-rotate-landscape" : "phone-rotate-portrait"}
                                            size={16}
                                            style={styles.specIcon}
                                        />
                                        <Text style={styles.specText}>
                                            {printData.isLandscape ? 'Landscape' : 'Portrait'}
                                        </Text>
                                    </View>

                                    <View style={styles.specItem}>
                                        <IconButton
                                            icon={printData.isColor ? "palette" : "palette-outline"}
                                            size={16}
                                            style={styles.specIcon}
                                        />
                                        <Text style={styles.specText}>
                                            {printData.isColor ? 'Color' : 'Black & White'}
                                        </Text>
                                    </View>

                                    <View style={styles.specItem}>
                                        <IconButton
                                            icon="file-outline"
                                            size={16}
                                            style={styles.specIcon}
                                        />
                                        <Text style={styles.specText}>
                                            {printData.paperFormat.toUpperCase()} Paper
                                        </Text>
                                    </View>

                                    <View style={styles.specItem}>
                                        <IconButton
                                            icon="content-copy"
                                            size={16}
                                            style={styles.specIcon}
                                        />
                                        <Text style={styles.specText}>
                                            {printData.copies} {printData.copies === 1 ? 'Copy' : 'Copies'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    </View>

                    {/* Files */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Documents ({printData.file?.length || 0})</Text>
                        <Card style={styles.card}>
                            <View style={styles.cardContent}>
                                {printData.file?.map((fileName, index) => (
                                    <View key={index} style={styles.fileItem}>
                                        <IconButton
                                            icon="file-pdf-box"
                                            size={20}
                                            iconColor={theme.colors.error}
                                            style={styles.fileIcon}
                                        />
                                        <Text style={styles.fileName}>{fileName}</Text>
                                        <Text style={styles.fileSize}>2.4 MB</Text>
                                    </View>
                                ))}
                            </View>
                        </Card>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

export default Details;