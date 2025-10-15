import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerOtp from '../ui/CustomerInteractions/CustomerOtp';
import Payment from '../ui/CustomerInteractions/Payment';
import DashboardTabs from '../Tabs/DashboardTabs';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="dashboard" component={DashboardTabs} />
      <Stack.Screen name="customer-otp" component={CustomerOtp} />
      <Stack.Screen name="payment" component={Payment} />
    </Stack.Navigator>
  )
}