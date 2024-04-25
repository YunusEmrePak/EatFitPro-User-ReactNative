import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  TextInput
} from "react-native-paper";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
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
      <View style={styles.signUpButton}>
        <Pressable
          onPress={sendCode}
          style={({ pressed }) => pressed && styles.pressedItem}
          android_ripple={{
            color: "#fff1fc",
          }}
        >
          <Text style={styles.signUpButtonText}>SEND CODE</Text>
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
