import { Pressable, StyleSheet, Text, View } from "react-native";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

export default function ProfileUser({ title }) {
  return <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT / 15,
    width: DEVICE_WIDTH,
    justifyContent: "center",
    paddingLeft: DEVICE_WIDTH / 30,
    marginBottom: DEVICE_HEIGHT / 80,
  },
  text: {
    color: "black",
    fontSize: DEVICE_WIDTH / 16,
  }
});
