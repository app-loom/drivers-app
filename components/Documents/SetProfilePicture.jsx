import { BASE_URL } from "@/constants/api-data";
import { useUserStore } from "@/store/user.store";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function SetProfilePicture({ navigation }) {
  const userDetails = useUserStore((state) => state.userDetails);
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const token = useUserStore((state) => state.token);
  
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleProfilePic = () => {
    // if (!image) {
    //   Alert.alert("Error", "Please upload your profile picture");
    //   return;
    // }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const bodyTxt = {
      mobileNumber: userDetails?.mobileNumber,
      regiStatus: "bankinfo",
      profilePicture: image || 'testurl.com',
    };

    axios
      .post(`${BASE_URL}/user/update`, bodyTxt, config)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setUserDetails(res.data.data);
          navigation.navigate("add-bank-details");
        } else {
          Toast.show({
            type: "error",
            text1: "Update Failed",
            text2: res.data.message || "Something went wrong",
            text2Style: { fontSize: 12, fontWeight: "400" },
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Update Failed",
          text2: err.response?.data?.message || "Something went wrong",
          text2Style: { fontSize: 12, fontWeight: "400" },
        });
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView  showsVerticalScrollIndicator={false}>
        <View className="p-5 pt-10">
          <Text className="text-3xl text-center text-gray-800 font-interSemiBold">Profile Picture</Text>
        </View>

        <View className="gap-3 px-4">
          {["Please upload a clear selfie", "The selfie should have the applicant alone", "Accepted formats: JPEG / PNG"].map((text, index) => (
            <View key={index} className="flex-row items-center gap-2">
              <Ionicons name="checkmark-circle" size={24} color="#FFAC1C" />
              <Text className="text-gray-500 text-md">{text}</Text>
            </View>
          ))}
        </View>

        <View className="items-center justify-center mt-10">
          <TouchableOpacity onPress={pickImage} className="flex items-center justify-center px-5 py-2 border border-gray-400 rounded-lg w-96 h-52" style={{ borderStyle: "dashed" }}>
            <Text className="text-gray-500 text-md font-interRegular">Choose Image</Text>
          </TouchableOpacity>

          {image && (
            <View className="relative mt-5">
              <Image source={{ uri: image }} className="border border-gray-300 rounded-md w-44 h-44" />
              <TouchableOpacity className="absolute top-0 right-0" onPress={() => setImage(null)}>
                <Ionicons name="close-circle" size={24} color="#FFAC1C" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="px-4 pb-5 bg-white border-t border-gray-100">
        <TouchableOpacity className="btn-primary" onPress={handleProfilePic}>
          <Text className="btn-text">Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
