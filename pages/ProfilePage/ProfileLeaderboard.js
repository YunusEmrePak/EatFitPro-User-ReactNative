import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import Leaderboard from "../../components/ProfileItems/Leaderboard/Leaderboard";


import { getLeaderboard } from "../../redux/User/userAddGoalSlice";

export default function ProfileLeaderboard() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getLeaderboard(1));
  // }, []);

  return (
    <View style={styles.container}>
      <Leaderboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
