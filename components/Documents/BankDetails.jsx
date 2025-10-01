import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BankDetails({ navigation }) {
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
            <View className="flex-1 px-4 py-5 space-y-2">
                <View>
                    <Text className="text-xl text-center text-gray-800 font-interSemiBold">
                        Bank Account Details
                    </Text>
                </View>
                <View className="pt-3 space-y-3">
                    <View className="flex-row gap-2">
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#FFAC1C"
                        />{" "}
                        <Text className="text-gray-600 font-interRegular">
                            Photo copies and printouts of documnets will not be
                            accepted.
                        </Text>
                    </View>
                    <View className="flex-row gap-2">
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#FFAC1C"
                        />{" "}
                        <Text className="text-gray-600 font-interRegular">
                            The photo and all the details must be clearly
                            visible.
                        </Text>
                    </View>
                    <View className="flex-row gap-2">
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#FFAC1C"
                        />{" "}
                        <Text className="text-gray-600 font-interRegular">
                            Only the documents that are less than 10MB in size
                            and in JPG, JPEG, PNG, or PDF format will be
                            accepted.
                        </Text>
                    </View>
                </View>
                <View className="pt-10">
                    <View className="items-center mb-10">
                        <TouchableOpacity
                            className="flex items-center justify-center h-24 px-5 py-2 border border-gray-400 rounded-lg w-60"
                            style={{ borderStyle: "dashed", borderWidth: 2 }}
                            onPress={pickImage}
                        >
                            <Text className="text-sm text-gray-500 font-interRegular">
                                Choose Document
                            </Text>
                        </TouchableOpacity>
                        <View className="items-start justify-start w-full mt-5">
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
                    onPress={() => navigation.navigate("add-driving-license")}
                >
                    <Text className="btn-text">Done</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
