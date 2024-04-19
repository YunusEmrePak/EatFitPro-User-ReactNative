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
import HeaderBackground from "../../assets/images/ProfileImages/asideBg.jpg";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

export default function Header() {
  return (
    <ImageBackground source={HeaderBackground} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Logo} alt="Logo" style={styles.logo} />
      </View>
      <Text style={styles.title}>EatFitPro</Text>
    </ImageBackground>
    // <View style={styles.container}>
    //   <View style={styles.imageContainer}>
    //     <Image source={Logo} alt="Logo" style={styles.logo} />
    //   </View>
    //   <Text style={styles.title}>EatFitPro</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT / 10,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#680770"
  },
  imageContainer: {
    elevation: 1,
  },
  logo: {
    width: DEVICE_WIDTH / 6,
    height: DEVICE_HEIGHT / 12,
    marginLeft: DEVICE_WIDTH / 20,
  },
  title: {
    fontSize: DEVICE_WIDTH / 16,
    marginLeft: DEVICE_WIDTH / 30,
    color: "#fff",
  },
});
