import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "@/store/user.store";

export default function EditProfile({ navigation }) {
  const userDetails = useUserStore((state) => state.userDetails);
  const setUserDetails = useUserStore((state) => state.setUserDetails);

  const [fullName, setFullName] = useState(userDetails?.fullName || "");

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    setUserDetails({
      ...userDetails,
      fullName,
    });

    Alert.alert("Success", "Profile updated successfully!");
    navigation.goBack();
  };

  if (!userDetails) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-50">
        <Text className="text-gray-400 text-md">No user details available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="px-4 py-6">
        <View className="flex-row items-center justify-between pl-2 mb-6">
          <Text className="text-3xl text-gray-800 font-interSemiBold">Edit Profile</Text>
        </View>
        <View className="p-6 space-y-6 bg-white shadow-lg rounded-2xl">
          <View>
            <View className="flex-row items-center mb-4">
              <Ionicons name="person-outline" size={20} color="#FFAC1C" />
              <Text className="ml-2 text-gray-700 font-interMedium">Full Name</Text>
            </View>
            <TextInput value={fullName} onChangeText={setFullName} placeholder="Enter your full name" className="p-3 text-gray-800 border border-gray-200 rounded-xl bg-gray-50" />
          </View>

          <TouchableOpacity onPress={handleSave} className="mt-6 bg-[#FFAC1C] p-4 rounded-2xl items-center">
            <Text className="text-lg text-white font-interSemiBold">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
