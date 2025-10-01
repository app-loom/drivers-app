import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DrivingLicense({ navigation }) {
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);

    const pickImage = async (side) => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
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
            const uri = result.assets[0].uri;
            side === "front" ? setFrontImage(uri) : setBackImage(uri);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View className="px-4 py-5 space-y-4">
                    <Text className="text-xl text-center text-gray-800 font-interSemiBold">
                        Driving License Upload
                    </Text>
                    <View className="pt-3 space-y-3">
                        <View className="flex-row gap-2">
                            <Ionicons
                                name="checkmark-circle"
                                size={24}
                                color="#FFAC1C"
                            />{" "}
                            <Text className="text-gray-600 font-interRegular">
                                Photo copies and printouts of documnets will not
                                be accepted.
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
                                Only the documents that are less than 10MB in
                                size and in JPG, JPEG, PNG, or PDF format will
                                be accepted.
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-center gap-3 pt-4">
                        <TouchableOpacity
                            className="flex items-center justify-center h-24 px-5 py-2 border border-gray-400 rounded-lg max-w-[150px]"
                            style={{ borderStyle: "dashed", borderWidth: 2 }}
                            onPress={() => pickImage("front")}
                        >
                            <Text className="text-sm text-center text-gray-500 font-interRegular">
                                Upload Front Side
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex items-center justify-center h-24 px-5 py-2 border border-gray-400 rounded-lg max-w-[150px]"
                            style={{ borderStyle: "dashed", borderWidth: 2 }}
                            onPress={() => pickImage("back")}
                        >
                            <Text className="text-sm text-center text-gray-500 font-interRegular">
                                Upload Back Side
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text className="pt-1 text-sm text-gray-600 font-interRegular">
                        <Text className="text-primary">Note : </Text>
                        Please upload both front and backside of driving license
                    </Text>

                    <View className="flex-row items-center gap-3 pt-4">
                        {frontImage && (
                            <View className="relative">
                                <Image
                                    source={{ uri: frontImage }}
                                    className="w-24 h-24 border border-gray-300 rounded-md"
                                />
                                <Ionicons
                                    name="close-circle"
                                    className="absolute top-0 right-0"
                                    size={24}
                                    color="#FFAC1C"
                                    onPress={() => setFrontImage(null)}
                                />
                            </View>
                        )}

                        {backImage && (
                            <View className="relative">
                                <Image
                                    source={{ uri: backImage }}
                                    className="w-24 h-24 border border-gray-300 rounded-md"
                                />
                                <Ionicons
                                    name="close-circle"
                                    className="absolute top-0 right-0"
                                    size={24}
                                    color="#FFAC1C"
                                    onPress={() => setBackImage(null)}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            <View className="px-4 pb-5">
                <TouchableOpacity
                    className="w-full btn-primary"
                    onPress={() => navigation.navigate("submit-application")}
                >
                    <Text className="text-center btn-text">Done</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
