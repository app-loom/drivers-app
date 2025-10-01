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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [accepted, setAccepted] = useState(false);

    const handleContinue = () => {
        if (!name || !email || !gender || !city || !accepted) {
            Alert.alert(
                "Error",
                "Please complete all fields and accept Terms & Conditions"
            );
            return;
        }
        console.log({ name, email, gender, city, accepted });
    };

    return (
        <SafeAreaView className="auth-container">
            <View className="px-6">
                <View className="mb-4 space-y-1">
                    <Text className="text-2xl text-center font-interSemiBold">
                        Complete Your Profile
                    </Text>
                    <Text className="text-xs text-center text-gray-400 font-interRegular">
                        Don't worry, only you can see your personal data. No one
                        else will be able to see it.
                    </Text>
                </View>

                <View>
                    <View className="space-y-3" >
                        <TextInput
                            placeholder="Name"
                            autoCapitalize="words"
                            className="text-gray-400 font-interRegular field-input"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            className="text-gray-400 font-interRegular field-input"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue) => setGender(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item
                                style={{}}
                                label="Select Gender"
                                value=""
                            />
                            <Picker.Item style={{}} label="Male" value="male" />
                            <Picker.Item
                                style={{}}
                                label="Female"
                                value="female"
                            />
                            <Picker.Item
                                style={{}}
                                label="Other"
                                value="other"
                            />
                        </Picker>

                        <Picker
                            selectedValue={city}
                            onValueChange={(itemValue) => setCity(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select City" value="" />
                            <Picker.Item label="City 1" value="City 1" />
                            <Picker.Item label="City 2" value="City 2" />
                            <Picker.Item label="City 3" value="City 3" />
                        </Picker>

                        <View style={styles.checkboxContainer} className="py-4" >
                            <Checkbox
                                isChecked={accepted}
                                onPress={(isChecked) => setAccepted(isChecked)}
                                text="I agree to the Terms & Conditions"
                                fillColor="#FFAC1C"
                                textStyle={styles.checkboxText}
                            />
                            <Text>
                                By Accept, you agree to company
                                <Text style={styles.terms}>
                                    Terms & Condition
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("set-profile-pic")}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    form: {
        width: "100%",
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        fontFamily: "Inter_400Regular",
        color: "#817E7E",
    },
    picker: {
        width: "100%",
        height: 40,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 15,
        justifyContent: "center",
        color: "#817E7E",
    },
    checkboxContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 20,
    },
    checkboxText: {
        textDecorationLine: "none",
        fontSize: 14,
    },
    button: {
        backgroundColor: "#FFAC1C",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    terms: {
        color: "#817E7E",
        fontSize: 13,
        paddingLeft: 3,
        textDecorationLine: "underline",
    },
});
