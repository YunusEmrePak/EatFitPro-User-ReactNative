import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import {
  changePassword,
  userForgotPasswordActions,
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

  const passwordRef1 = useRef(null);
  const passwordRef2 = useRef(null);

  const setPasswordEye = () => {
    passwordRef1.current.blur();
    passwordRef2.current.blur();
    dispatch(userForgotPasswordActions.setEyeIsClicked());
  };

  const changePasswordHandler = () => {
    dispatch(userForgotPasswordActions.setIsClickedToSecondPage());
    if (newPassword === confirmPassword) {
      dispatch(changePassword(passwordInformation));
      dispatch(userForgotPasswordActions.setIsClickedToSecondPage());
    } else {
      ToastAndroid.show("Password does not match.", ToastAndroid.SHORT);
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
          ref={passwordRef1}
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
          ref={passwordRef2}
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
      <View style={styles.signUpButton}>
        <Pressable
          onPress={changePasswordHandler}
          style={({ pressed }) => pressed && styles.pressedItem}
          android_ripple={{
            color: "#fff1fc",
          }}
        >
          {changeStatus === "pending" ? (
            <ActivityIndicator
              color="#fff"
              style={{
                width: DEVICE_WIDTH / 1.5,
                height: DEVICE_HEIGHT / 20,
              }}
            />
          ) : (
            <Text style={styles.signUpButtonText}>CHANGE PASSWORD</Text>
          )}
        </Pressable>
      </View>
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
    textAlign: "center",
    width: DEVICE_WIDTH / 1.5,
    height: DEVICE_HEIGHT / 20,
    marginTop: DEVICE_HEIGHT / 40,
  },
  info: {
    width: DEVICE_WIDTH / 1.5,
    marginBottom: DEVICE_HEIGHT / 40,
  },
  infoText: {
    textAlign: "center",
    fontSize: DEVICE_WIDTH / 25,
  },
  pressedItem: {
    opacity: 0.8,
  },
});
