import { useUserStore } from "@/store/user.store";
import axios from "axios";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn({ navigation }) {
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const userDetails = useUserStore((state) => state.userDetails);

  const [mobileNumber, setMobileNumber] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    if (!mobileNumber || !pass) {
      Toast.show({
        type: "error",
        text2: "Please make sure you completed all the fields",
        text1Style: {
          fontSize: 12,
          fontWeight: 400,
        },
        text2Style: {
          fontSize: 11,
          fontWeight: 400,
        },
      });
      return;
    }

    setIsLoading(true);
    const bodyTxt = {
      mobileNumber,
      password: pass,
    };
    const config = {};
    axios
      .post(`http://localhost:5000/user/login`, bodyTxt, config)
      .then((res) => {
        if (res.data.success) {
          setUserDetails(res.data.data);
          setIsLoading(false);
          navigation.navigate("verify-otp");
        } else {
          Toast.show({
            type: "error",
            text2: res.data.message,
            text2Style: {
              fontSize: 12,
              fontWeight: 400,
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView className="gap-5 bg-white auth-container">
      <View className="items-center justify-center text-center">
        <Text className="mb-2 text-4xl text-gray-800 font-interSemiBold">Sign In</Text>
        <Text className="text-xl text-gray-500 font-interRegular">Hi! Welcome back, you've been missed</Text>
      </View>

      <View className="px-6">
        <View className="gap-3 mb-4">
          <TextInput placeholder="Mobile Number" keyboardType="mobile number" autoCapitalize="none" className="field-input" value={mobileNumber} onChangeText={setMobileNumber} />
          <TextInput placeholder="Password" secureTextEntry={true} className="field-input" value={pass} onChangeText={setPass} />
        </View>

        <Text
          className="ml-2 text-xl text-gray-400 font-interRegular"
          // onPress={handleForgotPassword}
        >
          Forgot Password?
        </Text>

        <TouchableOpacity
          //   onPress={handleSignIn}
          onPress={() => navigation.replace("dashboard")}
          className="mt-5 btn-primary"
        >
          <Text className="btn-text">{isLoading ? "Signing in" : "Sign In"}</Text>
        </TouchableOpacity>
        <Text className="mt-5 text-xl text-center text-gray-400 font-interRegular">
          Dont have an account?{" "}
          <Text style={{ color: "#4294EB" }} onPress={() => navigation.navigate("sign-up")}>
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
