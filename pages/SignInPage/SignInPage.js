import { Pressable, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import Logo from "../../components/Logo/Logo";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signInActions } from "../../redux/SignIn/signInSlice";
import { useEffect } from "react";

export default function SignInPage({ navigation }) {
  const dispatch = useDispatch();

  const userInformation = useSelector((state) => state.signIn.userInformation);
  const isEyeClicked = useSelector((state) => state.signIn.eyeIsClicked);
  const token = useSelector((state) => state.signIn.token);

  const navigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  const setPasswordEye = () => {
    dispatch(signInActions.setEyeIsClicked());
  };

  const signInHandler = () => {
    // dispatch(signIn(userInformation));
    fetch("http://localhost:8081/api/v1/auth/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInformation),
    });
  };
  // yunusemrepak@windowslive.com

  // useEffect(() => {
  //   if (token) {
  //     navigation.navigate("Introduction");
  //   }
  // }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Logo />
      </View>
      <View style={styles.form}>
        <View style={styles.inputs}>
          <TextInput
            label="Email"
            // value={email}
            onChangeText={(text) => dispatch(signInActions.setEmail(text))}
            mode="outlined"
            style={styles.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            // value={email}
            onChangeText={(text) => dispatch(signInActions.setPassword(text))}
            mode="outlined"
            style={styles.password}
            secureTextEntry={isEyeClicked ? false : true}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                icon={isEyeClicked ? "eye-off" : "eye"}
                onPress={setPasswordEye}
              />
            }
          />
        </View>
        <Pressable style={styles.forgotPassword}>
          <View>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </View>
        </Pressable>
        <Pressable style={styles.signInButton} onPress={signInHandler}>
          <View>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </View>
        </Pressable>
        <View style={styles.newToEFP}>
          <Text style={styles.efpText}>New to EFP?</Text>
          <Pressable onPress={navigateSignUp}>
            <Text style={styles.signUpButton}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: DEVICE_HEIGHT / 5,
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
});
