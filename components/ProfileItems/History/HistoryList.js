import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT } from "../../../constants/constants";
import HistoryListItem from "./HistoryListItem";

export default function HistoryList() {
  const dispatch = useDispatch();

  const info = useSelector(
    (state) => state.userCalorieHistory.userHistory.content
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={info}
        renderItem={(item) => <HistoryListItem data={item.item} />}
        key={Math.random()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DEVICE_HEIGHT / 4,
  },
});
