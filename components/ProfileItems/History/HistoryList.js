import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import HistoryListItem from "./HistoryListItem";
import { useDispatch, useSelector } from "react-redux";

import { getHistory } from "../../../redux/User/userCalorieHistorySlice";
import { useEffect } from "react";

export default function HistoryList() {
  const dispatch = useDispatch();

  const info = useSelector(
    (state) => state.userCalorieHistory.userHistory.content
  );

  const statusHistory = useSelector((state) => state.userCalorieHistory.status);

  const isClicked = useSelector((state) => state.userCalorieHistory.isClicked);

  const pageNumber = useSelector(
    (state) => state.userCalorieHistory.pageNumber
  );
  const totalPage = useSelector((state) => state.userCalorieHistory.totalPage);
  const filteredData = useSelector(
    (state) => state.userCalorieHistory.filteredData
  );

  const token = useSelector((state) => state.signIn.token);

  useEffect(() => {
    dispatch(
      getHistory({
        filteredData: filteredData,
        page: 1,
      })
    );
  }, [isClicked]);

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
    marginBottom: DEVICE_HEIGHT / 2.35,
    // marginTop: DEVICE_HEIGHT / 50
  },
});
