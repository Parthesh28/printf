import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Alert, TouchableOpacity, Animated, Easing, LayoutChangeEvent } from "react-native";
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
    Icon,
} from "react-native-paper";
import { pick } from "@react-native-documents/picker";
import { useAuth } from "../context/authContext";
import { createNewStyles } from "../styles/createStyles";

interface SmoothAccordionProps {
    title: string;
    icon: string;
    children: React.ReactNode;
    isExpanded: boolean;
    onPress: () => void;
}

const SmoothAccordion: React.FC<SmoothAccordionProps> = ({ title, icon, children, isExpanded, onPress }) => {
    const theme = useTheme();
    const styles = createNewStyles(theme);
    const [contentHeight, setContentHeight] = useState(0);
    const animation = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isExpanded ? 1 : 0,
            duration: 320,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start();
    }, [isExpanded]);

    const animatedHeight = contentHeight > 0 ? animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight],
    }) : 0;

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1],
    });

    const chevronRotation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    const chevronStyle = {
        transform: [{ rotate: chevronRotation }],
    };

    const contentContainerStyle = {
        height: animatedHeight,
        opacity: animatedOpacity,
        overflow: 'hidden' as const,
    };

    const handleLayout = (event: LayoutChangeEvent) => {
        const measuredHeight = event.nativeEvent.layout.height;
        if (measuredHeight > 0 && contentHeight !== measuredHeight) {
            setContentHeight(measuredHeight);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.accordionHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon source={icon} size={22} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.accordionTitle}>{title}</Text>
                </View>
                <Animated.View style={chevronStyle}>
                    <List.Icon icon="chevron-right" />
                </Animated.View>
            </TouchableOpacity>

            <Animated.View style={contentContainerStyle}>
                <View
                    onLayout={handleLayout}
                    style={styles.accordionContent}
                >
                    {children}
                </View>
            </Animated.View>
        </View>
    );
};

interface StepperInputProps {
    value: string;
    onValueChange: (newValue: string) => void;
    minValue?: number;
}

const StepperInput: React.FC<StepperInputProps> = ({ value, onValueChange, minValue = 1 }) => {
    const theme = useTheme();
    const styles = createNewStyles(theme);
    const numericValue = parseInt(value, 10) || minValue;

    const handleIncrement = () => {
        onValueChange(String(numericValue + 1));
    };

    const handleDecrement = () => {
        if (numericValue > minValue) {
            onValueChange(String(numericValue - 1));
        }
    };

    return (
        <View style={styles.stepperContainer}>
            <IconButton
                icon="minus"
                onPress={handleDecrement}
                disabled={numericValue <= minValue}
                style={styles.stepperButton}
                size={20}
            />
            <Text style={styles.stepperValue}>{value}</Text>
            <IconButton
                icon="plus"
                onPress={handleIncrement}
                style={styles.stepperButton}
                size={20}
            />
        </View>
    );
};

const Create = ({ navigation }: any) => {
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
    const [selectedFile, setSelectedFile] = useState<any | null>(null);
    const [expandedId, setExpandedId] = useState<string | undefined>('layout');

    const handleAccordionPress = (id: string) => {
        setExpandedId(currentId => (currentId === id ? undefined : id));
    };

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

    const getFileicon = (type: string | null) => {
        if (type?.includes("pdf")) return "file-pdf-box";
        if (type?.includes("image")) return "file-image";
        return "file-document-outline";
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header} mode="center-aligned" elevated>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Create Print Job" />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderContainer}>
                        <Icon source="file-document-outline" size={22} color={theme.colors.onSurfaceVariant} />
                        <Text style={styles.sectionHeaderText}>Document</Text>
                    </View>
                    {selectedFile ? (
                        <TouchableOpacity onPress={handleFileUpload}>
                            <Surface style={styles.selectedFileContainer} elevation={0}>
                                <IconButton icon={getFileicon(selectedFile.type)} size={36} iconColor={theme.colors.primary} style={styles.fileIcon} />
                                <View style={styles.fileInfo}>
                                    <Text style={styles.fileName} numberOfLines={1}>{selectedFile.name}</Text>
                                    <Text style={styles.fileDetails}>Tap to change the file</Text>
                                </View>
                                <List.Icon icon="chevron-right" />
                            </Surface>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.fileSelectorContainer} onPress={handleFileUpload}>
                            <IconButton icon="file-upload-outline" size={40} iconColor={theme.colors.primary} />
                            <Text style={styles.hubText}>Select a Document</Text>
                        </TouchableOpacity>
                    )}
                    {selectedFile && (
                        <TextInput
                            label="Print Name"
                            value={formData.printName}
                            onChangeText={(val) => handleInputChange("printName", val)}
                            mode="outlined"
                            style={styles.textInput}
                            left={<TextInput.Icon icon="pencil-outline" />}
                        />
                    )}
                </View>

                <Divider style={styles.separator} horizontalInset />

                <View style={styles.sectionContainer}>
                    <SmoothAccordion
                        title="Layout & Quality"
                        icon="layers-outline"
                        isExpanded={expandedId === 'layout'}
                        onPress={() => handleAccordionPress('layout')}
                    >
                        <List.Item title="Orientation" right={() => <SegmentedButtons value={formData.orientation} onValueChange={(val) => handleInputChange('orientation', val)} buttons={[{ value: "Portrait", label: "Portrait" }, { value: "Landscape", label: "Landscape" }]} style={styles.inlineSegmentedButtons} />} />
                        <Divider />
                        <List.Item title="Paper Size" right={() => <SegmentedButtons value={formData.paper} onValueChange={(val) => handleInputChange('paper', val)} buttons={[{ value: "A4", label: "A4" }, { value: "A3", label: "A3" }]} style={styles.inlineSegmentedButtons} />} />
                        <Divider />
                        <List.Item title="Color" right={() => <SegmentedButtons value={formData.format} onValueChange={(val) => handleInputChange('format', val)} buttons={[{ value: "B/W", label: "B/W" }, { value: "Color", label: "Color" }]} style={styles.inlineSegmentedButtons} />} />
                    </SmoothAccordion>
                </View>

                <Divider style={styles.separator} horizontalInset />
                <View style={styles.sectionContainer}>
                    <SmoothAccordion
                        title="Paging & Copies"
                        icon="file-multiple-outline"
                        isExpanded={expandedId === 'paging'}
                        onPress={() => handleAccordionPress('paging')}
                    >
                        <List.Item title="Copies" right={() => <StepperInput value={formData.copies} onValueChange={val => handleInputChange("copies", val)} />} />
                        <Divider />
                        <List.Item title="Pages per Sheet" right={() => <StepperInput value={formData.pagesPerSheet} onValueChange={val => handleInputChange("pagesPerSheet", val)} />} />
                        <Divider horizontalInset />
                        <List.Item title="Page Range" description="e.g. 1-5, 8" right={() => <TextInput mode="outlined" dense placeholder="All" value={formData.pageRange} onChangeText={val => handleInputChange("pageRange", val)} style={styles.inlineInputFull} />} />
                    </SmoothAccordion>
                </View>
            </ScrollView>

            <Surface style={styles.bottomBar}>
                <Button mode="contained" icon="arrow-right" onPress={handleProceed} disabled={!selectedFile || !formData.printName} style={styles.proceedButton} labelStyle={styles.proceedButtonLabel}>
                    Proceed to Summary
                </Button>
            </Surface>
        </View>
    );
};

export default Create;