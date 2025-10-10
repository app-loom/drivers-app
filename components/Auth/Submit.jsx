import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Submit() {
    return (
        <SafeAreaView className="flex-1">
            <View className="items-center justify-center flex-1 gap-2 px-4">
                <Ionicons name="checkmark-circle" size={100} color="#FFAC1C" />
                <Text className="text-4xl text-center text-gray-800 font-interSemiBold">
                    Application Submitted for Verification
                </Text>

                <View className="max-w-sm mt-3">
                    <Text className="text-xl text-center text-gray-500">
                        We will get in touch in 48 working hours. Be ready for
                        your ride!
                    </Text>
                </View>
            </View>
            <View className="px-4 pb-5">
                <TouchableOpacity className="btn-primary">
                    <Text className="btn-text">Got it</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
