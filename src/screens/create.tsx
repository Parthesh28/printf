import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    StatusBar,
} from 'react-native';
import {
    Text,
    TextInput,
    Button,
    SegmentedButtons,
    useTheme,
    Surface,
    IconButton,
    Card,
    Divider,
} from 'react-native-paper';
import { keepLocalCopy, pick, VirtualFileMeta, } from '@react-native-documents/picker';
import RazorpayCheckout from 'react-native-razorpay';
import { useFileUpload } from '../hooks/useQueries';
import { useAuth } from '../context/authContext';
import axios from 'axios';

interface PrintJob {
    name: string;
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

interface Filetype {
    uri: string;
    name: string | null;
    error: string | null;
    type: string | null;
    nativeType: string | null;
    size: number | null;
    isVirtual: boolean | null;
    convertibleToMimeTypes: VirtualFileMeta[] | null;
    hasRequestedType: boolean;
}

const Create = ({ navigation }: any) => {
    const { user } = useAuth()
    const theme = useTheme();
    const [formData, setFormData] = useState({
        printName: '',
        orientation: 'landscape',
        format: 'color',
        paper: 'A4',
        copies: '1',
        pagesToPrint: '',
        pagesPerSheet: '1',
    });
    const [selectedFile, setSelectedFile] = useState<Filetype | null>(null);
    const [printJob, setPrintJob] = useState<PrintJob | null>(null);

    // Calculate print job amount based on preferences
    const calculateAmount = () => {
        let basePrice = 5; // Base price per page
        if (formData.format === 'color') basePrice *= 2;
        if (formData.paper === 'A3') basePrice *= 1.5;
        return basePrice * parseInt(formData.copies || '1');
    };

    // Create print job object from current preferences
    const createPrintJob = (): PrintJob => {
        return {
            id: Date.now().toString(),
            name: formData.printName || 'Untitled Print',
            description: `${formData.format.toUpperCase()} print on ${formData.paper} paper`,
            amount: calculateAmount(),
            status: 'pending',
            createdAt: new Date(),
            isLandscape: formData.orientation === 'landscape',
            isColor: formData.format === 'color',
            copies: parseInt(formData.copies || '1'),
            paperFormat: formData.paper,
            file: selectedFile ? [selectedFile.uri] : [],
        };
    };

    const orientationOptions = [
        { value: 'landscape', label: 'Landscape', icon: 'phone-rotate-landscape' },
        { value: 'portrait', label: 'Portrait', icon: 'phone-rotate-portrait' },
    ];

    const formatOptions = [
        { value: 'bw', label: 'B/W', icon: 'palette-outline' },
        { value: 'color', label: 'Color', icon: 'palette' },
    ];

    const paperOptions = [
        { value: 'A3', label: 'A3' },
        { value: 'A4', label: 'A4' },
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        setTimeout(() => {
            setPrintJob(createPrintJob());
        }, 0);
    };
    const uploadMutation = useFileUpload();

    const handleFileUpload = async () => {
        try {
            const [pickResult] = await pick({
                mode: 'open',
                requestLongTermAccess: true,
            });

            setSelectedFile(pickResult);

            const values = {
                file: pickResult,
                authToken: user?.idToken
            }

            const response = await uploadMutation.mutateAsync(values);

            console.log(response);
        } catch (err) {
            console.error('File selection error:', err);
            Alert.alert('Error', 'Failed to select file.');
        }
    };

    const handleProceed = () => {
        // Validate required fields
        if (!formData.printName.trim()) {
            Alert.alert('Error', 'Please enter a print name');
            return;
        }

        if (!selectedFile) {
            Alert.alert('Error', 'Please select a file to print');
            return;
        }

        if (!formData.copies || parseInt(formData.copies) < 1) {
            Alert.alert('Error', 'Please enter a valid number of copies');
            return;
        }

        // Create final print job
        const finalPrintJob = createPrintJob();
        setPrintJob(finalPrintJob);

        // You can now pass the printJob to navigation or store it globally
        navigation.navigate("Summary", { finalPrintJob });
    };

    const getFileIcon = (type: string | null) => {
        if (type?.includes('pdf')) return 'file-pdf-box';
        if (type?.includes('image')) return 'file-image';
        return 'file-document';
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            paddingTop: StatusBar.currentHeight || 44, // Handle status bar
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
            paddingVertical: 12,
            backgroundColor: theme.colors.background,
        },
        headerTitle: {
            fontSize: 24,
            fontWeight: '600',
            color: theme.colors.onBackground,
            marginLeft: 8,
        },
        content: {
            flex: 1,
        },
        section: {
            marginBottom: 24,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.onBackground,
            marginBottom: 16,
            paddingHorizontal: 20,
        },
        card: {
            marginHorizontal: 16,
            marginBottom: 8,
            borderRadius: 16,
            elevation: 2,
        },
        cardContent: {
            padding: 20,
        },
        fieldContainer: {
            marginBottom: 20,
        },
        label: {
            fontSize: 14,
            fontWeight: '500',
            color: theme.colors.onSurfaceVariant,
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        input: {
            backgroundColor: 'transparent',
        },
        segmentedButtons: {
            // Default styling from theme
        },
        row: {
            flexDirection: 'row',
            gap: 12,
        },
        flex1: {
            flex: 1,
        },
        uploadCard: {
            marginHorizontal: 16,
            marginBottom: 8,
            borderRadius: 16,
            elevation: 1,
            borderWidth: selectedFile ? 0 : 2,
            borderColor: selectedFile ? 'transparent' : theme.colors.outline,
            borderStyle: selectedFile ? 'solid' : 'dashed',
            backgroundColor: selectedFile ? theme.colors.surface : theme.colors.surfaceVariant,
        },
        uploadContent: {
            padding: 24,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 140,
        },
        uploadIcon: {
            marginBottom: 12,
        },
        uploadText: {
            fontSize: 16,
            fontWeight: '500',
            color: theme.colors.onSurface,
            marginBottom: 4,
            textAlign: 'center',
        },
        uploadSubtext: {
            fontSize: 13,
            color: theme.colors.onSurfaceVariant,
            marginBottom: 16,
            textAlign: 'center',
            lineHeight: 18,
        },
        selectedFileContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.primaryContainer,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
        },
        selectedFileInfo: {
            flex: 1,
            marginLeft: 12,
        },
        fileName: {
            fontSize: 16,
            fontWeight: '500',
            color: theme.colors.onPrimaryContainer,
            marginBottom: 2,
        },
        fileSize: {
            fontSize: 13,
            color: theme.colors.onPrimaryContainer,
            opacity: 0.7,
        },
        removeFileButton: {
            marginLeft: 8,
        },
        submitContainer: {
            padding: 20,
            paddingBottom: 32,
            backgroundColor: theme.colors.surface,
        },
        submitButton: {
            borderRadius: 28,
            elevation: 2,
        },
        submitButtonContent: {
            paddingVertical: 8,
        },
        divider: {
            marginVertical: 8,
        },
    });

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    size={24}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>New Print</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Print Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Configuration</Text>

                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            {/* Print Name */}
                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    value={formData.printName}
                                    onChangeText={(text) => handleInputChange('printName', text)}
                                    mode="outlined"
                                    placeholder="Enter a name for this print"
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </Card>

                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            {/* Orientation & Format Row */}
                            <View style={styles.row}>
                                <View style={styles.flex1}>
                                    <Text style={styles.label}>Orientation</Text>
                                    <SegmentedButtons
                                        value={formData.orientation}
                                        onValueChange={(value) => handleInputChange('orientation', value)}
                                        buttons={orientationOptions}
                                        style={styles.segmentedButtons}
                                    />
                                </View>
                            </View>

                            <Divider style={styles.divider} />

                            <View style={styles.row}>
                                <View style={styles.flex1}>
                                    <Text style={styles.label}>Color Mode</Text>
                                    <SegmentedButtons
                                        value={formData.format}
                                        onValueChange={(value) => handleInputChange('format', value)}
                                        buttons={formatOptions}
                                        style={styles.segmentedButtons}
                                    />
                                </View>
                            </View>

                            <Divider style={styles.divider} />

                            {/* Paper & Copies Row */}
                            <View style={styles.row}>
                                <View style={styles.flex1}>
                                    <Text style={styles.label}>Paper Size</Text>
                                    <SegmentedButtons
                                        value={formData.paper}
                                        onValueChange={(value) => handleInputChange('paper', value)}
                                        buttons={paperOptions}
                                        style={styles.segmentedButtons}
                                    />
                                </View>
                            </View>
                        </View>
                    </Card>

                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            {/* Advanced Options */}
                            <View style={styles.row}>
                                <View style={styles.flex1}>
                                    <Text style={styles.label}>Copies</Text>
                                    <TextInput
                                        value={formData.copies}
                                        onChangeText={(text) => handleInputChange('copies', text.replace(/[^0-9]/g, ''))}
                                        mode="outlined"
                                        keyboardType="numeric"
                                        placeholder="1"
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.flex1}>
                                    <Text style={styles.label}>Pages per Sheet</Text>
                                    <TextInput
                                        value={formData.pagesPerSheet}
                                        onChangeText={(text) => handleInputChange('pagesPerSheet', text.replace(/[^0-9]/g, ''))}
                                        mode="outlined"
                                        keyboardType="numeric"
                                        placeholder="1"
                                        style={styles.input}
                                    />
                                </View>
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Page Range (Optional)</Text>
                                <TextInput
                                    value={formData.pagesToPrint}
                                    onChangeText={(text) => handleInputChange('pagesToPrint', text)}
                                    mode="outlined"
                                    placeholder="e.g. 1-5, 8, 11-13"
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </Card>
                </View>

                {/* File Upload Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Document</Text>
                    <Surface style={styles.uploadCard}>
                        <View style={styles.uploadContent}>
                            {selectedFile ? (
                                <View style={styles.selectedFileContainer}>
                                    <IconButton
                                        icon={getFileIcon(selectedFile.type)}
                                        size={24}
                                        iconColor={theme.colors.onPrimaryContainer}
                                    />
                                    <View style={styles.selectedFileInfo}>
                                        <Text style={styles.fileName} numberOfLines={1}>
                                            {selectedFile.name}
                                        </Text>
                                    </View>
                                    <IconButton
                                        icon="close-circle"
                                        size={20}
                                        iconColor={theme.colors.onPrimaryContainer}
                                        style={styles.removeFileButton}
                                        onPress={() => setSelectedFile(null)}
                                    />
                                </View>
                            ) : (
                                <>
                                    <IconButton
                                        icon="cloud-upload-outline"
                                        size={32}
                                        iconColor={theme.colors.primary}
                                        style={styles.uploadIcon}
                                    />
                                    <Text style={styles.uploadText}>Upload your document</Text>
                                    <Text style={styles.uploadSubtext}>
                                        Support for PDF, JPG, PNG files{'\n'}Maximum size: 10MB
                                    </Text>
                                </>
                            )}
                            <Button
                                mode={selectedFile ? "outlined" : "contained"}
                                onPress={handleFileUpload}
                                compact
                                contentStyle={{ paddingHorizontal: 16 }}
                            >
                                {selectedFile ? 'Change File' : 'Select File'}
                            </Button>
                        </View>
                    </Surface>
                </View>
            </ScrollView>

            {/* Fixed Submit Button */}
            <Surface style={styles.submitContainer} elevation={4}>
                <Button
                    onPress={handleProceed}>
                    Proceed to payment
                </Button>
            </Surface>
        </View>
    );
};

export default Create;