import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";

import CompleteProfile from "@/components/Auth/CompleteProfile";
import SetProfilePicture from "@/components/Documents/SetProfilePicture";
import VerifyOtp from "@/components/Auth/VerifyOtp";
import Home from "@/components/Home";
import SignIn from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import BankDetails from "@/components/Documents/BankDetails";
import DrivingLicense from "@/components/Documents/DrivingLicense";
import Submit from "@/components/Auth/Submit";
import FindRide from "@/components/FindRide";
import Profile from "@/components/Profile";
import CustomerOtp from "@/components/ui/CustomerInteractions/CustomerOtp";
import Payment from "@/components/ui/CustomerInteractions/Payment";

const Stack = createNativeStackNavigator();

export default function Index() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="sign-in"
                options={{ headerShown: false }}
                component={SignIn}
            />
            <Stack.Screen
                name="sign-up"
                options={{ headerShown: false }}
                component={SignUp}
            />
            <Stack.Screen
                name="verify-otp"
                options={{ headerShown: false }}
                component={VerifyOtp}
            />
            <Stack.Screen
                name="complete-profile"
                options={{ headerShown: false }}
                component={CompleteProfile}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="set-profile-pic"
                component={SetProfilePicture}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="add-bank-details"
                component={BankDetails}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="add-driving-license"
                component={DrivingLicense}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="submit-application"
                component={Submit}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="find-ride"
                component={FindRide}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="profile"
                component={Profile}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="customer-otp"
                component={CustomerOtp}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="payment"
                component={Payment}
            />
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
