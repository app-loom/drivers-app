import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { useUserStore } from "@/store/user.store";
import { getToken, getUser, getUserData } from "@/helpers/index";
import AppNavigation from "@/components/navigation/AppNavigation";
import AuthNavigation from "@/components/navigation/AuthNavigation";

export default function Index() {
  const setToken = useUserStore((state) => state.setToken);
  const setUserDetails = useUserStore((state) => state.setUserDetails);

  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (token) {
        const user = await getUserData();
        setToken(token);
        setUserDetails(user);
        setHasToken(true);
      } else {
        setHasToken(false);
      }
      setLoading(false);
    };
    fetchToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return hasToken ? <AppNavigation /> : <AuthNavigation />;
}
