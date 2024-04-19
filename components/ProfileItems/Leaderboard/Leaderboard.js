import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import boyAvatar from "../../../assets/images/ProfileImages/boyAvatar.png";
import girlAvatar from "../../../assets/images/ProfileImages/girlAvatar.png";
import Header from "../../Common/Header";
import FirstThree from "./FirstThree";
import LeaderItem from "./LeaderItem";

export default function Leaderboard() {
  const dispatch = useDispatch();

  //   const pageNumber = useSelector((state) => state.userAddGoal.pageNumber);
  //   const totalPage = useSelector((state) => state.userAddGoal.totalPage);

  const leaderboard = useSelector((state) => state.userAddGoal.leaderboard);

  return (
    <View style={styles.container}>
      <Header />
      <FirstThree leaderboard={leaderboard} />
      <View style={styles.leaderboard}>
        {/* <FlatList  /> */}
        <LeaderItem leaderboard={leaderboard} />
        <LeaderItem leaderboard={leaderboard} />
        <LeaderItem leaderboard={leaderboard} />
      </View>
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
  },
});
