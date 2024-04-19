import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Leaderboard from "../../components/ProfileItems/Leaderboard/Leaderboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getLeaderboard } from "../../redux/User/userAddGoalSlice";

export default function ProfileLeaderboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderboard(1));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Leaderboard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
