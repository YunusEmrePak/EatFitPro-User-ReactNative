import { ActivityIndicator, Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import {
  TextInput
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import { signUp, signUpActions } from "../../../redux/SignIn/signUpSlice";

export default function SignUpSecondForm({ navigation }) {
  const dispatch = useDispatch();

  const gender = useSelector((state) => state.signUp.userInformation.gender);
  const signUpStatus = useSelector((state) => state.signUp.signUpStatus);
  const userInformation = useSelector((state) => state.signUp.userInformation);

  const length = useSelector((state) => state.signUp.userInformation.length);
  const weight = useSelector((state) => state.signUp.userInformation.weight);
  const age = useSelector((state) => state.signUp.userInformation.age);

  const [showDropDown, setShowDropDown] = useState(false);
  const [genderState, setGenderState] = useState("");

  const genderList = [
    {
      label: "Male",
      value: "false",
    },
    {
      label: "Female",
      value: "true",
    },
  ];

  const signUpHandler = () => {
    if (
      length.trim() !== "" &&
      weight.trim() !== "" &&
      age.trim() !== "" &&
      gender.trim() !== ""
    ) {
      dispatch(signUp(userInformation));
    } else {
      ToastAndroid.show(
        "Please fill in all required fields to continue.",
        ToastAndroid.LONG
      );
    }
  };
  // yunusemrepak@windowslive.com
  // kamil.aslan548@hotmail.com

  useEffect(() => {
    if (signUpStatus === "succeeded") {
      ToastAndroid.show(
        "We send a confirmation code to your mail box.",
        ToastAndroid.SHORT
      );
      navigation.navigate("SignUpVerify");
    }
    else {
      ToastAndroid.show(
        "Email not found. Please enter a valid email.",
        ToastAndroid.SHORT
      );
    }
  }, [signUpStatus]);

  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <View style={styles.nameSurname}>
          <TextInput
            label="Length"
            onChangeText={(text) => dispatch(signUpActions.setLength(text))}
            mode="outlined"
            style={styles.length}
            keyboardType="numeric"
          />
          <TextInput
            label="Weight"
            onChangeText={(text) => dispatch(signUpActions.setWeight(text))}
            mode="outlined"
            style={styles.weight}
            keyboardType="numeric"
          />
        </View>
        <DropDown
          label={"Gender"}
          mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={genderState}
          setValue={(val) => {
            setGenderState(val);
            dispatch(signUpActions.setGender(val));
          }}
          list={genderList}
        />
        <TextInput
          label="Age"
          onChangeText={(text) => dispatch(signUpActions.setAge(text))}
          mode="outlined"
          style={styles.age}
          keyboardType="numeric"
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
          {signUpStatus === "pending" ? (
            <ActivityIndicator
              color="#fff"
              style={{
                width: DEVICE_WIDTH / 1.5,
                height: DEVICE_HEIGHT / 20,
              }}
            />
          ) : (
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
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
    // height: DEVICE_HEIGHT / 3.5,
  },
  nameSurname: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: DEVICE_HEIGHT / 80,
  },
  length: {
    width: DEVICE_WIDTH / 3.2,
  },
  weight: {
    width: DEVICE_WIDTH / 3.2,
  },
  gender: {
    width: DEVICE_WIDTH / 1.5,
  },
  age: {
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
