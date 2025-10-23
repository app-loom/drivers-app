import { useUserStore } from "@/store/user.store";
import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BankInfo() {
  const userDetails = useUserStore((state) => state.userDetails)
  
  const maskedAccount = userDetails?.bankAccountDetails?.accountNo.replace(/\d(?=\d{4})/g, "*");

  return (
    <SafeAreaView className="flex-1 px-5 py-6 bg-white">
      <View >
        <Text className="mb-4 text-2xl font-bold">Bank Details</Text>

        <View className="p-5 bg-gray-100 shadow-sm rounded-xl">
          <View className="mb-4">
            <Text className="text-sm text-gray-500">Bank Name</Text>
            <Text className="mt-1 text-base font-semibold">{userDetails?.bankAccountDetails.bank}</Text>
          </View>

          <View className="mb-4">
            <Text className="text-sm text-gray-500">Account Number</Text>
            <Text className="mt-1 text-base font-semibold">{maskedAccount}</Text>
          </View>

          <View>
            <Text className="text-sm text-gray-500">IFSC Code</Text>
            <Text className="mt-1 text-base font-semibold">{userDetails?.bankAccountDetails.ifsc}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
