import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import {
    Text,
    TextInput,
    Button,
    SegmentedButtons,
    useTheme,
    Surface,
    IconButton,
    Appbar,
    List,
    Divider,
    FAB,
} from "react-native-paper";
import { pick } from "@react-native-documents/picker";
import { useAuth } from "../context/authContext";
import { createNewStyles } from "../styles/createStyles";

interface Filetype {
    uri: string;
    name: string | null;
    type: string | null;
}

const Create = ({ navigation }: any) => {
    const { user } = useAuth();
    const theme = useTheme();
    const styles = createNewStyles(theme);

    const [formData, setFormData] = useState({
        printName: "",
        orientation: "Portrait",
        format: "Color",
        paper: "A4",
        copies: "1",
        pageRange: "",
        pagesPerSheet: "1",
    });
    const [selectedFile, setSelectedFile] = useState<Filetype | null>(null);

    useEffect(() => {
        if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, []);

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileUpload = async () => {
        try {
            const [pickResult] = await pick({ mode: "open" });
            setSelectedFile(pickResult);
            if (!formData.printName && pickResult.name) {
                handleInputChange('printName', pickResult.name.split('.').slice(0, -1).join('.'));
            }
        } catch (err) {
            Alert.alert("Error", "Failed to select file.");
        }
    };

    const handleProceed = () => {
        navigation.navigate("Summary", { finalPrintJob: { ...formData, file: selectedFile } });
    };

    const getFileIcon = (type: string | null) => {
        if (type?.includes("pdf")) return "file-pdf-box";
        if (type?.includes("image")) return "file-image";
        return "file-document";
    };

    const handleAccordionPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header} mode="center-aligned">
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Create Print Job" />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.content}>
                <Surface style={styles.documentHub} elevation={2}>
                    {selectedFile ? (
                        <TouchableOpacity style={styles.selectedFileCard} onPress={handleFileUpload}>
                            <IconButton icon={getFileIcon(selectedFile.type)} size={48} iconColor={theme.colors.primary} />
                            <View style={styles.fileInfo}>
                                <Text style={styles.fileName} numberOfLines={1}>{selectedFile.name}</Text>
                                <Text style={styles.fileDetails}>Tap to change file</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <IconButton icon="file-upload-outline" size={48} iconColor={theme.colors.primary} />
                            <Text style={styles.hubText}>Select a Document</Text>
                            <Text style={styles.hubSubtext}>PDF, JPG, PNG accepted</Text>
                            <Button mode="contained" onPress={handleFileUpload}>Browse Files</Button>
                        </>
                    )}
                </Surface>

                <TextInput
                    label="Print Name"
                    value={formData.printName}
                    onChangeText={(val) => handleInputChange("printName", val)}
                    mode="outlined"
                    style={[styles.input, { marginBottom: 24 }]}
                />

                <List.AccordionGroup>
                    <List.Accordion
                        title="Layout & Quality"
                        id="1"
                        style={styles.accordion}
                        titleStyle={styles.accordionTitle}
                        left={props => <List.Icon {...props} icon="layers-outline" />}
                        onPress={handleAccordionPress}
                    >
                        <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Orientation</Text>
                            <SegmentedButtons
                                value={formData.orientation}
                                onValueChange={(val) => handleInputChange('orientation', val)}
                                buttons={[{ value: "Portrait", label: "Portrait" }, { value: "Landscape", label: "Landscape" }]}
                                style={styles.inlineSegmentedButtons}
                            />
                        </View>
                        <Divider style={styles.divider} />
                        <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Paper Size</Text>
                            <SegmentedButtons
                                value={formData.paper}
                                onValueChange={(val) => handleInputChange('paper', val)}
                                buttons={[{ value: "A4", label: "A4" }, { value: "A3", label: "A3" }]}
                                style={styles.inlineSegmentedButtons}
                            />
                        </View>
                        <Divider style={styles.divider} />
                        <View style={styles.listItem}>
                            <Text style={styles.listItemTitle}>Color Mode</Text>
                            <SegmentedButtons
                                value={formData.format}
                                onValueChange={(val) => handleInputChange('format', val)}
                                buttons={[{ value: "B/W", label: "B/W" }, { value: "Color", label: "Color" }]}
                                style={styles.inlineSegmentedButtons}
                            />
                        </View>
                    </List.Accordion>
                    <Divider style={styles.divider} />
                    <List.Accordion
                        title="Pages & Copies"
                        id="2"
                        style={styles.accordion}
                        titleStyle={styles.accordionTitle}
                        left={props => <List.Icon {...props} icon="file-multiple-outline" />}
                        onPress={handleAccordionPress}
                    >
                        {/* --- UPDATED: Polished inputs, no dividers --- */}
                        <List.Item
                            title="Copies"
                            titleStyle={styles.listItemTitle}
                            style={styles.listItem}
                            right={() => <TextInput mode="outlined" dense value={formData.copies} onChangeText={val => handleInputChange("copies", val.replace(/[^0-9]/g, ''))} style={styles.inlineInput} keyboardType="numeric" />}
                        />
                        <List.Item
                            title="Pages per Sheet"
                            titleStyle={styles.listItemTitle}
                            style={styles.listItem}
                            right={() => <TextInput mode="outlined" dense value={formData.pagesPerSheet} onChangeText={val => handleInputChange("pagesPerSheet", val.replace(/[^0-9]/g, ''))} style={styles.inlineInput} keyboardType="numeric" />}
                        />
                        <List.Item
                            title="Page Range"
                            titleStyle={styles.listItemTitle}
                            style={styles.listItem}
                            right={() => <TextInput mode="outlined" dense placeholder="e.g. 1-5, 8" value={formData.pageRange} onChangeText={val => handleInputChange("pageRange", val)} style={styles.inlineInputFull} />}
                        />
                    </List.Accordion>
                </List.AccordionGroup>
            </ScrollView>

            <FAB
                icon="arrow-right"
                label="Proceed"
                style={styles.fab}
                visible={!!selectedFile && !!formData.printName}
                onPress={handleProceed}
            />
        </View>
    );
};

export default Create;