import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { TextInput } from "react-native-paper";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import { signIn, signInActions } from "../../../redux/SignIn/signInSlice";
import {
  getUserCalorieInfo,
  getUserInfo,
} from "../../../redux/User/userInformationSlice";

export default function SignInForm({ navigation }) {
  const dispatch = useDispatch();

  const userInformation = useSelector((state) => state.signIn.userInformation);
  const isEyeClicked = useSelector((state) => state.signIn.eyeIsClicked);
  const token = useSelector((state) => state.signIn.token);
  const email = useSelector((state) => state.signIn.userInformation.email);
  const password = useSelector(
    (state) => state.signIn.userInformation.password
  );
  const status = useSelector((state) => state.signIn.status);

  const setPasswordEye = () => {
    dispatch(signInActions.setEyeIsClicked());
  };

  const navigateToForgotPasswordPage = () => {
    navigation.navigate("ForgotPasswordFirst");
  };

  const signInHandler = () => {
    if (email.trim() !== "" && password.trim() !== "") {
      dispatch(signIn(userInformation));
    } else {
      ToastAndroid.show(
        "Please fill in all required fields to continue.",
        ToastAndroid.SHORT
      );
    }
  };
  // yunusemrepak@windowslive.com
  // kamil.aslan548@hotmail.com

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo());
      dispatch(getUserCalorieInfo());
      navigation.navigate("ProfilePage");
    }
  }, [token]);

  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <TextInput
          label="Email"
          onChangeText={(text) => dispatch(signInActions.setEmail(text))}
          mode="outlined"
          style={styles.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
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
      <Pressable
        style={styles.forgotPassword}
        onPress={navigateToForgotPasswordPage}
      >
        <View>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </View>
      </Pressable>
      <Pressable style={styles.signInButton} onPress={signInHandler}>
        <View>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: DEVICE_HEIGHT / 3.5,
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
});
