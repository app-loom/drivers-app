import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SetProfilePicture() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Profile Picture</Text>
            </View>

            <View style={styles.instructions}>
                <View style={styles.point}>
                    <Ionicons name="checkmark-circle" size={24} color="green" />{" "}
                    <Text style={styles.text}>
                        Please upload a clear selfie
                    </Text>
                </View>
                <View style={styles.point}>
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                    <Text style={styles.text}>
                        The selfie should have the applicant alone
                    </Text>
                </View>
                <View style={styles.point}>
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                    <Text style={styles.text}>
                        Accepted formats: JPEG / PNG
                    </Text>
                </View>
            </View>

            <View style={styles.uploadBox}>
                <Text style={styles.label}>Profile Picture</Text>
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={styles.imagePreview}
                    />
                ) : (
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={pickImage}
                    >
                        <Text style={styles.uploadButtonText}>
                            Choose Image
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity style={styles.doneButton}>
                <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
    },
    instructions: {
        marginBottom: 20,
        gap: 5,
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: "#555",
    },
    uploadBox: {
        marginBottom: 30,
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    uploadButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#ADADAD",
        borderRadius: 9,
    },
    uploadButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
    imagePreview: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 10,
    },
    doneButton: {
        backgroundColor: "#FFAC1C",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    doneButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    point: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
    },
});
