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
  userForgotPasswordActions,
  changePassword,
} from "../../../redux/User/userForgotPasswordSlice";

export default function ForgotPasswordSecondForm({ navigation }) {
  const dispatch = useDispatch();

  const passwordInformation = useSelector(
    (state) => state.userForgotPassword.changePassword
  );
  const changeStatus = useSelector(
    (state) => state.userForgotPassword.changeStatus
  );
  const changeIsSuccessful = useSelector(
    (state) => state.userForgotPassword.changeIsSuccessful
  );

  const isClickedToSecondPage = useSelector(
    (state) => state.userForgotPassword.isClickedToSecondPage
  );

  const newPassword = useSelector(
    (state) => state.userForgotPassword.changePassword.password
  );
  const confirmPassword = useSelector(
    (state) => state.userForgotPassword.confirmPassword
  );
  const isEyeClicked = useSelector(
    (state) => state.userForgotPassword.eyeIsClicked
  );

  const setPasswordEye = () => {
    dispatch(userForgotPasswordActions.setEyeIsClicked());
  };

  const changePasswordHandler = () => {
    dispatch(userForgotPasswordActions.setIsClickedToSecondPage());
    if (newPassword === confirmPassword) {
      console.log(newPassword, confirmPassword, isClickedToSecondPage);
      dispatch(changePassword(passwordInformation));
      dispatch(userForgotPasswordActions.setIsClickedToSecondPage());
    } 
    else {
      console.log("Password does not match.");
    }
  };
  // yunusemrepak@windowslive.com
  // kamil.aslan548@hotmail.com

  useEffect(() => {
    if (
      !changeIsSuccessful &&
      isClickedToSecondPage &&
      changeStatus === "succeeded"
    ) {
      dispatch(userForgotPasswordActions.setIsClickedToSecondPage());
    } else if (changeIsSuccessful && changeStatus === "succeeded") {
      dispatch(userForgotPasswordActions.setResetStatus());
      navigation.navigate("SignIn");
    }
  }, [changeStatus]);

  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <TextInput
          label="New Password"
          onChangeText={(text) =>
            dispatch(userForgotPasswordActions.setPassword(text))
          }
          mode="outlined"
          style={styles.newPassword}
          autoCapitalize="none"
          secureTextEntry={isEyeClicked ? false : true}
          right={
            <TextInput.Icon
              icon={isEyeClicked ? "eye-off" : "eye"}
              onPress={setPasswordEye}
            />
          }
        />
        <TextInput
          label="New Password Confirm"
          onChangeText={(text) =>
            dispatch(userForgotPasswordActions.setConfirmPassword(text))
          }
          mode="outlined"
          style={styles.newPasswordConfirm}
          secureTextEntry={isEyeClicked ? false : true}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              icon={isEyeClicked ? "eye-off" : "eye"}
              onPress={setPasswordEye}
            />
          }
        />
        <TextInput
          label="Code"
          onChangeText={(text) =>
            dispatch(userForgotPasswordActions.setCode(text))
          }
          mode="outlined"
          style={styles.code}
          keyboardType="numeric"
        />
      </View>
      <Pressable style={styles.signUpButton} onPress={changePasswordHandler}>
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
  newPassword: {
    width: DEVICE_WIDTH / 1.5,
    marginBottom: DEVICE_HEIGHT / 80,
  },
  newPasswordConfirm: {
    width: DEVICE_WIDTH / 1.5,
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