import { Text, StyleSheet, View, Image } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import ConsumedImage from "../../assets/images/ProfileImages/salad.png";
import { LinearGradient } from "expo-linear-gradient";

export default function CalorieCard({color, src, name, calorie}) {
  return (
    <LinearGradient
      colors={[color.first, color.second]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.icon}>
        <Image source={src} alt="image" style={styles.image} />
      </View>
      <View style={styles.name}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.cal}>
        <Text style={styles.calNumber}>{calorie}</Text>
        <Text style={styles.calText}>cal</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF5852",
    width: DEVICE_WIDTH / 1.15,
    height: DEVICE_HEIGHT / 7,
    flexDirection: "row",
    borderRadius: DEVICE_WIDTH / 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "20%",
  },
  image: {
    width: DEVICE_WIDTH / 6,
    height: DEVICE_HEIGHT / 12.5,
  },
  name: {
    width: "40%",
  },
  nameText: {
    fontSize: DEVICE_WIDTH / 20,
    color: "white",
    fontWeight: "500",
    textAlign: "center"
  },
  cal: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "30%",
  },
  calNumber: {
    fontSize: DEVICE_WIDTH / 12,
    color: "white",
    fontWeight: "700",
    marginRight: DEVICE_WIDTH / 40
  },
  calText: {
    fontSize: DEVICE_WIDTH / 25,
    color: "white"
  },
});
