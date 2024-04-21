import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ToastAndroid } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../../constants/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserGoal,
  userAddGoalActions,
} from "../../../../redux/User/userAddGoalSlice";

export default function SetDailyGoal({ onPress }) {
  const dispatch = useDispatch();

  const setGoal = useSelector((state) => state.userAddGoal.setGoal);
  const userInformation = useSelector(
    (state) => state.userAddGoal.userInformation
  );
  const dailyGoal = useSelector((state) => state.userAddGoal.dailyGoal);
  const calorieBalance = useSelector(
    (state) => state.userAddGoal.calorieBalance
  );

  const token = useSelector((state) => state.signIn.token);

  const refresh = useSelector((state) => state.userAddGoal.refresh);

  const [isClicked, setIsClicked] = useState(false);
  const [isClickedToSetButton, setIsClickedToSetButton] = useState(false);

  const setGoalHandler = (event) => {
    // onPress()
    // event.stopPropagation();
    dispatch(userAddGoalActions.setRefresh());
    if (setGoal.trim() !== "" && setGoal != 0) {
      dispatch(setUserGoal(setGoal));
      // setIsClickedToSetButton((prev) => !prev);
      onPress();
    } else {
      ToastAndroid.show(
        "Daily goal must not be empty or 0.",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <LinearGradient
      colors={["#FF5852", "#FF8E4C"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      <View style={styles.icons}>
        <MaterialIcons
          name="keyboard-double-arrow-down"
          size={42}
          color="white"
        />
      </View>
      <View style={styles.input}>
        <TextInput
          label="Goal"
          onChangeText={(text) => {
            dispatch(userAddGoalActions.setGoal(text));
          }}
          mode="outlined"
          style={styles.goalInput}
          keyboardType="numeric"
          autoCapitalize="none"
          value={setGoal.toString()}
        />
      </View>
      <Pressable style={styles.set} onPress={setGoalHandler}>
        <Text style={styles.setText}>Set Goal</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: DEVICE_WIDTH / 40,
    borderRadius: DEVICE_WIDTH / 40,
    margin: DEVICE_WIDTH / 80,
    width: DEVICE_WIDTH / 2.3,
    height: DEVICE_WIDTH / 2.3,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  dailyText: {
    color: "white",
    fontSize: DEVICE_WIDTH / 25,
  },
  goalText: {
    color: "white",
    fontSize: DEVICE_WIDTH / 25,
  },
  goalNumber: {
    color: "white",
    fontSize: DEVICE_WIDTH / 13,
  },
  change: {
    width: DEVICE_HEIGHT / 10,
    backgroundColor: "red",
  },
  goalInput: {
    width: DEVICE_WIDTH / 4.5,
    height: DEVICE_HEIGHT / 25,
    borderRadius: DEVICE_WIDTH / 10
  },
  set: {
    backgroundColor: "#680770",
    paddingHorizontal: DEVICE_WIDTH / 25,
    paddingVertical: DEVICE_HEIGHT / 120,
    borderRadius: DEVICE_WIDTH / 40,
  },
  setText: {
    color: "white",
  },
});
