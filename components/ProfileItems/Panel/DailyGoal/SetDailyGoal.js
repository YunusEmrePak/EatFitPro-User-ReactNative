import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ToastAndroid, ActivityIndicator } from "react-native";
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
  const addGoalStatus = useSelector((state) => state.userAddGoal.addGoalStatus);

  const setGoalHandler = () => {
    dispatch(userAddGoalActions.setRefresh());
    if (setGoal.trim() !== "" && setGoal != 0) {
      dispatch(setUserGoal(setGoal));
    } else {
      ToastAndroid.show(
        "Daily goal must not be empty or 0.",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    if (addGoalStatus === "succeeded") {
      onPress();
      dispatch(userAddGoalActions.setStatusNull())
    }
  }, [addGoalStatus]);

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
      <View style={styles.set}>
        <Pressable
          onPress={setGoalHandler}
          style={({ pressed }) => pressed && styles.pressedItem}
          android_ripple={{
            color: "#fff1fc",
          }}
        >
          {addGoalStatus === "pending" ? (
            <ActivityIndicator
              color="#fff"
              style={{
                width: DEVICE_WIDTH / 4,
                height: DEVICE_HEIGHT / 22,
              }}
            />
          ) : (
            <Text style={styles.setText}>Set Goal</Text>
          )}
        </Pressable>
      </View>
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
    borderRadius: DEVICE_WIDTH / 10,
  },
  set: {
    backgroundColor: "#680770",
    width: DEVICE_WIDTH / 6,
    height: DEVICE_HEIGHT / 28,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: DEVICE_WIDTH / 40,
    overflow: "hidden",
  },
  setText: {
    color: "white",
    fontSize: DEVICE_WIDTH / 28,
    textAlign: "center",
    width: DEVICE_WIDTH / 6,
    height: DEVICE_HEIGHT / 28,
    marginTop: DEVICE_HEIGHT / 56,
  },
  pressedItem: {
    opacity: 0.8,
  },
});
