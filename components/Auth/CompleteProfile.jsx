import { BASE_URL } from "@/constants/api-data";
import { useUserStore } from "@/store/user.store";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CompleteProfile({ navigation }) {
  const userDetails = useUserStore((state) => state.userDetails);
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const token = useUserStore((state) => state.token);

  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [skill, setSkill] = useState("");
  const [exp, setExp] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [accepted, setAccepted] = useState(false);

const handleContinue = () => {
  if (!gender || !city || !age || !exp || !skill) {
    Alert.alert("Error", "Please complete all the fields");
    return;
  }

  if (!accepted) {
    Alert.alert("Error", "Please accept the Terms & Conditions to proceed");
    return;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const bodyTxt = {
    mobileNumber: userDetails?.mobileNumber,
    regiStatus: "comprof",
    gender,
    city,
    age,
    experience: exp,
    skills: skill,
  };

  axios
    .post(`${BASE_URL}/user/update`, bodyTxt, config)
    .then((res) => {
      if (res.data.success) {
        console.log(res.data)
        setUserDetails(res.data.data); 
        navigation.navigate("set-profile-pic");
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
    <SafeAreaView className="bg-white auth-container">
      <View className="px-6">
        <View className="gap-4 mb-4">
          <Text className="text-4xl text-center font-interSemiBold">Complete Your Profile</Text>
          <Text className="text-lg text-center text-gray-400 font-interRegular">Don't worry, only you can see your personal data. No one else will be able to see it.</Text>
        </View>

        <View className="mt-4">
          <View className="gap-3">
            <TextInput placeholder="Age" autoCapitalize="none" keyboardType="number-pad" className="field-input" value={age} onChangeText={setAge} />
            <TextInput placeholder="Email (optional)" autoCapitalize="none" keyboardType="email-address" className="field-input" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Years of Experience" autoCapitalize="none" keyboardType="number-pad" className="field-input" value={exp} onChangeText={setExp} />
            <TextInput placeholder="City" autoCapitalize="none" keyboardType="default" className="field-input" value={city} onChangeText={setCity} />

            <View style={styles.pickerWrapper}>
              <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.picker}>
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            <View style={styles.pickerWrapper}>
              <Picker selectedValue={skill} onValueChange={(itemValue) => setSkill(itemValue)} style={styles.picker}>
                <Picker.Item label="Select Skill" value="" />
                <Picker.Item label="Manual" value="Manual" />
                <Picker.Item label="Automatic" value="Automatic" />
                <Picker.Item label="Both" value="Manual & Automatic" />
              </Picker>
            </View>

            <View className="flex-row gap-3 py-4">
              <Checkbox value={accepted} onValueChange={setAccepted} text="I agree to the Terms & Conditions" fillColor="#FFAC1C" color={`#FFAC1C`} />
              <Text className="text-xl font-interRegular">
                Accept with <Text className="underline text-primary font-interSemiBold">Terms & Condition</Text>
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="mt-5 btn-primary"
            onPressIn={handleContinue}
            // onPress={() => navigation.navigate("set-profile-pic")}
          >
            <Text className="btn-text">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    height: 55,
    width: "100%",
    borderColor: "#d1d5db",
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    overflow: "hidden",
  },
  picker: {
    color: "#817E7E",
    width: "100%",
    height: "100%",
  },
});
