import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import {
  TextInput
} from "react-native-paper";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import { signUpActions } from "../../../redux/SignIn/signUpSlice";

export default function SignUpFirstForm({ navigation }) {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.signUp.userInformation.name);
  const surname = useSelector((state) => state.signUp.userInformation.surname);
  const email = useSelector((state) => state.signUp.userInformation.email);
  const password = useSelector(
    (state) => state.signUp.userInformation.password
  );

  const isEyeClicked = useSelector((state) => state.signUp.eyeIsClicked);
  const passwordRef = useRef(null);

  const setPasswordEye = () => {
    passwordRef.current.blur();
    dispatch(signUpActions.setEyeIsClicked());
  };

  const signUpHandler = () => {
    if (
      name.trim() !== "" &&
      surname.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    ) {
      navigation.navigate("SignUpSecond");
    } else {
      ToastAndroid.show(
        "Please fill in all required fields to continue.",
        ToastAndroid.LONG
      );
    }
  };
  // yunusemrepak@windowslive.com

  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <View style={styles.nameSurname}>
          <TextInput
            label="Name"
            onChangeText={(text) => dispatch(signUpActions.setName(text))}
            mode="outlined"
            style={styles.name}
          />
          <TextInput
            label="Surname"
            onChangeText={(text) => dispatch(signUpActions.setSurname(text))}
            mode="outlined"
            style={styles.surname}
          />
        </View>
        <TextInput
          label="Email"
          onChangeText={(text) => dispatch(signUpActions.setEmail(text))}
          mode="outlined"
          style={styles.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          onChangeText={(text) => dispatch(signUpActions.setPassword(text))}
          mode="outlined"
          style={styles.password}
          secureTextEntry={isEyeClicked ? false : true}
          autoCapitalize="none"
          ref={passwordRef}
          right={
            <TextInput.Icon
              icon={isEyeClicked ? "eye-off" : "eye"}
              onPress={setPasswordEye}
            />
          }
        />
      </View>
      <View style={styles.signUpButton}>
        <Pressable
          onPress={signUpHandler}
          style={({ pressed }) => pressed && styles.pressedItem}
          android_ripple={{
            color: "#fff1fc",
          }}
        >
          <Text style={styles.signUpButtonText}>CONTINUE</Text>
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
    // height: DEVICE_HEIGHT / 3.5,
  },
  nameSurname: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: DEVICE_HEIGHT / 80,
  },
  name: {
    width: DEVICE_WIDTH / 3.2,
  },
  surname: {
    width: DEVICE_WIDTH / 3.2,
  },
  email: {
    width: DEVICE_WIDTH / 1.5,
  },
  password: {
    width: DEVICE_WIDTH / 1.5,
    marginTop: DEVICE_HEIGHT / 80,
    marginBottom: DEVICE_HEIGHT / 60,
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
  pressedItem: {
    opacity: 0.8,
  },
});
