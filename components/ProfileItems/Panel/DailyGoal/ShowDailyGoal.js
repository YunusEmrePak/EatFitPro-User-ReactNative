import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../../constants/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function ShowDailyGoal() {
  const dailyGoal = useSelector((state) => state.userAddGoal.dailyGoal);

  return (
    <LinearGradient
      colors={["#56ab2f", "#a8e063"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      <View style={styles.icons}>
        <Feather name="target" size={36} color="white" />
      </View>
      <View style={styles.daily}>
        <Text style={styles.dailyText}>Daily Goal</Text>
      </View>
      <View style={styles.goal}>
        <Text style={styles.goalText}>
          <Text style={styles.goalNumber}>{dailyGoal}</Text> cal
        </Text>
      </View>
      <MaterialIcons
        name="change-circle"
        size={28}
        color="white"
        style={styles.change}
      />
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
    position: "absolute",
    top: DEVICE_WIDTH / 80,
    right: DEVICE_WIDTH / 80,
  },
});
