import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import VerifyOtp from '../Auth/VerifyOtp';
import CompleteProfile from '../Auth/CompleteProfile';
import SetProfilePicture from '../Documents/SetProfilePicture';
import BankDetails from '../Documents/BankDetails';
import DrivingLicense from '../Documents/DrivingLicense';
import Submit from '../Auth/Submit';
import Home from '../Home';

const Stack = createNativeStackNavigator();

export default function AuthNavigation({ initialRoute = "home" }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRoute}
    >
    <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="sign-in" component={SignIn} />
      <Stack.Screen name="sign-up" component={SignUp} />
      <Stack.Screen name="verify-otp" component={VerifyOtp} />
      <Stack.Screen name="complete-profile" component={CompleteProfile} />
      <Stack.Screen name="set-profile-pic" component={SetProfilePicture} />
      <Stack.Screen name="add-bank-details" component={BankDetails} />
      <Stack.Screen name="add-driving-license" component={DrivingLicense} />
      <Stack.Screen name="submit-application" component={Submit} />
    </Stack.Navigator>
  )
}