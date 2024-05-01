import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FilterButton from "../../components/Common/FilterButton";
import Header from "../../components/Common/Header";
import HistoryFilter from "../../components/ProfileItems/History/HistoryFilter";
import HistoryList from "../../components/ProfileItems/History/HistoryList";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { toolsActions } from "../../redux/Tools/toolsSlice";
import { userCalorieHistoryActions } from "../../redux/User/userCalorieHistorySlice";

export default function ProfileHistory() {
  const dispatch = useDispatch();

  const historyStatus = useSelector(
    (state) => state.userCalorieHistory.historyStatus
  );

  const info = useSelector(
    (state) => state.userCalorieHistory.userHistory.content
  );

  const openModal = () => {
    dispatch(userCalorieHistoryActions.setStatusNull());
    dispatch(toolsActions.setFilterModalVisible(true));
  };
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
        height: DEVICE_HEIGHT,
      }}
    >
      {/* <Header title="History" /> */}
      <Header title="EatFitPro" />
      <View style={styles.titleContainer}>
        <Text style={styles.text}>History</Text>
        <FilterButton onPress={openModal} />
      </View>
      {historyStatus === "pending" ? (
        <ActivityIndicator size="large" />
      ) : info.length !== 0 ? (
        <HistoryList />
      ) : (
        <Text
          style={{ fontSize: DEVICE_WIDTH / 20, marginTop: DEVICE_HEIGHT / 60 }}
        >
          No results found.
        </Text>
      )}
      <HistoryFilter />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    height: DEVICE_HEIGHT / 20,
    width: DEVICE_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: DEVICE_WIDTH / 30,
    paddingRight: DEVICE_WIDTH / 20,
    marginBottom: DEVICE_HEIGHT / 80,
    marginTop: DEVICE_HEIGHT / 80,
  },
  text: {
    color: "black",
    fontSize: DEVICE_WIDTH / 16,
  },
});
