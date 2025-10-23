import { BASE_URL } from "@/constants/api-data";
import { useUserStore } from "@/store/user.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function SignUp({ navigation }) {
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const setToken = useUserStore((state) => state.setToken);

  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setfullName] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (!fullName || !mobileNumber || !password || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Enter all the fields",
        text2: "Please make sure you've completed all the fields",
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

      if (password !== confirmPassword) {
        Toast.show({
          type: "error",
        text1: "Password mismatch",
        text2: "Please make sure both passwords are the same.",
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
      fullName,
      mobileNumber,
      password,
      regiStatus: "verif",
      otp: "1234", // Should remove this after implementing the otp validation
    };

    const config = {};

    axios
      .post(`${BASE_URL}/user/register`, bodyTxt, config)
      .then((res) => {
        if (res.data.success) {
          AsyncStorage.setItem("token", JSON.stringify(res.data.token));
          setUserDetails(res.data.user);
          setToken(res.data.token)
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
    <SafeAreaView className="bg-white auth-container">
      <Toast />
      <View className="items-center justify-center gap-3 mb-4">
        <Text className="text-3xl text-gray-800 font-interSemiBold">Create Account</Text>
        <Text className="text-lg text-gray-500">Join us and start earning today!</Text>
      </View>

      <View className="px-6">
        <View className="gap-5 mb-5">
          <TextInput placeholder="Full Name" value={fullName} onChangeText={setfullName} className=" field-input" />
          <TextInput placeholder="Mobile Number" value={mobileNumber} onChangeText={setmobileNumber} keyboardType="phone-pad" autoCapitalize="none" className="field-input" />
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} className="field-input" />
          <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} className="field-input" />
        </View>
        <TouchableOpacity
          className="my-5 btn-primary"
          // onPress={() => handleSignUp()}
          onPress={() => navigation.navigate("verify-otp")}
        >
          <Text className="btn-text">{isLoading ? "Creating your account..." : "Sign Up"}</Text>
        </TouchableOpacity>

        <Text className="mt-3 text-xl text-center text-gray-500 font-interRegular">
          Already have an account?{" "}
          <Text style={{ color: "#4294EB" }} onPress={() => navigation.navigate("sign-in")}>
            Sign In
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
