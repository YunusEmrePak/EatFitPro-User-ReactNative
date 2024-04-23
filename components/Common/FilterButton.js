import { Pressable, StyleSheet, Text, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { Ionicons } from "@expo/vector-icons";

export default function FilterButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.buttonContainer}>
      <Ionicons name="filter-outline" size={22} color="grey" />
      <Text style={styles.buttonText}>Filters</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: DEVICE_WIDTH / 60,
    paddingHorizontal: DEVICE_WIDTH / 40,
    width: DEVICE_WIDTH / 4.7,
    height: DEVICE_HEIGHT / 23,
    borderColor: "grey",
    borderWidth: DEVICE_WIDTH / 700
  },
  buttonText: {
    fontSize: DEVICE_WIDTH / 25,
    textAlign: "center",
    color: "black",
    fontWeight: "600"
  },
});
