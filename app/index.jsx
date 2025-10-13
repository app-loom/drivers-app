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
import DashboardTabs from "@/components/Tabs/DashboardTabs";

const Stack = createNativeStackNavigator();

export default function Index() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="sign-in" component={SignIn} />
        <Stack.Screen name="sign-up" component={SignUp} />
        <Stack.Screen name="verify-otp" component={VerifyOtp} />
        <Stack.Screen name="complete-profile" component={CompleteProfile} />
        <Stack.Screen name="set-profile-pic" component={SetProfilePicture} />
        <Stack.Screen name="add-bank-details" component={BankDetails} />
        <Stack.Screen name="add-driving-license" component={DrivingLicense} />
        <Stack.Screen name="submit-application" component={Submit} />
        <Stack.Screen name="customer-otp" component={CustomerOtp} />
        <Stack.Screen name="payment" component={Payment} />
        <Stack.Screen name="dashboard" component={DashboardTabs} />
      </Stack.Navigator>
    );
}