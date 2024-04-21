import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import { useEffect, useRef, useState } from "react";

export default function SetDailyGoal() {

  return (
    <LinearGradient
      colors={["#FF5852", "#FF8E4C"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.text}>Back</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    width: 180,
    height: 180
  },
});
