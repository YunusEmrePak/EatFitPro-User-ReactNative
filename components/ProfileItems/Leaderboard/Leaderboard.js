import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import boyAvatar from "../../../assets/images/ProfileImages/boyAvatar.png";
import girlAvatar from "../../../assets/images/ProfileImages/girlAvatar.png";
import Header from "../../Common/Header";
import FirstThree from "./FirstThree";
import LeaderItem from "./LeaderItem";
import { getLeaderboard } from "../../../redux/User/userAddGoalSlice";
import bg from "../../../assets/images/ProfileImages/leaderboardBg.png";
import Logo from "../../../assets/images/Logos/Logo.png";

export default function Leaderboard() {
  const dispatch = useDispatch();

  const leaderboard = useSelector((state) => state.userAddGoal.leaderboard);
  const leaderboardStatus = useSelector(
    (state) => state.userAddGoal.getLeaderboardStatus
  );

  return (
    <View style={styles.container}>
      <View style={styles.half}>
        <ImageBackground source={bg}>
          <View style={styles.headerContainer}>
            <Image source={Logo} alt="Logo" style={styles.logo} />
            <Text style={styles.title}>Leaderboard</Text>
          </View>
          {leaderboardStatus === "succeeded" ? (
            leaderboard.length !== 0  ? 
            <FirstThree leaderboard={leaderboard} /> : <Text style={{fontSize: DEVICE_WIDTH / 20, color: "#fff", textAlign: "center", marginBottom: DEVICE_HEIGHT / 10}}>Coulnd't find any user.</Text>
          ) : (
            <ActivityIndicator size="large" style={{marginBottom: DEVICE_HEIGHT / 4.78}} />
          )}
        </ImageBackground>
      </View>
      <ScrollView style={styles.leaderboard}>
        {leaderboardStatus === "succeeded" &&
          leaderboard.map(
            (item, index) =>
              index > 2 && (
                <LeaderItem
                  queue={index + 1}
                  leaderboard={item}
                  key={Math.random()}
                />
              )
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#1A1038",
    minHeight: DEVICE_HEIGHT,
  },
  leaderboard: {
    marginTop: DEVICE_HEIGHT / 50,
    marginBottom: DEVICE_HEIGHT / 13,
  },
  half: {
    alignItems: "center",
    borderBottomLeftRadius: DEVICE_WIDTH / 18,
    borderBottomRightRadius: DEVICE_WIDTH / 18,
    overflow: "hidden",
    minHeight: DEVICE_HEIGHT / 2.4
  },
  headerContainer: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT / 12,
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: DEVICE_HEIGHT / 20,
    marginTop: DEVICE_HEIGHT / 32,
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
