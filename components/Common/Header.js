import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logo from "../../assets/images/Logos/Logo.png";
import HeaderBackground2 from "../../assets/images/ProfileImages/asideBg.jpg";
import HeaderBackground3 from "../../assets/images/ProfileImages/leaderboardBg.png";
import HeaderBackground from "../../assets/images/ProfileImages/darkTitleBg.png";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

export default function Header({ title }) {
  return (
    <ImageBackground source={HeaderBackground} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Logo} alt="Logo" style={styles.logo} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT / 8.5,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#680770",
    paddingTop: DEVICE_HEIGHT / 35,
  },
  imageContainer: {
    elevation: 1,
  },
  logo: {
    width: DEVICE_WIDTH / 7,
    height: DEVICE_WIDTH / 7,
    marginLeft: DEVICE_WIDTH / 20,
  },
  title: {
    fontSize: DEVICE_WIDTH / 16,
    marginLeft: DEVICE_WIDTH / 30,
    color: "#fff",
  },
});
