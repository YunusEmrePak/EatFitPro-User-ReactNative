import { Pressable, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import Logo from "../../components/Logo/Logo";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signInActions } from "../../redux/SignIn/signInSlice";
import { useEffect } from "react";
import SignInForm from "../../components/Forms/SignInForm/SignInForm";

export default function SignInPage({ navigation }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.signIn.token);

  const navigateSignUp = () => {
    navigation.navigate("SignUpFirst");
  };

  useEffect(() => {
    if (token) {
      // navigation.navigate("Profile");
      navigation.navigate("Panel");
    }
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Logo />
      </View>
      <SignInForm navigation={navigation} />
      <View style={styles.newToEFP}>
        <Text style={styles.efpText}>New to EFP?</Text>
        <Pressable onPress={navigateSignUp}>
          <Text style={styles.signUpButton}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: DEVICE_HEIGHT / 5,
  },
  logo: {
    marginBottom: DEVICE_HEIGHT / 40,
  },
  form: {
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "red",
    height: DEVICE_HEIGHT / 3.5,
  },
  signUpContainer: {
    marginTop: DEVICE_HEIGHT / 20,
  },
  email: {
    width: DEVICE_WIDTH / 1.5,
  },
  password: {
    width: DEVICE_WIDTH / 1.5,
    marginTop: DEVICE_HEIGHT / 80,
  },
  forgotPassword: {
    alignItems: "flex-end",
    width: DEVICE_WIDTH / 1.65,
  },
  forgotText: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: DEVICE_WIDTH / 24,
  },
  signInButton: {
    alignItems: "center",
    justifyContent: "center",
    width: DEVICE_WIDTH / 1.5,
    height: DEVICE_HEIGHT / 20,
    backgroundColor: "#690770",
    borderRadius: 10,
  },
  signInButtonText: {
    color: "white",
    fontSize: DEVICE_WIDTH / 20,
  },
  newToEFP: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: DEVICE_WIDTH / 2.4,
  },
  efpText: {
    fontSize: DEVICE_WIDTH / 24,
  },
  signUpButton: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: DEVICE_WIDTH / 24,
  },

  signContainer: {
    marginTop: DEVICE_HEIGHT / 20,
    backgroundColor: "red",
    width: DEVICE_WIDTH / 5,
    height: DEVICE_HEIGHT / 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
