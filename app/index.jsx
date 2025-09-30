import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";

import Home from "@/components/Home";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import VerifyOtp from "@/components/Auth/VerifyOtp";
import CompleteProfile from "@/components/Auth/CompleteProfile";
import SetProfilePicture from "@/components/Auth/SetProfilePicture";

const Stack = createNativeStackNavigator();

export default function Index() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="sign-in" component={SignIn} />
            <Stack.Screen name="sign-up" component={SignUp} />
            <Stack.Screen name="verify-otp" component={VerifyOtp} />
            <Stack.Screen name="complete-profile" component={CompleteProfile} />
            <Stack.Screen name="set-profile-pic" component={SetProfilePicture} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});
