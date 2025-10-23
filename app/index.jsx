import AppNavigation from "@/components/navigation/AppNavigation";
import AuthNavigation from "@/components/navigation/AuthNavigation";
import { getToken, getUserData } from "@/helpers/index";
import { useUserStore } from "@/store/user.store";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { setToken, setUserDetails, userDetails } = useUserStore((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (token) {
        const user = await getUserData();
        setToken(token);
        setUserDetails(user);
      } else {
        setUserDetails(null);
      }
      setLoading(false);
    };
    fetchToken();
  }, []);

  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (userDetails?.isVerified) {
    return <AppNavigation />;
  }

  if (!userDetails) {
    return <AuthNavigation initialRoute="home" />;
  }

  let initialRoute = "home";
  
  switch (userDetails?.regiStatus) {
    case "verif":
      initialRoute = "verify-otp";
      break;
    case "comprof":
      initialRoute = "complete-profile";
      break;
    case "setprof":
      initialRoute = "set-profile-pic";
      break;
    case "bankinfo":
      initialRoute = "add-bank-details";
      break;
    case "drivlic":
      initialRoute = "add-driving-license";
      break;
    case "submited":
      initialRoute = "submit-application";
      break;
    default:
      initialRoute = "sign-in";
      break;
  }

  return (
      <AuthNavigation initialRoute={initialRoute} />
  );
}
