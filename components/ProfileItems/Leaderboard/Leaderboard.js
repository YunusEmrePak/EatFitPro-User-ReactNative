import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
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

export default function Leaderboard() {
  const dispatch = useDispatch();

  //   const pageNumber = useSelector((state) => state.userAddGoal.pageNumber);
  //   const totalPage = useSelector((state) => state.userAddGoal.totalPage);

  const leaderboard = useSelector((state) => state.userAddGoal.leaderboard);
  const leaderboardStatus = useSelector(
    (state) => state.userAddGoal.getLeaderboardStatus
  );

  return (
    <View style={styles.container}>
      <Header />
      {leaderboardStatus === "succeeded" && (
        <FirstThree leaderboard={leaderboard} />
      )}
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
});
