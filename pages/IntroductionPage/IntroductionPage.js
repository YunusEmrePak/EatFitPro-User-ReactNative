import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { signInActions } from "../../redux/SignIn/signInSlice";
import { useEffect } from "react";

import Background from "../../assets/images/ProfileImages/FirstPage/rp0000.png";

export default function IntroductionPage({ navigation }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.signIn.token);

  const navigateSignIn = () => {
    navigation.navigate("SignIn");
  };

  const signUp = () => {
    navigation.navigate("SignUpFirst");
  };

  useEffect(() => {
    if (token) {
      navigation.navigate("ProfilePage");
    }
  }, [token]);

  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.signContainer}>
          <Pressable
            onPress={navigateSignIn}
            style={({ pressed }) => pressed && styles.pressedItem}
            android_ripple={{
              color: "#fff1fc",
            }}
          >
            <Text style={styles.text}>Sign In</Text>
          </Pressable>
        </View>

        <View style={styles.signContainer}>
          <Pressable
            onPress={signUp}
            style={({ pressed }) => pressed && styles.pressedItem}
            android_ripple={{
              color: "#fff1fc",
            }}
          >
            <Text style={styles.text}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>@EatFitPro 2024</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT + DEVICE_HEIGHT / 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  signContainer: {
    marginBottom: DEVICE_HEIGHT / 40,
    backgroundColor: "#684BB3",
    width: DEVICE_WIDTH / 2.8,
    height: DEVICE_HEIGHT / 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DEVICE_WIDTH / 80,
    borderLeftWidth: DEVICE_WIDTH / 250,
    borderRightWidth: DEVICE_WIDTH / 250,
    borderBottomWidth: DEVICE_WIDTH / 150,
    borderColor: "#7877AA",
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontSize: DEVICE_WIDTH / 20,
    textAlign: "center",
    width: DEVICE_WIDTH / 2.8,
    height: DEVICE_HEIGHT / 20,
    marginTop: DEVICE_HEIGHT / 40,
  },
  buttonContainer: {
    height: DEVICE_HEIGHT / 2.2,
  },
  nameContainer: {
    marginBottom: DEVICE_HEIGHT / 20,
  },
  name: {
    color: "white",
    fontSize: DEVICE_WIDTH / 15,
  },
  pressedItem: {
    opacity: 0.8,
  },
});
