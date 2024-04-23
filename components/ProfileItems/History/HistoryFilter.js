import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Button,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";

import { useRef, useState } from "react";
import { Modal, TextInput } from "react-native-paper";
import {
  getHistory,
  userCalorieHistoryActions,
} from "../../../redux/User/userCalorieHistorySlice";
import { toolsActions } from "../../../redux/Tools/toolsSlice";
import { format } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const date = useSelector(
    (state) => state.userCalorieHistory.filteredData.date
  );
  const dateString = useSelector(
    (state) => state.userCalorieHistory.dateString
  );

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

  const [isPickerShow, setIsPickerShow] = useState(false);
  const dateRef = useRef(null);

  const showPicker = () => {
    setIsPickerShow((prev) => !prev);
  };

  const onChange = (event, value) => {
    setIsPickerShow(false);
    if (value) {
      const dateString = value;
      const dateObj = new Date(dateString);
      const formattedDate = format(dateObj, "yyyy-MM-dd");
      dispatch(userCalorieHistoryActions.setDate(formattedDate));
      const [year, month, day] = formattedDate.split("-");
      const objDate = new Date(year, month - 1, day);
      const dateFormatted = objDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      dispatch(userCalorieHistoryActions.setDateString(dateFormatted));
    } else {
      dispatch(userCalorieHistoryActions.setDate(null));
    }

    if (dateRef.current) {
      dateRef.current.blur();
    }
  };

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
                <Pressable onPress={resetFilter}>
                  <View style={styles.resetButton}>
                    <Text style={styles.resetButtonText}>Reset Filter</Text>
                  </View>
                </Pressable>
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
                <View style={styles.dateContainer}>
                  <TextInput
                    label="Date"
                    mode="outlined"
                    value={dateString}
                    style={styles.textInputFilter}
                    onPressIn={showPicker}
                    showSoftInputOnFocus={false}
                    ref={dateRef}
                    blurOnSubmit={true}
                    right={
                      date && (
                        <TextInput.Icon
                          icon={"close"}
                          onPress={() => {
                            dispatch(userCalorieHistoryActions.setDate(null));
                            dispatch(userCalorieHistoryActions.setDateString(""));
                            dateRef.current.blur();
                          }}
                          style={{
                            marginTop: DEVICE_HEIGHT / 60,
                          }}
                        />
                      )
                    }
                  />
                  {isPickerShow && (
                    <DateTimePicker
                      value={date ? new Date(date) : new Date()}
                      mode={"date"}
                      is24Hour={true}
                      onChange={onChange}
                      style={styles.datePicker}
                    />
                  )}
                </View>
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
    marginBottom: DEVICE_HEIGHT / 200,
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
  inputs: {
    justifyContent: "space-evenly",
    marginBottom: DEVICE_HEIGHT / 50,
  },
  dateContainer: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: "black",
  },
});
