import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyOtp({ navigation }) {
    const [otp, setOtp] = useState(["", "", "", ""]);

    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleVerify = () => {
        console.log("Entered OTP:", otp.join(""));
    };

    const handleResend = () => {
        console.log("Resend OTP pressed");
    };

    return (
        <SafeAreaView className="auth-container">
            <View className="px-6">
                <View className="items-center">
                    <Text className="text-2xl text-gray-800 font-interSemiBold">
                        Verify Code
                    </Text>
                    <Text className="px-6 mb-5 text-center text-gray-500">
                        Please enter the code we just sent to your mobile number
                        xxxxx-xxxxx
                    </Text>
                </View>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={(value) => handleChange(value, index)}
                        />
                    ))}
                </View>

                <View style={styles.resendContainer}>
                    <Text style={styles.resendText}>Didn't receive OTP? </Text>
                    <Text style={styles.resendLink} onPress={handleResend}>
                        Resend Code
                    </Text>
                </View>

                <TouchableOpacity
                    className="btn-primary"
                    onPress={() => navigation.navigate("complete-profile")}
                >
                    <Text className="btn-text">Verify</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    otpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
        gap: 10,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        textAlign: "center",
        fontSize: 24,
    },
    resendContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
    },
    resendText: {
        fontSize: 14,
        color: "#555",
    },
    resendLink: {
        fontSize: 14,
        color: "#555",
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});
