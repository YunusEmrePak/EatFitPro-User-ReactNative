import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Leaderboard from "../../components/ProfileItems/Leaderboard/Leaderboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

import { getLeaderboard } from "../../redux/User/userAddGoalSlice";

export default function ProfileLeaderboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderboard(1));
  }, []);

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
