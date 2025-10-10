import { Picker } from "@react-native-picker/picker";
import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CompleteProfile({ navigation }) {
    const [email, setEmail] = useState("");
    const [carNo, setCarNo] = useState('');
    const [carName, setCarName] = useState('');
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [accepted, setAccepted] = useState(false);

    const handleContinue = () => {
        if ( !gender || !city || !accepted) {
            Alert.alert(
                "Error",
                "Please complete all fields and accept Terms & Conditions"
            );
            return;
        }
        
        console.log({ email, gender, city, accepted, regiStatus : 'setProPic' });
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
              <TextInput placeholder="Email (optional)" autoCapitalize="none" keyboardType="email-address" className="field-input" value={email} onChangeText={setEmail} />
              <TextInput placeholder="Car Name" autoCapitalize="none" keyboardType="default" className="field-input" value={carName} onChangeText={setCarName} />
              <TextInput placeholder="Car Number" autoCapitalize="none" keyboardType="default" className="field-input" value={carNo} onChangeText={setCarNo} />

              <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.pickerWrapper}>
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>

              <Picker selectedValue={city} onValueChange={(itemValue) => setCity(itemValue)} style={styles.pickerWrapper}>
                <Picker.Item label="Select City" value="" />
                <Picker.Item label="City 1" value="City 1" />
                <Picker.Item label="City 2" value="City 2" />
                <Picker.Item label="City 3" value="City 3" />
              </Picker>

              <View className="flex-row gap-3 py-4">
                <Checkbox value={accepted} onValueChange={setAccepted} text="I agree to the Terms & Conditions" fillColor="#FFAC1C" color={`#FFAC1C`} />
                <Text className="text-xl font-interRegular">
                  Accept with <Text className="underline text-primary font-interSemiBold">Terms & Condition</Text>
                </Text>
              </View>
            </View>

            <TouchableOpacity className="mt-5 btn-primary" onPress={() => navigation.navigate("set-profile-pic")}>
              <Text className="btn-text">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    height: 50,
    width: "100%",
    borderColor: "#d1d5db",
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
    color: "#817E7E",
  },
});
