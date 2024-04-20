import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
import HistoryListItem from "./HistoryListItem";
import { useDispatch, useSelector } from "react-redux";

import { Octicons } from "@expo/vector-icons";

import {
  getHistory,
  userCalorieHistoryActions,
} from "../../../redux/User/userCalorieHistorySlice";
import { useEffect, useRef, useState } from "react";
import { Modal, TextInput } from "react-native-paper";

import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { toolsActions } from "../../../redux/Tools/toolsSlice";
import { Button } from "react-native";

export default function HistoryFilter() {
  const dispatch = useDispatch();

  const filteredData = useSelector(
    (state) => state.userCalorieHistory.filteredData
  );

  const foodName = useSelector(
    (state) => state.userCalorieHistory.filteredData.foodName
  );
  const activityName = useSelector(
    (state) => state.userCalorieHistory.filteredData.activityName
  );

  const isModalVisible = useSelector((state) => state.tools.filterModal);

  const filterHandler = () => {
    dispatch(getHistory({ filteredData: filteredData, page: 1 }));
    dispatch(userCalorieHistoryActions.setPageNumber(1));
    dispatch(userCalorieHistoryActions.setClicked());
    dispatch(toolsActions.setFilterModalVisible(false));
  };

  const onCloseModal = () => {
    dispatch(toolsActions.setFilterModalVisible(false));
  };

  const resetFilter = () => {
    dispatch(userCalorieHistoryActions.setResetHistoryFilter());
  };

  // kamil.aslan548@hotmail.com

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={() => onCloseModal()}
      animationType="slide"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.container}
            onPress={(event) => event.stopPropagation()}
          >
            <View>
              <View style={styles.top}>
                <Text style={styles.title}>Filter History</Text>
                <View style={styles.resetButtonContainer}>
                  <Pressable onPress={resetFilter}>
                    <View style={styles.resetButton}>
                      <Text style={styles.resetButtonText}>Reset Filter</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={styles.inputs}>
                <TextInput
                  label="Food Name"
                  onChangeText={(text) =>
                    dispatch(userCalorieHistoryActions.setFoodName(text))
                  }
                  mode="outlined"
                  value={foodName}
                  style={styles.textInputFilter}
                />
                <TextInput
                  label="Activity Name"
                  onChangeText={(text) =>
                    dispatch(userCalorieHistoryActions.setActivityName(text))
                  }
                  mode="outlined"
                  value={activityName}
                  style={styles.textInputFilter}
                />
                <TextInput
                  label="Date"
                  mode="outlined"
                  style={styles.textInputFilter}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Pressable onPress={filterHandler}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Apply Filter</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    paddingTop: DEVICE_HEIGHT / 5,
  },
  container: {
    width: DEVICE_WIDTH / 1.25,
    height: DEVICE_HEIGHT / 3,
    alignItems: "flex-start",
    backgroundColor: "white",
    // marginLeft: DEVICE_WIDTH / 10,
    paddingHorizontal: DEVICE_WIDTH / 20,
    paddingVertical: DEVICE_HEIGHT / 80,
    borderRadius: DEVICE_WIDTH / 40,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: DEVICE_WIDTH / 1.45,
    marginBottom: DEVICE_HEIGHT / 80,
  },
  title: {
    fontSize: DEVICE_WIDTH / 20,
  },
  textInputFilter: {
    width: DEVICE_WIDTH / 1.43,
    height: DEVICE_HEIGHT / 20,
    fontSize: DEVICE_WIDTH / 30,
  },
  button: {
    backgroundColor: "#680770",
    width: DEVICE_WIDTH / 4,
    height: DEVICE_HEIGHT / 24,
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
  buttonContainer: {
    alignItems: "center",
    width: DEVICE_WIDTH / 1.25,
    paddingRight: DEVICE_WIDTH / 10,
  },
  resetButton: {
    // width: DEVICE_WIDTH / 4,
  },
  resetButtonText: {
    fontSize: DEVICE_WIDTH / 25,
    color: "#680770",
  },
  resetButtonContainer: {},

  inputs: {
    justifyContent: "space-evenly",
    marginBottom: DEVICE_HEIGHT / 50,
  },
});
