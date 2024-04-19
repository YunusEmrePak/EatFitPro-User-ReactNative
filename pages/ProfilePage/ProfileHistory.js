import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HistoryList from "../../components/ProfileItems/History/HistoryList";
import HistoryFilter from "../../components/ProfileItems/History/HistoryFilter";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import Header from "../../components/Common/Header";
import { toolsActions } from "../../redux/Tools/toolsSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileHistory() {
  const dispatch = useDispatch();

  const isModalVisible = useSelector((state) => state.tools.filterModal);

  const openModal = () => {
    dispatch(toolsActions.setFilterModalVisible(true));
  };
  return (
    <SafeAreaView
      style={{ alignItems: "center", justifyContent: "flex-start" }}
    >
      <Header />
      <View style={styles.titleContainer}>
        <Text style={styles.text}>History</Text>
        <Pressable onPress={openModal}>
          {/* <FontAwesome6 name="filter" size={24} color="black" />
           */}
          <Ionicons name="filter-outline" size={32} color="black" />
        </Pressable>
      </View>
      <HistoryList />
      <HistoryFilter />
    </SafeAreaView>
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
