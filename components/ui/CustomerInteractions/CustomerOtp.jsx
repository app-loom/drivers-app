import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";
import axios from "axios";

const CELL_COUNT = 4;

export default function CustomerOtp({ navigation }) {
  const [value, setValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const customerNumber = "+1234567890";

//   const handleVerify = async () => {
//     setIsVerifying(true);
//     const config = {};
//     const bodyTxt = { mobileNumber: customerNumber, otp: value };

//     try {
//       const res = await axios.post("http://localhost:5000/user/verifyotp", bodyTxt, config);
//       console.log(res.data);

//       if (res.data.success) {
//         Toast.show({
//           type: "success",
//           text1: "OTP Verified",
//           text2: "Customer verified successfully. Starting ride...",
//         });
//         navigation.navigate("ride-started"); 
//       } else {
//         Toast.show({
//           type: "error",
//           text1: "Verification Failed",
//           text2: res.data.message,
//           text2Style: { fontSize: 12, fontWeight: 400 },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       Toast.show({
//         type: "error",
//         text1: "Network Error",
//         text2: "Unable to verify OTP. Please try again.",
//         text2Style: { fontSize: 12, fontWeight: 400 },
//       });
//     } finally {
//       setIsVerifying(false);
//     }
//   };

  const handleResend = () => {
    console.log("Resend OTP pressed");
    Toast.show({
      type: "info",
      text1: "OTP Sent",
      text2: "A new OTP has been sent to the customer’s number.",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Toast />
      <View className="justify-center flex-1 px-6">
        <View className="items-center justify-center gap-2 mx-auto mb-3">
          <Text className="text-4xl text-gray-800 font-interSemiBold">OTP Verification</Text>
          <Text className="px-6 text-xl text-center text-gray-500">Enter Customer's OTP</Text>
          <Text className="px-6 text-center text-gray-400">We sent a PIN to your customer’s mobile number</Text>
          <Text className="text-primary font-interRegular">{customerNumber}</Text>
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
          //   onPress={handleVerify}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("payment")}
        >
          <Text className="btn-text">{isVerifying ? "Verifying..." : "Verify and Start Ride"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
