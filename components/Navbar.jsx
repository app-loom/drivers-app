import Fontisto from "@expo/vector-icons/Fontisto";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Logo from "@/assets/images/driverapp.png";

export default function Navbar({ navigation }) {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <View className="w-full mt-2">
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-full">
        <Image source={Logo} resizeMode="contain" className="w-10 h-10" />

        <TouchableOpacity onPress={() => setIsOnline(!isOnline)} className={`px-3 py-1 rounded-full ${isOnline ? "bg-green-100 border border-green-300" : "bg-red-100 border border-red-300"}`} activeOpacity={0.8}>
          <Text className={`text-sm font-interSemiBold ${isOnline ? "text-green-700" : "text-red-700"}`}>{isOnline ? "Online" : "Offline"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
