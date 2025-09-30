import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts,
} from "@expo-google-fonts/inter";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn({ navigation }) {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    if (!fontsLoaded) return null;

    const handleForgotPassword = () => {
        console.log("Forgot Password pressed");
    };

    const handleSignIn = () => {
        console.log("Sign In pressed");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.subtitle}>
                    Hi! Welcome back, you've been missed
                </Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    placeholder="Mobile Number"
                    keyboardType="mobile number"
                    autoCapitalize="none"
                    style={[styles.input, { fontFamily: "Inter_400Regular" }]}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={[styles.input, { fontFamily: "Inter_400Regular" }]}
                />

                <Text
                    style={[styles.forgotPassword]}
                    onPress={handleForgotPassword}
                >
                    Forgot Password?
                </Text>

                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={[styles.buttonText]}>Sign In</Text>
                </TouchableOpacity>
                <Text
                    style={[
                        styles.signUpText,
                    ]}
                >
                    Dont have an account? {" "}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    header: {
        marginBottom: 30,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: "Inter_700Bold",
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        fontFamily: "Inter_400Regular",
    },
    form: {
        width: "100%",
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 15,
        color: "#817E7E",
        fontFamily: "Inter_400Regular",
    },
    forgotPassword: {
        color: "#817E7E",
        marginBottom: 20,
        marginTop: 10,
        fontFamily: "Inter_400Regular",
        fontWeight: "400",
        fontSize: 14,
    },
    button: {
        backgroundColor: "#FFAC1C",
        paddingVertical: 13,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        fontWeight: "semibold",
    },
    signUpText: {
        textAlign: "center",
        marginTop: 15,
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Inter_400Regular",
        color: "#817E7E",
    },
});
