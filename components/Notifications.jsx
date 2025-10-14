import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { notificationsData } from "@/constants/data";



const NotificationCard = ({ item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row items-start p-4 mx-4 mb-3 bg-white shadow-md rounded-2xl"
    >
      <Ionicons name={item.icon} size={26} color="#FFAC1C" />
      <View className="flex-1 ml-3">
        <View className="flex-row items-start justify-between">
          <Text className="flex-shrink text-xl text-gray-900 font-interSemiBold">
            {item.title}
          </Text>
          <Text className="ml-2 text-sm text-gray-400">{item.time}</Text>
        </View>

        <Text className="mt-1 text-sm text-gray-600 font-interRegular">
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Section = ({ title, data }) => (
  <View className="mb-6">
    <Text className="mx-4 mb-2 text-lg text-gray-600 font-interSemiBold">
      {title}
    </Text>
    {data.map((item) => (
      <NotificationCard key={item.id} item={item} />
    ))}
  </View>
);

export default function Notifications() {
  return (
    <SafeAreaView className="flex-1 pt-5 bg-gray-50">
      <Text className="mb-4 text-2xl text-center text-gray-900 font-interBold">
        Notifications
      </Text>

      <FlatList
        data={[
          { title: "Today", data: notificationsData.today },
          { title: "Yesterday", data: notificationsData.yesterday },
          { title: "Earlier", data: notificationsData.earlier },
        ]}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <Section title={item.title} data={item.data} />}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
