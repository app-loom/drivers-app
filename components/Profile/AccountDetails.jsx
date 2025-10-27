import { useUserStore } from "@/store/user.store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

export default function AccountDetails({ navigation }) {
  const userDetails = useUserStore((state) => state.userDetails);

  if (!userDetails) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-50">
        <Text className="text-gray-400 text-md">No user details available.</Text>
      </SafeAreaView>
    );
  }

  const formatBoolean = (value) => (value ? "Yes" : "No");

  const handleEditProfile = () => {
    navigation.navigate("edit-profile");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="px-4 py-6">
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-3xl text-gray-800 font-interSemiBold">Account Details</Text>
          </View>
        </View>

        <View className="p-6 bg-white shadow-lg gap-7 rounded-2xl">
          <View className="flex-row items-center justify-between">
            <Text className="mt-1 text-gray-500">View your profile information</Text>
            <TouchableOpacity onPress={handleEditProfile} className="">
              <Feather name="edit" size={20} color="#FFAC1C" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-3">
            <Ionicons name="person-circle-outline" size={24} color="#FFAC1C" />
            <View className="flex-row items-center justify-between flex-1">
              <Text className="text-gray-400 text-md">Full Name</Text>
              <Text className="mt-1 font-semibold text-gray-700 text-md">{userDetails.fullName}</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <Ionicons name="call-outline" size={24} color="#FFAC1C" />
            <View className="flex-row items-center justify-between flex-1">
              <Text className="text-gray-400 text-md">Mobile Number</Text>
              <Text className="mt-1 font-semibold text-gray-700 text-md">{userDetails.mobileNumber}</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <Ionicons name="checkmark-done-outline" size={24} color="#FFAC1C" />
            <View className="flex-row items-center justify-between flex-1">
              <Text className="text-gray-400 text-md">Verified Mobile</Text>
              <Text className="mt-1 font-semibold text-gray-700 text-md">{formatBoolean(userDetails.isMobileVerified)}</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <Ionicons name="shield-checkmark-outline" size={24} color="#FFAC1C" />
            <View className="flex-row items-center justify-between flex-1">
              <Text className="text-gray-400 text-md">Verified Account</Text>
              <Text className="mt-1 font-semibold text-gray-700 text-md">{formatBoolean(userDetails.isVerified)}</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <Ionicons name="car-outline" size={24} color="#FFAC1C" />
            <View className="flex-row items-center justify-between flex-1">
              <Text className="text-gray-400 text-md">Acting Driver</Text>
              <Text className="mt-1 font-semibold text-gray-700 text-md">{formatBoolean(userDetails.isActingDriver)}</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <Ionicons name="time-outline" size={24} color="#FFAC1C" />
            <View className="flex-row items-center justify-between flex-1">
              <Text className="text-gray-400 text-md">Created At</Text>
              <Text className="mt-1 font-semibold text-gray-700 text-md">{new Date(userDetails.createdAt).toLocaleString()}</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <Ionicons name="refresh-outline" size={24} color="#FFAC1C" />
            <View className="flex-row items-center justify-between flex-1">
              <Text className="text-gray-400 text-md">Last Updated</Text>
              <Text className="mt-1 font-semibold text-gray-700 text-md">{new Date(userDetails.updatedAt).toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
