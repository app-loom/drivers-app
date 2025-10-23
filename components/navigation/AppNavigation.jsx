import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AccountDetails from '../Profile/AccountDetails';
import BankInfo from '../Profile/BankInfo';
import HelpCenter from '../Profile/HelpCenter';
import Logout from '../Profile/Logout';
import PrivacyPolicy from '../Profile/PrivacyPolicy';
import ViewDocuments from '../Profile/ViewDocuments';
import DashboardTabs from '../Tabs/DashboardTabs';
import CustomerOtp from '../ui/CustomerInteractions/CustomerOtp';
import Payment from '../ui/CustomerInteractions/Payment';

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
      <Stack.Screen name="profile-details" component={AccountDetails} />
      <Stack.Screen name="bank-info" component={BankInfo} />
      <Stack.Screen name="view-documents" component={ViewDocuments} />
      <Stack.Screen name="privacy-policy" component={PrivacyPolicy} />
      <Stack.Screen name="help-center" component={HelpCenter} />
      {/* <Stack.Screen name="logout" component={Logout} /> */}
    </Stack.Navigator>
  )
}