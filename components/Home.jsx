import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts,
} from "@expo-google-fonts/inter";
import React from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Home({ navigation }) {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={{
                        uri: "https://images.pexels.com/photos/5835281/pexels-photo-5835281.jpeg",
                    }}
                    style={styles.image}
                    resizeMode="cover"
                ></ImageBackground>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.heading}>
                    <Text style={{ color: "#FFAC1C" }}>Earn Money</Text> With
                    This Driver App
                </Text>

                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Expedita dolorum ut sit, maxime molestiae minus
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("sign-up");
                    }}
                >
                    <Text style={styles.buttonText}>Let's Get Started</Text>
                </TouchableOpacity>

                <Text style={styles.signInText}>
                    Already have an account?{" "}
                    <Text
                        onPress={() => navigation.navigate("sign-in")}
                        style={{
                            textDecorationLine: "underline",
                            textDecorationStyle: "solid",
                            color: "#4294EB",
                        }}
                    >
                        Sign in
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
    },
    heading: {
        fontSize: 22,
        fontFamily: "Inter_700Bold",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        width: 250,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        fontFamily: "Inter_400Regular",
        marginBottom: 20,
        paddingInline: 15,
    },
    button: {
        backgroundColor: "#FFAC1C",
        paddingBlock: 10,
        paddingInline: 10,
        borderRadius: 25,
        marginBottom: 15,
        alignItems: "center",
        width: 300,
    },
    buttonText: {
        fontFamily: "Inter_600SemiBold",
        fontWeight: "semibold",
        color: "#fff",
        fontSize: 15,
    },
    signInText: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
    },
});
