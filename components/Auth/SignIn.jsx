import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn({ navigation }) {
    const [mobileNum, setMobileNum] = useState("");
    const [pass, setPass] = useState("");

    const handleSignIn = () => {
        console.log(mobileNum, pass);
    };

    return (
        <SafeAreaView className="space-y-5 auth-container">
            <View className="items-center justify-center text-center">
                <Text className="mb-2 text-2xl text-gray-800 font-interSemiBold">
                    Sign In
                </Text>
                <Text className="text-sm text-gray-500 font-interRegular">
                    Hi! Welcome back, you've been missed
                </Text>
            </View>

            <View className="px-6">
                <View className="mb-4 space-y-3">
                    <TextInput
                        placeholder="Mobile Number"
                        keyboardType="mobile number"
                        autoCapitalize="none"
                        className="text-gray-400 font-interRegular field-input "
                        value={mobileNum}
                        onChangeText={setMobileNum}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        className="text-gray-400 font-interRegular field-input "
                        value={pass}
                        onChangeText={setPass}
                    />
                </View>

                <Text
                    className="ml-2 text-gray-400 font-interRegular "
                    // onPress={handleForgotPassword}
                >
                    Forgot Password?
                </Text>

                <TouchableOpacity
                    onPress={handleSignIn}
                    className="mt-5 btn-primary"
                >
                    <Text className="btn-text">Sign In</Text>
                </TouchableOpacity>
                <Text className="mt-5 text-center text-gray-400 font-interRegular">
                    Dont have an account?{" "}
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
