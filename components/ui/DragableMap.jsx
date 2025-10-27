import { useUserStore } from "@/store/user.store";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline, AnimatedRegion, Animated as AnimatedMarker } from "react-native-maps";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { detailedMapStyle } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";

export default function DragableMap({ location, loading, fetchLocation, ref, origin, destination, distance, duration }) {
  const isLocationEnabled = useUserStore((state) => state.isLocationEnabled);
  const coords = useUserStore((state) => state.coords);

  const [driverPosition] = useState(
    new AnimatedRegion({
      latitude: location?.latitude || 0,
      longitude: location?.longitude || 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  );

  useEffect(() => {
    if (origin && destination && coords?.length > 0 && ref?.current) {
      ref.current.fitToCoordinates(coords, {
        edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
        animated: true,
      });
    }
  }, [coords, origin, destination]);

  useEffect(() => {
    if (location && ref?.current) {
      ref.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  useEffect(() => {
    if (location) {
      driverPosition
        .timing({
          latitude: location.latitude,
          longitude: location.longitude,
          duration: 1000,
          useNativeDriver: false,
        })
        .start();
    }
  }, [location]);

  if (!isLocationEnabled) {
    return (
      <View className="items-center justify-center flex-1 border border-gray-200 rounded-2xl bg-gray-50">
        <Text className="mb-4 text-lg text-gray-700 font-interRegular">Location access is disabled</Text>
        <TouchableOpacity onPress={fetchLocation} className="flex-row items-center gap-2 px-3 py-2 btn-secondary">
          <FontAwesome name="location-arrow" size={24} color="#FFAC1C" />
          <Text className="btn-text-secondary font-interRegular">Enable Location</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 overflow-hidden border border-gray-200 rounded-2xl">
      {loading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#FFAC1C" />
          <Text className="mt-2 text-gray-500">Loading Map...</Text>
        </View>
      ) : location ? (
        <MapView
          ref={ref}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          customMapStyle={detailedMapStyle}
          showsUserLocation={false}
          showsMyLocationButton={true}
        >
          {origin && destination ? (
            <>
              <Marker.Animated coordinate={origin} title="Pickup">
                <View
                  style={{
                    backgroundColor: "#FFAC1C",
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 25,
                    padding: 6,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                >
                  <Ionicons name="car-outline" size={22} color="#fff" />
                </View>
              </Marker.Animated>

              <Marker coordinate={destination} title="Customer">
                <View
                  style={{
                    backgroundColor: "#FFAC1C",
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 25,
                    padding: 6,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                >
                  <Ionicons name="location-outline" size={22} color="#fff" />
                </View>
              </Marker>

              {coords?.length > 0 && <Polyline coordinates={coords} strokeColor="#FFAC1C" strokeWidth={4} />}
            </>
          ) : (
            <Marker.Animated coordinate={driverPosition} title="You are here" anchor={{ x: 0.5, y: 0.5 }} centerOffset={{ x: 0, y: 0 }}>
              <View
                style={{
                  backgroundColor: "#FFAC1C",
                  borderColor: "#fff",
                  borderWidth: 2,
                  borderRadius: 25,
                  padding: 6,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Ionicons name="car-outline" size={22} color="#000" />
              </View>
            </Marker.Animated>
          )}
        </MapView>
      ) : (
        <Text className="mt-4 text-center text-gray-500">Could not get your location</Text>
      )}
    </View>
  );
}
