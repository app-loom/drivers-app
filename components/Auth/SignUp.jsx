import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp({ navigation }) {
    const handleSignUp = () => {
        console.log("Sign Up pressed");
    };

    return (
        <SafeAreaView className="auth-container">
            <View className="items-center justify-center mb-4">
                <Text className="text-2xl text-gray-800 font-interSemiBold">
                    Create Account
                </Text>
                <Text className="text-base text-gray-500">
                    Join us and start earning today!
                </Text>
            </View>

            <View className="px-6">
                <View className="mb-5 space-y-3">
                    <TextInput
                        placeholder="Full Name"
                        className="text-gray-400 font-interRegular field-input"
                    />
                    <TextInput
                        placeholder="Mobile Number"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        className="text-gray-400 font-interRegular field-input"
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        className="text-gray-400 font-interRegular field-input"
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        className="text-gray-400 font-interRegular field-input"
                    />
                </View>
                <TouchableOpacity
                    className="btn-primary"
                    onPress={() => navigation.navigate("verify-otp")}
                >
                    <Text className="btn-text">Sign Up</Text>
                </TouchableOpacity>

                <Text className="mt-3 text-sm text-center text-gray-500 font-interRegular">
                    Already have an account?{" "}
                    <Text
                        style={{ color: "#4294EB" }}
                        onPress={() => navigation.navigate("SignIn")}
                    >
                        Sign In
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}
