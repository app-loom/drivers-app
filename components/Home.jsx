import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function Home({ navigation }) {
    return (
        <View className="h-full">
            <View className="min-h-80">
                <ImageBackground
                    source={{
                        uri: "https://images.pexels.com/photos/5835281/pexels-photo-5835281.jpeg",
                    }}
                    className="items-center justify-center h-full "
                    resizeMode="cover"
                ></ImageBackground>
            </View>

            <View className="items-center justify-center p-10 space-y-3 ">
                <Text className="text-2xl text-center text-gray-800 font-interSemiBold">
                    <Text style={{ color: "#FFAC1C" }}>Earn Money</Text> With
                    This Driver App
                </Text>

                <Text className="mb-5 text-center text-gray-500 text-md font-interRegular px-15">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Expedita dolorum ut sit, maxime molestiae minus
                </Text>

                <TouchableOpacity
                    className="px-8 py-3 rounded-full bg-primary"
                    onPress={() => {
                        navigation.navigate("sign-up");
                    }}
                >
                    <Text className="text-sm text-white font-interSemiBold">
                        Let's Get Started
                    </Text>
                </TouchableOpacity>

                <Text className="text-sm text-gray-500 font-interRegular">
                    Already have an account?{" "}
                    <Text
                        onPress={() => navigation.navigate("sign-in")}
                        style={{
                            textDecorationLine: "underline",
                            textDecorationStyle: "solid",
                        }}
                        className="text-link"
                    >
                        Sign in
                    </Text>
                </Text>
            </View>
        </View>
    );
}
