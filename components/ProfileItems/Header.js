import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Logo from "../../assets/images/Logos/Logo.png"

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image source={Logo} alt="Logo" style={styles.logo} />
      <Text style={styles.title}>EatFitPro</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT / 10,
    alignItems: "center",
    marginBottom: DEVICE_HEIGHT / 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: DEVICE_WIDTH / 6,
    height: DEVICE_HEIGHT / 12,
    marginLeft: DEVICE_WIDTH / 30
  },
  title: {
    fontSize: DEVICE_WIDTH / 20,
    marginLeft: DEVICE_WIDTH / 35
  }
});
