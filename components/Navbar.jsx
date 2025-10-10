import Fontisto from '@expo/vector-icons/Fontisto';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Navbar({ navigation }) {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <View className="w-full mt-2">
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-full">
        <TouchableOpacity className="p-2 border rounded-full border-primary" onPress={() => navigation.navigate("profile")}>
          <Fontisto name="male" size={18} color="#FFAC1C" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsOnline(!isOnline)} className={`px-3 py-1 rounded-full ${isOnline ? "bg-green-100 border border-green-300" : "bg-red-100 border border-red-300"}`} activeOpacity={0.8}>
          <Text className={`text-sm font-interSemiBold ${isOnline ? "text-green-700" : "text-red-700"}`}>{isOnline ? "Online" : "Offline"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
