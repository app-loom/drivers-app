import { BASE_URL } from "@/constants/api-data";
import { useUserStore } from "@/store/user.store";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function BankDetails({ navigation }) {
  const userDetails = useUserStore((state) => state.userDetails);
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const token = useUserStore((state) => state.token);
  
  const [image, setImage] = useState(null);
  const [bankName, setBankName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
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

  const handleBankDetails = () => {
    // if (!image || !bankName || !accountNumber || !ifscCode) {
    //   Alert.alert("Error", "Please complete all the fields");
    //   return;
    // }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const bankAccountDetails = {
      imageUrl : image || 'testpassbook.com',
      ifsc : ifscCode,
      bank : bankName,
      accountNo : accountNumber,
    }

    const bodyTxt = {
      mobileNumber: userDetails?.mobileNumber,
      regiStatus: "drivlic",
      bankAccountDetails,
    };

    axios
      .post(`${BASE_URL}/user/update`, bodyTxt, config)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setUserDetails(res.data.data);
          navigation.navigate("add-driving-license");
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
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 15 }}
      >
        <View className="p-5 pt-10">
          <Text className="text-3xl text-center text-gray-800 font-interSemiBold">Bank Account Details</Text>
        </View>

        <View className="gap-4 px-4">
          <TextInput placeholder="Bank Name" value={bankName} onChangeText={setBankName} className="h-12 py-1 pl-4 border border-gray-300 rounded-lg placeholder:text-lg" />
          <TextInput placeholder="IFSC Code" value={ifscCode} onChangeText={setIfscCode} className="h-12 py-1 pl-4 border border-gray-300 rounded-lg placeholder:text-lg" />
          <TextInput placeholder="Account Number" value={accountNumber} onChangeText={setAccountNumber} className="h-12 py-1 pl-4 border border-gray-300 rounded-lg placeholder:text-lg" />
        </View>

        <View className="items-center px-4 mt-8">
          <TouchableOpacity className="flex items-center justify-center border border-gray-400 rounded-lg w-96 h-44" style={{ borderStyle: "dashed", borderWidth: 2 }} onPress={pickImage}>
            <Text className="text-lg text-gray-500 font-interRegular">Choose Document</Text>
          </TouchableOpacity>

          {image && (
            <View className="relative mt-4">
              <Image source={{ uri: image }} className="border border-gray-300 rounded-md h-44 w-44" />
              <TouchableOpacity className="absolute top-0 right-0" onPress={() => setImage(null)}>
                <Ionicons name="close-circle" size={24} color="#FFAC1C" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View className="gap-3 px-6 mt-8">
          {["Please share a clear photo of your bank passbook front page.", "Photo copies and printouts of documents will not be accepted.", "The photo and all the details must be clearly visible.", "Only documents less than 10MB and in JPG, JPEG, PNG, or PDF format will be accepted."].map((text, index) => (
            <View key={index} className="flex-row items-start gap-2">
              <Ionicons name="checkmark-circle" size={24} color="#FFAC1C" />
              <Text className="flex-1 text-gray-600 text-md font-interRegular">{text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="px-4 pb-5 bg-white border-t border-gray-100">
        <TouchableOpacity className="btn-primary" onPress={handleBankDetails}>
          <Text className="btn-text">Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
