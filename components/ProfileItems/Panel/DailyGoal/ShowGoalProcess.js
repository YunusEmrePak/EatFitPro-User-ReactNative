import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../../constants/constants";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSelector } from "react-redux";

export default function ShowGoalProcess() {
  const setGoal = useSelector((state) => state.userAddGoal.setGoal);
  const userInformation = useSelector(
    (state) => state.userAddGoal.userInformation
  );
  const dailyGoal = useSelector((state) => state.userAddGoal.dailyGoal);
  const calorieBalance = useSelector(
    (state) => state.userAddGoal.calorieBalance
  );
  const token = useSelector((state) => state.signIn.token);

  console.log(calorieBalance, dailyGoal)

  return (
    <LinearGradient
      colors={["#3e0155", "#a98cb4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      <AnimatedCircularProgress
        size={120}
        width={12}
        fill={
          token
            ? calorieBalance != 0
              ? parseInt((calorieBalance * 100) / dailyGoal)
              : 0
            : 0
        }
        tintColor="#00e0ff"
        backgroundColor="rgba(255, 255, 255, .3)"
        rotation={0}
        duration={10}
        lineCap="round"
      >
        {(fill) => <Text style={styles.fillText}>{fill}%</Text>}
      </AnimatedCircularProgress>
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
  fillText: {
    color: "white",
    fontSize: DEVICE_WIDTH / 16
  },
});
