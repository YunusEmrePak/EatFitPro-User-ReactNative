import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import {
  TextInput,
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import {
  signUp,
  signUpActions,
  signUpActivate,
} from "../../../redux/SignIn/signUpSlice";

export default function SignUpVerifyForm({ navigation }) {
  const dispatch = useDispatch();

  const verifyStatus = useSelector((state) => state.signUp.verifyStatus);
  const verifyInformation = useSelector(
    (state) => state.signUp.verifyInformation
  );

  const userEmail = useSelector((state) => state.signUp.userInformation.email);
  const code = useSelector((state) => state.signUp.verifyInformation.code);

  const isClickedToVerifyButton = useSelector(
    (state) => state.signUp.isClickedToVerifyButton
  );

  const isVerifySuccessful = useSelector(
    (state) => state.signUp.isVerifySuccessful
  );

  const signUpHandler = () => {
    if (code.trim() !== "") {
      dispatch(signUpActions.setCode(code));
      dispatch(signUpActions.setVerifyMail(userEmail));
    } else {
      alert("Please fill in all the boxes before verifying.");
    }

    dispatch(signUpActions.setIsClickedToVerifyButton());
  };
  // yunusemrepak@windowslive.com
  // kamil.aslan548@hotmail.com

  useEffect(() => {
    if (isClickedToVerifyButton) {
      dispatch(signUpActivate(verifyInformation));
    }
  }, [isClickedToVerifyButton]);

  useEffect(() => {
    if (
      !isVerifySuccessful &&
      isClickedToVerifyButton &&
      verifyStatus === "succeeded"
    ) {
      ToastAndroid.show("Code you entered is wrong!", ToastAndroid.SHORT);
      dispatch(signUpActions.setIsClickedToVerifyButton());
    } else if (isVerifySuccessful && verifyStatus === "succeeded") {
      dispatch(signUpActions.setResetStatus());
      ToastAndroid.show("You signed up successfully.", ToastAndroid.SHORT);
      navigation.navigate("SignIn");
    }
  }, [verifyStatus]);

  return (
    <View style={styles.form}>
      <View style={styles.info}>
        <Text style={styles.infoText}>
          Please check your email for the verification code we've sent you.
          Enter the code in the field below to complete your sign-up process.
        </Text>
      </View>
      <View style={styles.inputs}>
        <TextInput
          label="Code"
          onChangeText={(text) => dispatch(signUpActions.setCode(text))}
          mode="outlined"
          style={styles.code}
          keyboardType="numeric"
        />
      </View>
      <Pressable style={styles.signUpButton} onPress={signUpHandler}>
        <View>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: DEVICE_HEIGHT / 80,
  },
  code: {
    width: DEVICE_WIDTH / 1.5,
    marginBottom: DEVICE_HEIGHT / 40,
  },
  signUpButton: {
    alignItems: "center",
    justifyContent: "center",
    width: DEVICE_WIDTH / 1.5,
    height: DEVICE_HEIGHT / 20,
    backgroundColor: "#690770",
    borderRadius: 10,
  },
  signUpButtonText: {
    color: "white",
    fontSize: DEVICE_WIDTH / 20,
  },
  info: {
    width: DEVICE_WIDTH / 1.5,
    marginBottom: DEVICE_HEIGHT / 40,
  },
  infoText: {
    textAlign: "center",
    fontSize: DEVICE_WIDTH / 25,
  },
});
