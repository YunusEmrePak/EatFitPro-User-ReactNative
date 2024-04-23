import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";

import boyAvatar from "../../../assets/images/ProfileImages/boyAvatar.png";
import girlAvatar from "../../../assets/images/ProfileImages/girlAvatar.png";
import bg from "../../../assets/images/ProfileImages/leaderboardBg.png";
import Logo from "../../../assets/images/Logos/Logo.png";

import { FontAwesome5 } from "@expo/vector-icons";

export default function FirstThree({ leaderboard }) {
  return (
    <ImageBackground style={styles.half} source={bg}>
      <View style={styles.headerContainer}>
        <Image source={Logo} alt="Logo" style={styles.logo} />
        <Text style={styles.title}>Leaderboard</Text>
      </View>
      <View style={styles.firstThree}>
        <View style={styles.second}>
          <View style={styles.photo2}>
            <FontAwesome5 name="crown" size={24} color="#C0C0C0" />
            <Image
              source={leaderboard[1].gender ? girlAvatar : boyAvatar}
              style={styles.icon2}
            />
            <View style={[styles.queue, styles.queueSecond]}>
              <Text style={styles.queueText}>2</Text>
            </View>
          </View>
          <View>
            <Text style={styles.name}>
              {leaderboard[1].name + " " + leaderboard[1].surname}
            </Text>
          </View>
          <View>
            <Text style={styles.score}>{leaderboard[1].score}</Text>
          </View>
        </View>
        <View style={styles.first}>
          <View style={styles.photo2}>
            <FontAwesome5 name="crown" size={24} color="#ffd700" />
            <Image
              source={leaderboard[0].gender ? girlAvatar : boyAvatar}
              style={[styles.icon2, styles.icon1]}
            />
            <View style={[styles.queue, styles.queueFirst]}>
              <Text style={styles.queueText}>1</Text>
            </View>
          </View>
          <View>
            <Text style={styles.name}>
              {leaderboard[0].name + " " + leaderboard[0].surname}
            </Text>
          </View>
          <View>
            <Text style={styles.score}>{leaderboard[0].score}</Text>
          </View>
        </View>
        <View style={styles.third}>
          <View style={styles.photo2}>
            <FontAwesome5 name="crown" size={24} color="#CD7F32" />
            <Image
              source={leaderboard[2].gender ? girlAvatar : boyAvatar}
              style={[styles.icon3, styles.icon2]}
            />
            <View style={[styles.queue, styles.queueThird]}>
              <Text style={styles.queueText}>3</Text>
            </View>
          </View>
          <View>
            <Text style={styles.name}>
              {leaderboard[2].name + " " + leaderboard[2].surname}
            </Text>
          </View>
          <View>
            <Text style={styles.score}>{leaderboard[2].score}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  half: {
    // backgroundColor: "#3F3C99",
    alignItems: "center",
    borderBottomLeftRadius: DEVICE_WIDTH / 20,
    borderBottomRightRadius: DEVICE_WIDTH / 20,
  },
  headerContainer: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT / 12,
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: DEVICE_HEIGHT / 20
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
  firstThree: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT / 4,
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-evenly",
  },
  second: {
    width: DEVICE_WIDTH / 3.5,
    height: DEVICE_HEIGHT / 5,
    position: "relative",
    bottom: DEVICE_HEIGHT / 100,
    alignItems: "center",
  },
  first: {
    width: DEVICE_WIDTH / 3.5,
    height: DEVICE_HEIGHT / 4,
    position: "relative",
    bottom: DEVICE_HEIGHT / 25,
    alignItems: "center",
  },
  third: {
    width: DEVICE_WIDTH / 3.5,
    height: DEVICE_HEIGHT / 5,
    position: "relative",
    bottom: DEVICE_HEIGHT / 100,
    alignItems: "center",
  },
  iconContainer: {
    borderRadius: "50%",
  },
  icon2: {
    width: DEVICE_WIDTH / 6,
    height: DEVICE_WIDTH / 6,
    borderRadius: DEVICE_WIDTH,
    borderWidth: DEVICE_WIDTH / 200,
    borderColor: "#D97BE4",
    marginTop: DEVICE_HEIGHT / 150,
  },
  icon1: {
    width: DEVICE_WIDTH / 5,
    height: DEVICE_WIDTH / 5,
    marginTop: DEVICE_HEIGHT / 150,
    borderColor: "#FE5A4A",
  },
  icon3: {
    borderColor: "#D87BE1",
  },
  photo2: {
    alignItems: "center",
  },
  queue: {
    alignItems: "center",
    borderRadius: DEVICE_WIDTH,
    width: DEVICE_WIDTH / 22,
    height: DEVICE_WIDTH / 22,
    position: "relative",
    bottom: DEVICE_HEIGHT / 60,
  },
  queueSecond: {
    backgroundColor: "#D97BE4",
  },
  queueFirst: {
    backgroundColor: "#FE5A4A",
  },
  queueThird: {
    backgroundColor: "#D87BE1",
  },
  queueText: {
    color: "#fff",
  },
  name: {
    color: "#C4DBE9",
    bottom: DEVICE_HEIGHT / 100,
    textAlign: "center",
  },
  score: {
    color: "#fff",
    bottom: DEVICE_HEIGHT / 150,
    fontWeight: "600",
    fontSize: DEVICE_WIDTH / 28,
  },
});
