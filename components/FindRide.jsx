import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "./Navbar";
import DragableMap from "./ui/DragableMap";
import { useUserStore } from "@/store/user.store";
import ArrivalInfo from "./ui/CustomerInteractions/ArrivalInfo";

export default function FindRide({ navigation }) {
  const setIsLocationEnabled = useUserStore((state) => state.setIsLocationEnabled);
  const userDetails = useUserStore((state) => state.userDetails);

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAvailRides, setOpenAvailRides] = useState(false);
  const [openArrivalInfo, setOpenArrivalInfo] = useState(false);

  const fetchLocation = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied!");
        setIsLocationEnabled(false);
        setLoading(false);
        return;
      }

      setIsLocationEnabled(true);
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } catch (error) {
      setIsLocationEnabled(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  console.log(userDetails)

  const pickup1 = {
    customerName: "Tester",
    pickup: "New Bustand, Thanjavur",
    drop: "Verti E-Square, Thanjavur",
    fare: "₹ 180",
    distance: "5.2 km",
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-5 p-4">
        <Navbar navigation={navigation} />

        <View className="flex-row items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl">
          <View className="flex-row items-start gap-2">
            <FontAwesome name="rupee" size={22} color="#FFAC1C" />
            <Text className="text-xl text-gray-800 font-interSemiBold">Total Earned</Text>
          </View>
          <Text className="text-xl text-gray-800 font-interSemiBold">₹ 0.00</Text>
        </View>
      </View>
      <View className="flex-1 p-2" >
        <DragableMap loading={loading} location={location} fetchLocation={fetchLocation} />
      </View>
      <View className="px-4 pt-5">
        <TouchableOpacity className="btn-primary" onPress={() => setOpenAvailRides(true)}>
          <Text className="btn-text">Find a Ride</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={openAvailRides} onRequestClose={() => setOpenAvailRides(false)}>
        <View className="justify-end flex-1 bg-black/30">
          <View className="p-6 bg-white rounded-t-3xl">
            <Text className="mb-2 text-2xl text-gray-800 font-interSemiBold">Ride Request</Text>

            <View className="mb-4">
              <Text className="text-gray-700 font-interMedium">
                Customer: <Text className="font-interSemiBold">{pickup1?.customerName}</Text>
              </Text>
              <Text className="text-gray-700 font-interMedium">
                Pickup: <Text className="font-interSemiBold">{pickup1?.pickup}</Text>
              </Text>
              <Text className="text-gray-700 font-interMedium">
                Drop: <Text className="font-interSemiBold">{pickup1?.drop}</Text>
              </Text>
              <Text className="text-gray-700 font-interMedium">
                Distance: <Text className="font-interSemiBold">{pickup1?.distance}</Text>
              </Text>
              <Text className="text-gray-700 font-interMedium">
                Fare: <Text className="font-interSemiBold text-primary">{pickup1?.fare}</Text>
              </Text>
            </View>

            <View className="flex-row justify-between gap-4">
              <TouchableOpacity className="flex-1 py-3 border border-gray-300 rounded-full" onPress={() => setOpenAvailRides(false)}>
                <Text className="text-center text-gray-700 font-interSemiBold">Decline</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 py-3 rounded-full bg-primary"
                onPress={() => {
                  setOpenAvailRides(false);
                  setOpenArrivalInfo(true);
                  // alert("Ride Accepted");
                }}
              >
                <Text className="text-center text-white font-interSemiBold">Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ArrivalInfo visible={openArrivalInfo} onClose={() => setOpenArrivalInfo(false)} navigation={navigation} />
    </SafeAreaView>
  );
}
