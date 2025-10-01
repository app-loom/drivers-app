import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SetProfilePicture({ navigation }) {
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
        <SafeAreaView className="flex-1">
            <View className="flex-1 px-4 py-5 space-y-3">
                <View>
                    <Text className="text-xl text-center text-gray-800 font-interSemiBold">
                        Profile Picture
                    </Text>
                </View>

                <View style={styles.instructions}>
                    <View style={styles.point}>
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#FFAC1C"
                        />{" "}
                        <Text style={styles.text}>
                            Please upload a clear selfie
                        </Text>
                    </View>
                    <View style={styles.point}>
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#FFAC1C"
                        />
                        <Text style={styles.text}>
                            The selfie should have the applicant alone
                        </Text>
                    </View>
                    <View style={styles.point}>
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#FFAC1C"
                        />
                        <Text style={styles.text}>
                            Accepted formats: JPEG / PNG
                        </Text>
                    </View>
                </View>

                <View className="pt-10">
                    <View style={styles.uploadBox}>
                        <TouchableOpacity
                            className="flex items-center justify-center h-24 px-5 py-2 border border-gray-400 rounded-lg w-60"
                            style={{ borderStyle: "dashed", borderWidth: 2 }}
                            onPress={pickImage}
                        >
                            <Text className="text-sm text-gray-500 font-interRegular">
                                Choose Image
                            </Text>
                        </TouchableOpacity>
                        <View className="relative items-start justify-start w-full mt-5">
                            {image && (
                                <View>
                                    <Image
                                        source={{ uri: image }}
                                        className="w-24 h-24 p-6 border border-gray-300 rounded-md"
                                    />
                                    <Ionicons
                                        name="close-circle"
                                        className="absolute top-0 right-0"
                                        size={24}
                                        color="#FFAC1C"
                                        onPress={() => setImage(null)}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
            <View className="px-4 pb-5">
                <TouchableOpacity
                    className="btn-primary"
                    onPress={() => navigation.navigate("add-bank-details")}
                >
                    <Text className="btn-text">Done</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    point: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
    },
});
