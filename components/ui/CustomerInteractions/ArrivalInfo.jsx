import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ArrivalInfo({ visible, onClose, navigation }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View className="justify-end flex-1 bg-black/30">
        <View className="p-6 bg-white rounded-t-3xl">
          <View className="flex items-center justify-center mb-5">
            <View className="items-center gap-3 mb-5">
              <MaterialIcons name="location-pin" size={164} color="#FFAC1C" />
              <Text className="mb-2 text-3xl text-gray-800 font-interSemiBold">Arrived at Customer's Location</Text>
              <Text className="font-interRegular">221B Street, Trichy</Text>
            </View>
          </View>

          <View className="flex-row justify-between gap-4">
            <TouchableOpacity className="flex-1 py-3 border border-gray-300 rounded-full" onPress={onClose}>
              <Text className="text-center text-gray-700 font-interSemiBold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-3 rounded-full bg-primary"
              onPress={() => {
                onClose();
                navigation.navigate("customer-otp");
              }}
            >
              <Text className="text-center text-white font-interSemiBold">Ask for OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
