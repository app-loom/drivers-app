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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Verify Code</Text>
                <Text style={styles.subtitle}>
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
                style={styles.button}
                onPress={() => navigation.navigate("complete-profile")}
            >
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    header: {
        marginBottom: 40,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        color: "#555",
    },
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
    button: {
        backgroundColor: "#FFAC1C",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
