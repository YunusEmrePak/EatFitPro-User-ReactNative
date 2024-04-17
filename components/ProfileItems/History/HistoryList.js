import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import HistoryListItem from "./HistoryListItem";
import { useDispatch, useSelector } from "react-redux";

import getHistory from "../../../redux/User/userCalorieHistorySlice";
import { useEffect } from "react";
import { FlatList } from "native-base";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

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

//   useEffect(() => {
//     dispatch(
//       getHistory({
//         filteredData: filteredData,
//         page: pageNumber,
//       })
//     );
//   }, [isClicked]);
  return (
    <View style={styles.container}>
      <HistoryListItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
