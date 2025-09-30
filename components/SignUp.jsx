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

export default function SignUp({ navigation }) {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    if (!fontsLoaded) return null;

    const handleSignUp = () => {
        console.log("Sign Up pressed");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>
                    Join us and start earning today!
                </Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    placeholder="Full Name"
                    style={[styles.input, { fontFamily: "Inter_400Regular" }]}
                />
                <TextInput
                    placeholder="Mobile Number"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    style={[styles.input, { fontFamily: "Inter_400Regular" }]}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={[styles.input, { fontFamily: "Inter_400Regular" }]}
                />
                <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    style={[styles.input, { fontFamily: "Inter_400Regular" }]}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("verify-otp")}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            { fontFamily: "Inter_700Bold" },
                        ]}
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>

                <Text
                    style={[
                        styles.signInText,
                        { fontFamily: "Inter_600SemiBold" },
                    ]}
                >
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
        fontFamily: "Inter_400Regular",
        color: "#817E7E",
    },
    button: {
        backgroundColor: "#FFAC1C",
        paddingVertical: 13,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 10,
        flex: 1,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    signInText: {
        textAlign: "center",
        marginTop: 15,
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Inter_400Regular",
        color: "#817E7E",
    },
});
