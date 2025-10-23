import { BASE_URL } from "@/constants/api-data";
import { useUserStore } from "@/store/user.store";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DrivingLicense({ navigation }) {
  const userDetails = useUserStore((state) => state.userDetails);
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const token = useUserStore((state) => state.token);

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [drivingLicenseNo, setDrivingLicenseNo] = useState("");

  const pickImage = async (side) => {
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
      const uri = result.assets[0].uri;
      side === "front" ? setFrontImage(uri) : setBackImage(uri);
    }
  };

  const handleDrivingLicense = () => {
    // if (!frontImage || !backImage || !drivingLicenceNo) {
    //   Alert.alert("Error", "Please complete all the fields");
    //   return;
    // }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const drivingLicence = {
      frontImage,
      backImage,
      drivingLicenseNo,
    };
    
    const bodyTxt = {
      mobileNumber: userDetails?.mobileNumber,
      regiStatus: "submited",
      drivingLicence,
    };

    axios
      .post(`${BASE_URL}/user/update`, bodyTxt, config)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setUserDetails(res.data.data);
          navigation.navigate("submit-application");
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-5 pt-10">
          <Text className="text-3xl text-center text-gray-800 font-interSemiBold">Driving License Upload</Text>
        </View>
        <View className="px-4 my-4">
          <TextInput placeholder="Driving License Number" value={drivingLicenseNo} onChangeText={setDrivingLicenseNo} className="h-12 py-1 pl-4 border border-gray-300 rounded-lg placeholder:text-lg" />
        </View>

        <View className="gap-3 px-4 mt-3">
          {["Photo copies and printouts of documents will not be accepted.", "The photo and all the details must be clearly visible.", "Only documents less than 10MB and in JPG, JPEG, PNG, or PDF format will be accepted."].map((text, index) => (
            <View key={index} className="flex-row items-start gap-2">
              <Ionicons name="checkmark-circle" size={24} color="#FFAC1C" />
              <Text className="flex-1 text-gray-500 text-md">{text}</Text>
            </View>
          ))}
        </View>

        <View className="items-center justify-center mt-10">
          <View className="flex-row items-center justify-center gap-3 ">
            {[
              { label: "Upload Front Side", side: "front" },
              { label: "Upload Back Side", side: "back" },
            ].map(({ label, side }) => (
              <TouchableOpacity key={side} onPress={() => pickImage(side)} className="flex items-center justify-center px-5 py-2 border border-gray-400 rounded-lg w-52 h-44" style={{ borderStyle: "dashed" }}>
                <Text className="text-center text-gray-500 text-md font-interRegular">{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="px-4 mt-6">
            <Text className="px-4 text-center text-gray-600 text-md font-interRegular">
              <Text className="text-primary">Note:</Text> Please upload both front and back sides of your driving license.
            </Text>
          </View>

          <View className="flex-row items-center justify-center gap-3 pt-6">
            {frontImage && (
              <View className="relative">
                <Image source={{ uri: frontImage }} className="h-24 border border-gray-300 rounded-md w-44" />
                <Ionicons name="close-circle" size={24} color="#FFAC1C" className="absolute top-0 right-0" onPress={() => setFrontImage(null)} />
              </View>
            )}

            {backImage && (
              <View className="relative">
                <Image source={{ uri: backImage }} className="h-24 border border-gray-300 rounded-md w-44" />
                <Ionicons name="close-circle" size={24} color="#FFAC1C" className="absolute top-0 right-0" onPress={() => setBackImage(null)} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View className="px-4 pb-5 mt-10">
        <TouchableOpacity className="btn-primary" 
        onPress={handleDrivingLicense}
        // onPress={() => navigation.navigate("submit-application")}
        >
          <Text className="btn-text">Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
