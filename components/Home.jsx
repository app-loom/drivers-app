import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({ navigation }) {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                <ImageBackground
                    source={{
                        uri: "https://images.pexels.com/photos/5835281/pexels-photo-5835281.jpeg",
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>

            <View className="items-center justify-center flex-1 gap-6 p-6">
                <Text className="text-5xl leading-snug text-center text-gray-800 font-interBold">
                    <Text style={{ color: "#FFAC1C" }}>Earn Money</Text> With This Driver App
                </Text>

                <Text className="px-4 text-xl text-center text-gray-500 font-interRegular">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita dolorum ut sit, maxime molestiae minus
                </Text>

                <TouchableOpacity
                    className="btn-primary"
                    onPress={() => navigation.navigate("sign-up")}
                >
                    <Text className="btn-text">
                        Let's Get Started
                    </Text>
                </TouchableOpacity>

                <Text className="text-xl text-gray-500 font-interRegular">
                    Already have an account?{" "}
                    <Text
                        onPress={() => navigation.navigate("sign-in")}
                        style={{ textDecorationLine: "underline", textDecorationStyle: "solid" }}
                        className="text-link"
                    >
                        Sign in
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}
