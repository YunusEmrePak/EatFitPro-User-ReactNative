import { Image, StyleSheet, Text, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";

import boyAvatar from "../../../assets/images/ProfileImages/boyAvatar.png";

export default function LeaderItem({ leaderboard }) {
  return (
    <View style={styles.item}>
      <View style={styles.queueContainer}>
        <Text style={styles.queue}>4</Text>
      </View>
      <View style={styles.iconName}>
        <Image source={boyAvatar} style={styles.icon} />
        <Text style={styles.name}>Yunus Emre Pak</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>150</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: DEVICE_WIDTH / 1.1,
    height: DEVICE_HEIGHT / 15,
    backgroundColor: "#3F3C99",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: DEVICE_HEIGHT / 80,
  },
  queue: {
    color: "#fff",
  },
  iconName: {
    width: DEVICE_WIDTH / 2.1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -DEVICE_WIDTH / 50,
  },
  icon: {
    width: DEVICE_WIDTH / 10,
    height: DEVICE_WIDTH / 10,
    borderRadius: DEVICE_WIDTH,
    borderWidth: DEVICE_WIDTH / 200,
    // borderColor: "#D97BE4",
    borderColor: `#${Math.floor(
      Math.random() * (35 - 10 + 1) + 10
    ).toString()}${Math.floor(
      Math.random() * (60 - 35 + 1) + 35
    ).toString()}${Math.floor(Math.random() * (99 - 60 + 1) + 60).toString()}`,
  },
  queueContainer: {
    width: DEVICE_WIDTH / 15,
  },
  queueText: {
    color: "#fff",
    width: DEVICE_WIDTH / 5,
  },
  name: {
    color: "#C4DBE9",
    marginLeft: DEVICE_WIDTH / 50,
  },
  scoreContainer: {
    width: DEVICE_WIDTH / 8,
    alignItems: "flex-end",
  },
  score: {
    color: "#fff",
    fontWeight: "600",
    fontSize: DEVICE_WIDTH / 28,
  },
});
