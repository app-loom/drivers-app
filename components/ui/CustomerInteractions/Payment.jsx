import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="justify-between flex-1 p-6">
        <View className="mt-10">
          <Text className="text-3xl text-center text-gray-900 font-interSemiBold">Collect Cash</Text>
        </View>

        <View className="gap-3 mt-10">
          <View className="items-center">
            <Ionicons name="wallet-outline" size={114} color="#FFAC1C" className="p-5 bg-gray-100 rounded-full" />
          </View>
        </View>

        <View className="p-4 mt-10">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="radio-button-checked" className='mb-1' size={24}  color="#22C55E" />
            <Text className="text-gray-900 font-interSemiBold">121B Basar Street, Trichy</Text>
          </View>
          
          <View className="flex-row items-center gap-2 px-3">
            <View className='w-[2px] h-10 bg-gray-200' ></View>
            <View className='flex-1 w-full h-[2px] bg-gray-200' ></View>
            <Text className="px-4 py-1 text-gray-900 bg-gray-100 rounded-xl font-interSemiBold">10kms</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <MaterialIcons name="location-pin" className='mt-1' size={24} color="#FFAC1C" />
            <Text className="text-gray-900 font-interSemiBold">221B Basar Street, Thanjavur</Text>
          </View>
        </View>
        <View className="px-2 py-4 bg-gray-100 rounded-xl">
          <View className="items-center p-4 mb-2">
            <Image source={{ uri: "https://images.pexels.com/photos/7540485/pexels-photo-7540485.jpeg" }} className="w-24 h-24 mb-4 border-4 rounded-full border-primary" resizeMode="cover" />

            <Text className="text-xl text-gray-700 font-interSemiBold">John Doe</Text>
          </View>

          <View className="flex-row justify-between p-4 bg-primary rounded-xl">
            <Text className="text-xl text-white font-interSemiBold">Total Amount:</Text>
            <Text className="text-xl text-white font-interSemiBold">₹ 450.00</Text>
          </View>
        </View>

        <TouchableOpacity className="py-4 mt-10 rounded-full bg-primary" onPress={() => navigation.navigate("find-ride")}>
          <Text className="text-lg text-center text-white font-interSemiBold">Cash Collected</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
