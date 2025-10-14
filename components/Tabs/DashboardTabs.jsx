import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, Text } from "react-native";

import Profile from "@/components/Profile";
import Rides from "@/components/Rides";
import FindRide from "@/components/FindRide";
import Notifications from "@/components/Notifications";

const Tabs = createBottomTabNavigator();

const TabIcon = ({ iconLibrary, name, label, focused, color, size }) => {
  const IconComponent = iconLibrary === "material" ? MaterialIcons : Ionicons;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 70,
        paddingHorizontal: 4,
        // transform: [{ scale: focused ? 1.1 : 1 }],
      }}
    >
      <IconComponent name={name} size={size} color={color} />
      <Text
        style={{
          fontSize: 12,
          marginTop: 4,
          color: focused ? "#FFAC1C" : "#9CA3AF",
          fontFamily: focused ? "Inter-SemiBold" : "Inter-Regular",
          textAlign: "center",
          flexWrap: "nowrap",
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default function DashboardTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingBottom: 16,
          paddingTop: 14,
          height: 80,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -1 },
          shadowRadius: 5,
          // borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          let label = "";
          let iconLibrary = "ion";

          switch (route.name) {
            case "find-ride":
              iconName = focused ? "car" : "car-outline";
              label = "Find Ride";
              break;
            case "rides":
              iconName = "history";
              label = "Rides";
              iconLibrary = "material";
              break;
            case "notifications":
              iconName = focused ? 'notifications' :  "notifications-outline";
              label = "updates";
              break;
            case "profile":
              iconName = focused ? "person" : "person-outline";
              label = "Profile";
              break;
          }

          return (
            <TabIcon
              iconLibrary={iconLibrary}
              name={iconName}
              label={label}
              focused={focused}
              color={focused ? "#FFAC1C" : "gray"}
              size={24}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="find-ride" component={FindRide} />
      <Tabs.Screen name="rides" component={Rides} />
      <Tabs.Screen name="notifications" component={Notifications} />
      <Tabs.Screen name="profile" component={Profile} />
    </Tabs.Navigator>
  );
}
