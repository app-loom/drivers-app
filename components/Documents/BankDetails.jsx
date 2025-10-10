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
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 gap-3 px-4 py-5">
                <View className="p-5 pt-10" >
                    <Text className="text-4xl text-center text-gray-800 font-interSemiBold">
                        Bank Account Details
                    </Text>
                </View>
                <View className="gap-3 px-4">
                    <View className="flex-row gap-2">
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#FFAC1C"
                        />
                        <Text className="text-xl text-gray-600 font-interRegular">
                            Photo copies and printouts of documnets will not be
                            accepted.
                        </Text>
                    </View>
                    <View className="flex-row gap-2">
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#FFAC1C"
                        />
                        <Text className="text-xl text-gray-600 font-interRegular">
                            The photo and all the details must be clearly
                            visible.
                        </Text>
                    </View>
                    <View className="flex-row gap-2">
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#FFAC1C"
                        />
                        <Text className="text-xl text-gray-600 font-interRegular">
                            Only the documents that are less than 10MB in size
                            and in JPG, JPEG, PNG, or PDF format will be
                            accepted.
                        </Text>
                    </View>
                </View>
                <View className="items-center justify-center flex-1 item">
                    <View className="items-center mb-10">
                        <TouchableOpacity
                            className="flex items-center justify-center px-5 py-2 border border-gray-400 rounded-lg h-52 w-80"
                            style={{ borderStyle: "dashed", borderWidth: 2 }}
                            onPress={pickImage}
                        >
                            <Text className="text-xl text-gray-500 font-interRegular">
                                Choose Document
                            </Text>
                        </TouchableOpacity>
                        <View className="items-start justify-start w-full mt-5">
                            {image && (
                                <View>
                                    <Image
                                        source={{ uri: image }}
                                        className="p-6 border border-gray-300 rounded-md h-44 w-44"
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
