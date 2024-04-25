import { Pressable, StyleSheet, Text, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { Ionicons } from "@expo/vector-icons";

export default function FilterButton({ onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={[
          ({ pressed }) => pressed && styles.pressedItem,
          styles.container,
        ]}
        android_ripple={{
          color: "#d1f1f1",
        }}
      >
        <Ionicons name="filter-outline" size={22} color="grey" />
        <Text style={styles.buttonText}>Filters</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderColor: "grey",
    borderWidth: DEVICE_WIDTH / 700,
    overflow: "hidden",
    borderRadius: DEVICE_WIDTH / 70
  },
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: DEVICE_WIDTH / 60,
    paddingHorizontal: DEVICE_WIDTH / 40,
    width: DEVICE_WIDTH / 4.7,
    height: DEVICE_HEIGHT / 23,
  },
  buttonText: {
    fontSize: DEVICE_WIDTH / 25,
    textAlign: "center",
    color: "black",
    fontWeight: "600",
    // width: DEVICE_WIDTH / 4.7,
    // height: DEVICE_HEIGHT / 23,
    // marginTop: DEVICE_HEIGHT / 46,
  },
  pressedItem: {
    opacity: 0.8,
  },
});
