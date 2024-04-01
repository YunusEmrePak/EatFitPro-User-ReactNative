import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../../../constants/constants";

import { Octicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import FoodItem from "./FoodItem";

// kamil.aslan548@hotmail.com

const commonStyle = {
  fontSize: DEVICE_WIDTH / 18
}

export default function FoodTable() {
  const dispatch = useDispatch();

  const openModal = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <View style={styles.title}>
          <Octicons name="dot-fill" size={commonStyle.fontSize} color="green" />
          <Text>Consumed Foods</Text>
        </View>
        <View style={styles.foodCount}>
          <Text>3</Text>
        </View>
      </View>
      <View style={styles.items}>
        <FoodItem />
        <FoodItem />
        <FoodItem />
      </View>
      <Pressable style={styles.addNewButton} onPress={openModal}>
        <Fontisto name="plus-a" size={commonStyle.fontSize} color="black" />
        <Text style={styles.newText}>New</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: DEVICE_WIDTH / 1.2,
    backgroundColor: "#bdfbdf",
    borderRadius: DEVICE_WIDTH / 30,
    paddingBottom: DEVICE_HEIGHT / 20,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: DEVICE_WIDTH / 1.35,
    height: DEVICE_HEIGHT / 15,
    marginBottom: DEVICE_HEIGHT / 80,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: DEVICE_WIDTH / 2.7,
    backgroundColor: "#9cd393",
    borderRadius: DEVICE_WIDTH / 25,
    padding: DEVICE_WIDTH / 80,
    marginRight: DEVICE_WIDTH / 60,
  },
  items: {
    marginBottom: DEVICE_HEIGHT / 60,
  },
  addNewButton: {
    flexDirection: "row",
    alignItems: "center",
    width: DEVICE_WIDTH / 1.35,
  },
  newText: {
    fontSize: DEVICE_WIDTH / 22,
    marginLeft: DEVICE_WIDTH / 50,
  },
});
