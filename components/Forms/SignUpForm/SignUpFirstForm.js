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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import { signIn, signInActions } from "../../../redux/SignIn/signInSlice";
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
  const token = useSelector((state) => state.signIn.token);

  const setPasswordEye = () => {
    dispatch(signUpActions.setEyeIsClicked());
  };

  const signUpHandler = () => {
    // if (
    //   name.trim() !== "" &&
    //   surname.trim() !== "" &&
    //   email.trim() !== "" &&
    //   password.trim() !== ""
    // ) {
    navigation.navigate("SignUpSecond");
    // } else {
    //     console.log("Information is not full.")
    //   toast.error("Please fill in all required fields to continue.", {
    //     position: "bottom-left",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //   });
    // }
  };
  // yunusemrepak@windowslive.com

  useEffect(() => {
    if (token) {
      navigation.navigate("Profile");
    }
  }, [token]);

  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <View style={styles.nameSurname}>
          <TextInput
            label="Name"
            onChangeText={(text) => dispatch(signUpActions.setName(text))}
            mode="outlined"
            style={styles.name}
            autoCapitalize="none"
          />
          <TextInput
            label="Surname"
            onChangeText={(text) => dispatch(signUpActions.setSurname(text))}
            mode="outlined"
            style={styles.surname}
            autoCapitalize="none"
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
          right={
            <TextInput.Icon
              icon={isEyeClicked ? "eye-off" : "eye"}
              onPress={setPasswordEye}
            />
          }
        />
      </View>
      <Pressable style={styles.signUpButton} onPress={signUpHandler}>
        <View>
          <Text style={styles.signUpButtonText}>CONTINUE</Text>
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
  },
});
