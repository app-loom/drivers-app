import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "./Navbar";
import DragableMap from "./ui/DragableMap";
import { useUserStore } from "@/store/user.store";
import ArrivalInfo from "./ui/CustomerInteractions/ArrivalInfo";
import { BASE_URL, GOOGLE_MAPS_API_KEY } from "@/constants/api-data";
import axios from "axios";

const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371e3;
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export default function FindRide({ navigation }) {
  const setIsLocationEnabled = useUserStore((state) => state.setIsLocationEnabled);
  const userDetails = useUserStore((state) => state.userDetails);
  const setCoords = useUserStore((state) => state.setCoords);

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAvailRides, setOpenAvailRides] = useState(false);
  const [openArrivalInfo, setOpenArrivalInfo] = useState(false);
  const [openStartRide, setOpenStartRide] = useState(false);
  const mapRef = useRef();
  const liveTrackingRef = useRef(null);
  const [hasArrived, setHasArrived] = useState(false);

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

  const startLiveTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied!");
        setIsLocationEnabled(false);
        return;
      }
      setIsLocationEnabled(true);

      const subcription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 3000,
          distanceInterval: 1,
        },
        async (loc) => {
          const coords = loc?.coords;
          
          try {
            const res = await axios.post(`${BASE_URL}/user/updateLocation`, {
              driverId: userDetails._id,
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
            console.log(res.data)
            setLocation(res.data.location);
          } catch (err) {
            console.error("Failed to update driver location:", err.message);
          }
          if (pickup1?.destination) {
            const distance = getDistance(coords.latitude, coords.longitude, pickup1.destination.latitude, pickup1.destination.longitude);

            if (distance <= 50 && !hasArrived) {
              setHasArrived(true);
              setOpenArrivalInfo(true);
            }
          }
        }
      );

      liveTrackingRef.current = subcription;
    } catch (error) {
      console.error("Live tracking error:", error);
      setIsLocationEnabled(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchLocation();
    })();

    return () => {
      if (liveTrackingRef.current) {
        liveTrackingRef.current.remove();
        liveTrackingRef.current = null;
      }
    };
  }, []);

  const pickup1 = {
    customerName: "Shiyam",
    pickup: "Verti E-Square, Thanjavur",
    drop: "Trichy",
    fare: "₹ 180",
    distance: "5.2 km",
    origin: {
      latitude: location?.latitude,
      longitude: location?.longitude,
    },
    destination: {
      latitude: 10.827636290124847,
      longitude: 78.71065346791016,
    },
  };

  const getDirections = async (origin, destination) => {
    try {
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${GOOGLE_MAPS_API_KEY}&start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`;

      const res = await axios.get(url);

      if (res?.data.features?.length) {
        const routeCoords = res.data.features[0].geometry.coordinates.map(([lon, lat]) => ({
          latitude: lat,
          longitude: lon,
        }));

        setCoords(routeCoords);
        if (mapRef.current && routeCoords?.length > 0) {
          mapRef.current.fitToCoordinates(routeCoords, {
            edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
            animated: true,
          });
        }

        setOpenAvailRides(false);
        setOpenStartRide(true);
      } else {
        console.warn("No route found.");
      }
    } catch (error) {
      console.error("Route fetch error:", error.response?.data || error.message);
    }
  };

  const cancelRide = async () => {
    Alert.alert("Cancel Ride", "Are you sure you want to cancel this ride?", [
      { text: "No" },
      {
        text: "Yes, Cancel",
        style: "destructive",
        onPress: async () => {
          if (liveTrackingRef.current) {
            await liveTrackingRef.current.remove();
            liveTrackingRef.current = null;
          }
          setCoords([]);
          setOpenStartRide(false);
          setOpenArrivalInfo(false);
          setLocation(null);
          await fetchLocation();
          await axios.post(`${BASE_URL}/driver/cancelRide`, { driverId: userDetails._id });
        },
      },
    ]);
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

      <View className="flex-1 p-2">
        <DragableMap loading={loading} location={location} fetchLocation={fetchLocation} ref={mapRef} origin={pickup1.origin} destination={pickup1.destination} />
      </View>

      <View className="px-4 pt-5">
        <TouchableOpacity className="btn-primary" onPress={() => setOpenAvailRides(true)} disabled={userDetails?.isActingDriver}>
          <Text className="btn-text">Upcoming Rides</Text>
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
                  getDirections(pickup1.origin, pickup1.destination);
                }}
              >
                <Text className="text-center text-white font-interSemiBold">Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={openStartRide} onRequestClose={() => setOpenStartRide(false)}>
        <View className="justify-end flex-1 bg-black/30">
          <View className="p-6 bg-white shadow-lg rounded-t-3xl">
            <View className="pb-3 mb-4 border-b border-gray-200">
              <Text className="text-2xl text-center text-gray-800 font-interSemiBold">Ready to Start Ride?</Text>
              <Text className="mt-2 text-center text-gray-600">You can view the route on the map above before starting.</Text>
            </View>

            <TouchableOpacity
              className="py-3 mb-3 rounded-full bg-primary"
              onPress={async () => {
                await startLiveTracking();
                setOpenStartRide(false);
              }}
            >
              <Text className="text-center text-white font-interSemiBold">Start Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity className="py-3 border border-gray-300 rounded-full" onPress={cancelRide}>
              <Text className="text-center text-gray-700 font-interSemiBold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ArrivalInfo visible={openArrivalInfo} onClose={() => setOpenArrivalInfo(false)} navigation={navigation} />
    </SafeAreaView>
  );
}
