import { StyleSheet, Text, View } from "react-native";
import {
    DEVICE_HEIGHT,
    DEVICE_WIDTH,
} from "../../../../../constants/constants";

import { useDispatch } from "react-redux";

// kamil.aslan548@hotmail.com

export default function FoodItem({foodName, foodMass, foodCalories}) {
  const dispatch = useDispatch();

  return (
    <View style={styles.item}>
      <View style={styles.name}>
        <Text style={styles.text} numberOfLines={1}>
          {foodName}
        </Text>
      </View>
      <View style={styles.mass}>
        <Text style={styles.text}>{foodMass} gr</Text>
      </View>
      <View style={styles.calorie}>
        <Text style={styles.text}>{foodCalories} cal</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flexDirection: "row",
    width: DEVICE_WIDTH / 1.35,
    height: DEVICE_HEIGHT / 25,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: DEVICE_WIDTH / 50,
    marginBottom: DEVICE_HEIGHT / 100
  },
  text: {
    fontSize: DEVICE_WIDTH / 25,
  },
  name: {
    width: DEVICE_WIDTH / 3.2,
  },
  mass: {
    width: DEVICE_WIDTH / 5,
    alignItems: "center",
  },
  calorie: {
    width: DEVICE_WIDTH / 5.3,
    alignItems: "flex-end",
  },
});
