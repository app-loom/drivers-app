import { BASE_URL } from "@/constants/api-data";
import { useUserStore } from "@/store/user.store";
import axios from "axios";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const CELL_COUNT = 4;

export default function VerifyOtp({ navigation }) {
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const userDetails = useUserStore((state) => state.userDetails);
  const token = useUserStore((state) => state.token);
  
  const [isVerifying, setIsVerifying] = useState(false);

  const [value, setValue] = useState("");

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleVerify = () => {
    if (!value) {
      Toast.show({
        type: "error",
        text1: "Please enter the OTP",
        text2Style: { fontSize: 12, fontWeight: 400 },
      });
      return;
    }

    setIsVerifying(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const bodyTxt = { mobileNumber: userDetails?.mobileNumber, otp: value, regiStatus: "comprof", };

    axios
      .post(`${BASE_URL}/user/verifyotp`, bodyTxt, config)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setUserDetails(res.data.data);
          Toast.show({
            type: "success",
            text1: "Verification Success",
            text2: res.data.message,
            text2Style: { fontSize: 12, fontWeight: 400 },
          });
          setTimeout(() => {
            navigation.navigate("complete-profile");
          }, 1500);
        } else {
          Toast.show({
            type: "error",
            text1: "Verification Failed",
            text2: res.data.message,
            text2Style: { fontSize: 12, fontWeight: 400 },
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Verification Failed",
          text2: err.response?.data?.message || "Something went wrong",
          text2Style: { fontSize: 12, fontWeight: 400 },
        });
      })
      .finally(() => {
        setIsVerifying(false);
      });
  };

  const handleResend = () => {
    Toast.show({
      type: "info",
      text1: "OTP Resent",
      text2: "Please check your mobile for the new OTP",
      text2Style: { fontSize: 12, fontWeight: 400 },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Toast />
      <View className="justify-center flex-1 px-6">
        <View className="items-center justify-center gap-2 mx-auto mb-3">
          <Text className="text-3xl text-gray-800 font-interSemiBold">Verify Code</Text>
          <Text className="px-6 text-xl text-center text-gray-500">Please enter the code we just sent to your mobile number</Text>
          <Text className="text-primary font-interRegular">{userDetails?.mobileNumber}</Text>
        </View>

        <View className="items-center mb-8">
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={{ justifyContent: "center" }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View key={index} onLayout={getCellOnLayoutHandler(index)} className={`w-14 h-14 mx-1 border rounded-xl items-center justify-center ${isFocused ? "border-primary" : "border-gray-300"}`}>
                <Text className="text-xl text-gray-800">{symbol || (isFocused ? <Cursor /> : null)}</Text>
              </View>
            )}
          />
        </View>

        <View className="flex-row justify-center mb-8">
          <Text className="text-xl text-gray-500">Didn't receive OTP? </Text>
          <Text className="text-xl font-bold underline text-primary" onPress={handleResend}>
            Resend Code
          </Text>
        </View>

        <TouchableOpacity
          className="btn-primary"
          onPress={handleVerify}
          // onPress={() => navigation.navigate("complete-profile")}
        >
          <Text className="btn-text">{isVerifying ? "Verifying..." : "Verify"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
