import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import Profile from "@/components/Profile";
import Rides from "@/components/Rides";
import FindRide from "@/components/FindRide";

const Tabs = createBottomTabNavigator();

const TabIcon = ({ name, label, focused, color, size }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 70,
        paddingHorizontal: 4,
        transform: [{ scale: focused ? 1.1 : 1 }],
      }}
    >
      <Ionicons name={name} size={focused ? size + 3 : size} color={color} />
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
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          let label = "";

          switch (route.name) {
            case "find-ride":
              iconName = focused ? "car" : "car-outline";
              label = "Find Ride";
              break;
            case "rides":
              iconName = focused ? "list" : "list-outline";
              label = "Rides";
              break;
            case "profile":
              iconName = focused ? "person" : "person-outline";
              label = "Profile";
              break;
          }

          return <TabIcon name={iconName} label={label} focused={focused} color={focused ? "#FFAC1C" : "gray"} size={24} />;
        },
      })}
    >
      <Tabs.Screen name="find-ride" component={FindRide} />
      <Tabs.Screen name="rides" component={Rides} />
      <Tabs.Screen name="profile" component={Profile} />
    </Tabs.Navigator>
  );
}
