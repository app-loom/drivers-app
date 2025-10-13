import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { rideData } from "@/constants/data";


const RideCard = ({ ride }) => {
  const statusBg = ride.status === "Completed" ? "bg-green-100" : ride.status === "Cancelled" ? "bg-red-100" : "bg-gray-200";

  const statusText = ride.status === "Completed" ? "text-green-600" : ride.status === "Cancelled" ? "text-red-500" : "text-gray-500";

  return (
    <TouchableOpacity className="p-4 mx-4 mb-4 bg-white shadow-md rounded-xl" activeOpacity={0.8}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-lg text-gray-900 font-interSemiBold">
            {ride.from} → {ride.to}
          </Text>
          <Text className="mt-1 text-gray-500">
            {ride.date} • {ride.time}
          </Text>

          <View className={`${statusBg} self-start px-3 py-1 rounded-lg mt-2`}>
            <Text className={`text-xs font-interRegular ${statusText}`}>{ride.status}</Text>
          </View>
        </View>

        <View className="items-end">
          <Ionicons name="car" size={22} color="#FFAC1C" />
          <Text className="mt-1 text-gray-900 font-interSemiBold">{ride.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Rides() {
  return (
    <SafeAreaView className="flex-1 pt-2 bg-gray-50">
      <Text className="mb-4 text-2xl text-center text-gray-900 font-interBold">Ride History</Text>

      <FlatList data={rideData} keyExtractor={(item) => item.id} renderItem={({ item }) => <RideCard ride={item} />} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
}
