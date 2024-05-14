import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT } from "../../../constants/constants";
import HistoryListItem from "./HistoryListItem";
import {
  getHistory,
  userCalorieHistoryActions,
} from "../../../redux/User/userCalorieHistorySlice";
import { useEffect, useRef, useState } from "react";

export default function HistoryList() {
  const dispatch = useDispatch();

  let counter = 1;

  const info = useSelector((state) => state.userCalorieHistory.userHistory);

  const filteredHistoryData = useSelector(
    (state) => state.userCalorieHistory.filteredData
  );

  const pageNumber = useSelector(
    (state) => state.userCalorieHistory.pageNumber
  );

  const isEnded = useSelector((state) => state.userCalorieHistory.isEnded);

  const historyStatus = useSelector(
    (state) => state.userCalorieHistory.historyStatus
  );

  const handleLoadMore = () => {
    dispatch(userCalorieHistoryActions.setIsEnded());
    dispatch(userCalorieHistoryActions.setPageNumber());
  };

  useEffect(() => {
    if (isEnded) {
      dispatch(
        getHistory({ filteredData: filteredHistoryData, page: pageNumber })
      );
      dispatch(userCalorieHistoryActions.setIsEnded());
    }
  }, [pageNumber, isEnded]);

  return (
    <View style={styles.container}>
      {historyStatus === "pending" ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={info}
          renderItem={(item) => <HistoryListItem data={item.item} />}
          key={Math.random()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DEVICE_HEIGHT / 4,
  },
});
