import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../Profile';
import AccountDetails from '../Profile/AccountDetails';
import BankInfo from '../Profile/BankInfo';
import ViewDocuments from '../Profile/ViewDocuments';
import PrivacyPolicy from '../Profile/PrivacyPolicy';
import HelpCenter from '../Profile/HelpCenter';
import EditProfile from '../Profile/EditProfile';

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackNavigation() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="profile" component={Profile} />
      <ProfileStack.Screen name="profile-details" component={AccountDetails} />
      <ProfileStack.Screen name="edit-profile" component={EditProfile} />
      <ProfileStack.Screen name="bank-info" component={BankInfo} />
      <ProfileStack.Screen name="view-documents" component={ViewDocuments} />
      <ProfileStack.Screen name="privacy-policy" component={PrivacyPolicy} />
      <ProfileStack.Screen name="help-center" component={HelpCenter} />
    </ProfileStack.Navigator>
  );
}
