import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

const Details = ({ navigation, route }) => {
    const { printData } = route.params;
    const theme = useTheme();
    const insets = useSafeAreaInsets();

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

    const styles = StyleSheet.create({
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
        // Amount
        // Removed - now in header
    });

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