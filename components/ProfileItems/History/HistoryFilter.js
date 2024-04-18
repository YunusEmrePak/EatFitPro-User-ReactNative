import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import HistoryListItem from "./HistoryListItem";
import { useDispatch, useSelector } from "react-redux";

import { Octicons } from "@expo/vector-icons";

import {
  getHistory,
  userCalorieHistoryActions,
} from "../../../redux/User/userCalorieHistorySlice";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";

import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HistoryFilter() {
  const dispatch = useDispatch();

  const filteredData = useSelector(
    (state) => state.userCalorieHistory.filteredData
  );

  const page = useSelector((state) => state.userCalorieHistory.pageNumber);
//   const date = useSelector(
//     (state) => state.userCalorieHistory.filteredData.date
//   );

  const filterHandler = () => {
    dispatch(getHistory({ filteredData: filteredData, page: page }));
    dispatch(userCalorieHistoryActions.setPageNumber(1));
    dispatch(userCalorieHistoryActions.setClicked());
  };

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false); 
    setDate(selectedDate || date); // Update state with new date
    console.log(selectedDate)
};

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <TextInput
          label="Food Name"
          onChangeText={(text) =>
            dispatch(userCalorieHistoryActions.setFoodName(text))
          }
          mode="outlined"
          style={styles.textInputFilter}
        />
        <TextInput
          label="Activity Name"
          onChangeText={(text) =>
            dispatch(userCalorieHistoryActions.setActivityName(text))
          }
          mode="outlined"
          style={styles.textInputFilter}
        />
        {/* <TextInput
          label="Date"
          // onChangeText={(text) =>
          //   dispatch(userCalorieHistoryActions.setActivityName(text))
          // }
          mode="outlined"
          style={styles.textInputFilter}
        /> */}
        <View>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Text>Select Date</Text>
          </TouchableOpacity>
          {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"  // Can be 'date', 'time', or 'datetime'
          onChange={onDateChange}
        />
      )} 
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={filterHandler}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>FIND</Text>
            <Octicons name="search" size={DEVICE_WIDTH / 25} color="white" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DEVICE_HEIGHT / 30,
    marginTop: DEVICE_HEIGHT / 30,
    // width: DEVICE_WIDTH / 2,
    alignItems: "center",
  },
  textInputFilter: {
    width: DEVICE_WIDTH / 4,
    height: DEVICE_HEIGHT / 20,
    fontSize: DEVICE_WIDTH / 40,
  },
  button: {
    backgroundColor: "#680770",
    width: DEVICE_WIDTH / 6,
    height: DEVICE_HEIGHT / 20,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: DEVICE_WIDTH / 30,
  },
  buttonText: {
    fontSize: DEVICE_WIDTH / 25,
    textAlign: "center",
    color: "white",
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: DEVICE_HEIGHT / 50,
    width: DEVICE_WIDTH / 1.1,
  },
});
