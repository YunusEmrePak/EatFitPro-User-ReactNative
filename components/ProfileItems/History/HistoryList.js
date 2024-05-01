import {
  FlatList,
  StyleSheet,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT } from "../../../constants/constants";
import HistoryListItem from "./HistoryListItem";

import { useEffect } from "react";
import { getHistory } from "../../../redux/User/userCalorieHistorySlice";

export default function HistoryList() {
  const dispatch = useDispatch();

  const info = useSelector(
    (state) => state.userCalorieHistory.userHistory.content
  );

  const isClicked = useSelector((state) => state.userCalorieHistory.isClicked);

  const filteredData = useSelector(
    (state) => state.userCalorieHistory.filteredData
  );

  // useEffect(() => {
  //   dispatch(
  //     getHistory({
  //       filteredData: filteredData,
  //       page: 1,
  //     })
  //   );
  // }, [isClicked]);

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
