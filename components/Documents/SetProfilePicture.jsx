import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function SetProfilePicture({ navigation }) {
  const [image, setImage] = useState(null);

  // =============================
  // 📸 Image Picker Handler
  // =============================
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
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

      <View className="p-5 pt-10">
        <Text className="text-4xl text-center text-gray-800 font-interSemiBold">
          Profile Picture
        </Text>
      </View>

      <View className="gap-3 px-4">
        {[
          "Please upload a clear selfie",
          "The selfie should have the applicant alone",
          "Accepted formats: JPEG / PNG",
        ].map((text, index) => (
          <View key={index} className="flex-row items-center gap-2">
            <Ionicons name="checkmark-circle" size={24} color="#FFAC1C" />
            <Text className="text-xl text-gray-500">{text}</Text>
          </View>
        ))}
      </View>
      <View className="items-center justify-center flex-1">
        <TouchableOpacity
          onPress={pickImage}
          className="flex items-center justify-center px-5 py-2 border border-gray-400 rounded-lg w-80 h-52"
          style={{ borderStyle: "dashed" }}
        >
          <Text className="text-xl text-gray-500 font-interRegular">
            Choose Image
          </Text>
        </TouchableOpacity>

        {image && (
          <View className="relative mt-5">
            <Image
              source={{ uri: image }}
              className="border border-gray-300 rounded-md w-44 h-44"
            />
            <Ionicons
              name="close-circle"
              size={24}
              color="#FFAC1C"
              className="absolute top-0 right-0"
              onPress={() => setImage(null)}
            />
          </View>
        )}
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
