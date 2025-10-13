import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { user } from "@/constants/data";

export default function Profile() {

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="items-center mt-6 mb-8">
          <Image source={{ uri: user.profilePicture }} className="mb-4 border-4 rounded-full w-28 h-28 border-primary" />
          <Text className="text-3xl font-interSemiBold text-primary">{user.fullName}</Text>

          <View className="flex-row items-center mt-2 space-x-2">
            <Ionicons name={user.isVerified ? "checkmark-circle" : "close-circle"} size={18} color={user.isVerified ? "#2ECC71" : "#E74C3C"} />
            <Text className={`text-base ${user.isVerified ? "text-green-600" : "text-red-500"}`}>{user.isVerified ? "Verified Driver" : "Not Verified"}</Text>
          </View>
        </View>

        <View className="p-5 mb-6 bg-gray-100 shadow-sm rounded-2xl">
          <Text className="mb-3 text-xl font-interSemiBold text-primary">Account Details</Text>

          {[
            ["Mobile Number", user.mobileNumber],
            ["Email", user.email],
            ["Gender", user.gender],
            ["City", user.city],
            ["Status", user.regiStatus],
          ].map(([label, value], i) => (
            <View key={i} className="flex-row justify-between py-1 last:border-0">
              <Text className="text-base text-gray-700 font-interRegular">{label}:</Text>
              <Text className="text-base text-gray-900 font-interMedium">{value}</Text>
            </View>
          ))}
        </View>

        <View className="p-5 mb-6 bg-gray-100 shadow-sm rounded-2xl">
          <Text className="mb-3 text-xl font-interSemiBold text-primary">Vehicle Details</Text>

          {[
            ["Car Name", user.carName],
            ["Car Number", user.carNo],
          ].map(([label, value], i) => (
            <View key={i} className="flex-row justify-between py-1 last:border-0">
              <Text className="text-base text-gray-700 font-interRegular">{label}:</Text>
              <Text className="text-base text-gray-900 font-interMedium">{value}</Text>
            </View>
          ))}
        </View>

        <View className="p-5 mb-6 bg-gray-100 shadow-sm rounded-2xl">
          <Text className="mb-3 text-xl font-interSemiBold text-primary">Documents</Text>

          {[
            ["Bank Account", user.bankAccountDetails],
            ["Driving Licence", user.drivingLicence],
          ].map(([label, value], i) => (
            <View key={i} className="flex-row justify-between py-1 last:border-0">
              <Text className="text-base text-gray-700 font-interRegular">{label}:</Text>
              <Text className="text-base text-gray-900 font-interMedium">{value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
