import { useUserStore } from "@/store/user.store";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { detailedMapStyle } from "@/constants/data";

export default function DragableMap({ location, loading, fetchLocation }) {
  const isLocationEnabled = useUserStore((state) => state.isLocationEnabled);

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
    <View className="flex-1 px-4 pb-4 overflow-hidden border border-gray-200 rounded-2xl">
      {loading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#FFAC1C" />
          <Text className="mt-2 text-gray-500">Loading Map...</Text>
        </View>
      ) : location ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          customMapStyle={detailedMapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
          />
        </MapView>
      ) : (
        <Text className="mt-4 text-center text-gray-500">Could not get your location</Text>
      )}
    </View>
  );
}
