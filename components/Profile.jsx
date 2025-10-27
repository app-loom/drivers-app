import { menuItems, user } from "@/constants/data";
import { useUserStore } from "@/store/user.store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const navigation = useNavigation();
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const userDetails = useUserStore((state) => state.userDetails);
  const setToken = useUserStore((state) => state.setToken);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
      setUserDetails(null);
      setModalVisible(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const profileMenus = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.route)} className="flex-row items-center justify-between p-5 border-b border-gray-100 rounded-2xl">
      <View className="flex-row items-center gap-3">
        <Ionicons name={item.icon} size={22} color="#FFAC1C" />
        <Text className="text-lg text-gray-800 font-interRegular">{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#FFAC1C" />
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={profileMenus}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="items-center px-5 mt-6 mb-8">
            <Image source={{ uri: user.profilePicture }} className="mb-4 border-4 rounded-full w-28 h-28 border-primary" />
            <Text className="text-3xl text-gray-800 font-interSemiBold">{userDetails?.fullName}</Text>
            <View className="flex-row items-center mt-2 space-x-2">
              <Ionicons name={user.isVerified ? "checkmark-circle" : "close-circle"} size={18} color={user.isVerified ? "#2ECC71" : "#E74C3C"} />
              <Text className={`text-base ${user.isVerified ? "text-green-600" : "text-red-500"}`}>{user.isVerified ? "Verified Driver" : "Not Verified"}</Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity className="flex-row items-center justify-between p-5 border-b border-gray-100 rounded-2xl" onPress={() => setModalVisible(true)}>
            <View className="flex-row items-center gap-3">
              <Ionicons name={"log-out-outline"} size={22} color="#FFAC1C" />
              <Text className="text-lg text-gray-800 font-interRegular">Logout</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFAC1C" />
          </TouchableOpacity>
        }
        contentContainerStyle={{ paddingBottom: 40, backgroundColor: "#fff" }}
      />

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleCancel}>
        <View className="items-center justify-center flex-1 bg-black/50">
          <View className="items-center p-6 bg-white shadow-lg rounded-2xl">
            <Text className="mb-6 text-lg text-center font-interSemiBold">Are you sure you want to log out?</Text>

            <View className="flex-row gap-3">
              <TouchableOpacity onPress={handleCancel} className="px-5 py-2 bg-gray-300 rounded-xl">
                <Text className="text-base text-gray-800 font-interSemiBold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogout} className="px-5 py-2 bg-red-500 rounded-xl">
                <Text className="text-base text-white font-interSemiBold">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );

}
