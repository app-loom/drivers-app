import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useUserStore } from "@/store/user.store";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewDocuments() {
  const userDetails = useUserStore((state) => state.userDetails);

  const bank = userDetails?.bankAccountDetails;
  const license = userDetails?.drivingLicence;

  return (
    <SafeAreaView 
      className="flex-1 p-5 bg-white"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text className="mb-6 text-2xl text-gray-800 font-interSemiBold">
        Uploaded Documents
      </Text>

      <View className="p-4 mb-8 border border-gray-100 shadow-sm bg-gray-50 rounded-2xl">
        <View className="flex-row items-center mb-3">
          <Ionicons name="card-outline" size={22} color="#FFAC1C" />
          <Text className="ml-2 text-lg text-gray-800 font-interSemiBold">
            Bank Account Details
          </Text>
        </View>

        {bank ? (
          <>
            <Text className="text-base text-gray-700">
              <Text className="font-interMedium">Bank: </Text>
              {bank.bank}
            </Text>
            <Text className="text-base text-gray-700">
              <Text className="font-interMedium">Account No: </Text>
              {bank.accountNo}
            </Text>
            <Text className="mb-3 text-base text-gray-700">
              <Text className="font-interMedium">IFSC: </Text>
              {bank.ifsc}
            </Text>

            {bank.imageUrl ? (
              <Image
                source={{ uri: bank.imageUrl }}
                className="w-full h-48 mt-2 rounded-xl"
                resizeMode="cover"
              />
            ) : (
              <Text className="mt-2 text-sm italic text-gray-400">
                No passbook image uploaded
              </Text>
            )}
          </>
        ) : (
          <Text className="text-sm italic text-gray-400">
            Bank details not available
          </Text>
        )}
      </View>

      <View className="p-4 mb-8 border border-gray-100 shadow-sm bg-gray-50 rounded-2xl">
        <View className="flex-row items-center mb-3">
          <Ionicons name="car-outline" size={22} color="#FFAC1C" />
          <Text className="ml-2 text-lg text-gray-800 font-interSemiBold">
            Driving Licence
          </Text>
        </View>

        {license ? (
          <>
            <Text className="mb-2 text-base text-gray-700">
              <Text className="font-interMedium">DL Number: </Text>
              {license.drivingLicenseNo}
            </Text>

            <View className="flex-row justify-between mt-3">
              {license.frontImage ? (
                <Image
                  source={{ uri: license.frontImage }}
                  className="w-[48%] h-40 rounded-xl"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-[48%] h-40 rounded-xl bg-gray-200 items-center justify-center">
                  <Text className="text-sm text-gray-500">No front image</Text>
                </View>
              )}

              {license.backImage ? (
                <Image
                  source={{ uri: license.backImage }}
                  className="w-[48%] h-40 rounded-xl"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-[48%] h-40 rounded-xl bg-gray-200 items-center justify-center">
                  <Text className="text-sm text-gray-500">No back image</Text>
                </View>
              )}
            </View>
          </>
        ) : (
          <Text className="text-sm italic text-gray-400">
            Driving licence details not available
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
