import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";

import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Octicons } from "@expo/vector-icons";

import weight from "../../../assets/images/ProfileImages/weight.png";
import height from "../../../assets/images/ProfileImages/height.png";
import age from "../../../assets/images/ProfileImages/age2.png";

export default function UserInformation({ age, height, weight }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF5852", "#FF8E4C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.outBox}
      >
        <View style={styles.outBox}>
          <View style={styles.top}>
            <View style={styles.infoContainer}>
              <Octicons
                name="clock"
                size={32}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.title}>Age</Text>
              <Text style={styles.info}>{age}</Text>
            </View>
            <View style={styles.infoContainer}>
              <MaterialCommunityIcons
                name="human-male-height"
                size={32}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.title}>Height</Text>
              <Text style={styles.info}>{height} cm</Text>
            </View>
            <View style={styles.infoContainer}>
              <FontAwesome5
                name="weight"
                size={32}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.title}>Weight</Text>
              <Text style={styles.info}>{weight} kg</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <Feather name="edit" size={24} color="white" />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT / 5,
    alignItems: "flex-end",
    marginTop: DEVICE_HEIGHT / 40,
  },
  outBox: {
    width: DEVICE_WIDTH / 1.5,
    height: DEVICE_HEIGHT / 4.5,
    borderRadius: DEVICE_WIDTH / 20,
    padding: DEVICE_WIDTH / 80,
    justifyContent: "space-between",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: DEVICE_HEIGHT / 100,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: DEVICE_HEIGHT / 11,
  },
  title: {
    fontSize: DEVICE_WIDTH / 19,
    color: "white",
  },
  info: {
    fontSize: DEVICE_WIDTH / 20,
    color: "white",
  },
  icon: {
    width: DEVICE_WIDTH / 12,
    height: DEVICE_HEIGHT / 25,
    borderRadius: DEVICE_WIDTH / 2,
    marginBottom: DEVICE_HEIGHT / 100,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DEVICE_HEIGHT / 50,
    marginLeft: DEVICE_WIDTH / 80,
  },
});
