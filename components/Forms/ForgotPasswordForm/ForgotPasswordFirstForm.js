import { Pressable, StyleSheet, Text, View } from "react-native";
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
import {
  sendEmail,
  userForgotPasswordActions,
} from "../../../redux/User/userForgotPasswordSlice";

export default function ForgotPasswordFirstForm({ navigation }) {
  const dispatch = useDispatch();

  const isClickedToFirstPage = useSelector(
    (state) => state.userForgotPassword.isClickedToFirstPage
  );

  const email = useSelector((state) => state.userForgotPassword.codeEmail);
  const emailStatus = useSelector(
    (state) => state.userForgotPassword.emailStatus
  );
  const emailIsSuccessful = useSelector(
    (state) => state.userForgotPassword.emailIsSuccessful
  );

  const sendCode = () => {
    dispatch(userForgotPasswordActions.setIsClickedToFirstPage());
    dispatch(sendEmail(email));
  };
  // yunusemrepak@windowslive.com
  // kamil.aslan548@hotmail.com

  useEffect(() => {
    if (
      !emailIsSuccessful &&
      isClickedToFirstPage &&
      emailStatus === "succeeded"
    ) {
      dispatch(userForgotPasswordActions.setIsClickedToFirstPage());
    } else if (emailIsSuccessful && emailStatus === "succeeded") {
      navigation.navigate("ForgotPasswordSecond");
    }
  }, [emailStatus]);

  return (
    <View style={styles.form}>
      <View style={styles.info}>
        <Text style={styles.infoText}>
          Please enter your email. We will send a code to help you to change
          your password.
        </Text>
      </View>
      <View style={styles.inputs}>
        <TextInput
          label="Email"
          onChangeText={(text) => {
            dispatch(userForgotPasswordActions.setEmail(text));
            dispatch(userForgotPasswordActions.setCodeEmail(text));
          }}
          mode="outlined"
          style={styles.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <Pressable style={styles.signUpButton} onPress={sendCode}>
        <View>
          <Text style={styles.signUpButtonText}>SEND CODE</Text>
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
  email: {
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
