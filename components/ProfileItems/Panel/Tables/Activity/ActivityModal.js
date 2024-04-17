import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

import { StyleSheet, Text, View } from "react-native";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../../../constants/constants";
import { Octicons } from "@expo/vector-icons";
import DropDown from "react-native-paper-dropdown";
import { DataTable, TextInput } from "react-native-paper";
import Pagination from "react-native-pagination";

import { useDispatch, useSelector } from "react-redux";
import { toolsActions } from "../../../../../redux/Tools/toolsSlice";
import { useState } from "react";
import {
  getActivities,
  userGettingActivityActions,
} from "../../../../../redux/User/userGettingActivitySlice";
import {
  addingActivityRecord,
  userAddingActivityActions,
} from "../../../../../redux/User/userAddingActivitySlice";

import { Provider } from "react-native-paper";
import {
  getUserCalorieInfo,
  getUserInfo,
} from "../../../../../redux/User/userInformationSlice";
// kamil.aslan548@hotmail.com

export default function ActivityModal() {
  const dispatch = useDispatch();

  const isModalVisible = useSelector((state) => state.tools.activityModal);
  const filteredData = useSelector(
    (state) => state.userGettingActivity.filteredData
  );
  const pageNumber = useSelector(
    (state) => state.userGettingActivity.pageNumber
  );
  const totalPage = useSelector((state) => state.userGettingActivity.totalPage);
  const activityCategories = useSelector(
    (state) => state.userGettingActivity.activityCategories
  );
  const activities = useSelector(
    (state) => state.userGettingActivity.activities
  );
  const category = useSelector(
    (state) => state.userGettingActivity.category
  );
  const activityRecord = useSelector(
    (state) => state.userAddingActivity.activityRecord
  );
  const addingStatus = useSelector((state) => state.userAddingActivity.status);

  const id = useSelector(
    (state) => state.userAddingActivity.activityRecord.activityId
  );
  const duration = useSelector(
    (state) => state.userAddingActivity.activityRecord.duration
  );
  const heartRate = useSelector(
    (state) => state.userAddingActivity.activityRecord.heartRate
  );
  const bodyTemp = useSelector(
    (state) => state.userAddingActivity.activityRecord.bodyTemp
  );

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const dropdownList = activityCategories.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const [showDropDown, setShowDropDown] = useState(false);

  const handleRowPress = (rowData, rowIndex) => {
    setSelectedRowIndex(rowIndex);
    dispatch(userAddingActivityActions.setAddingActivityId(rowData.id));
    dispatch(
      userAddingActivityActions.setAddingActivityHeartRate(rowData.heartBeat)
    );
    dispatch(
      userAddingActivityActions.setAddingActivityBodyTemp(rowData.bodyTemp)
    );
  };

  const onCloseModal = () => {
    dispatch(toolsActions.setActivityModalVisible());
    dispatch(userAddingActivityActions.setActivityRecordNull());
    dispatch(userGettingActivityActions.setFilteredDataNull());
    dispatch(getUserCalorieInfo());
    setSelectedRowIndex(-1);
  };

  const filterHandler = () => {
    dispatch(getActivities({ filteredData: filteredData, page: 1 }));
    dispatch(userGettingActivityActions.setPageNumber(1));
  };

  const addingHandler = () => {
    if (duration && id && duration > 0 && heartRate > 0 && bodyTemp > 0) {
      dispatch(addingActivityRecord(activityRecord));
      dispatch(userAddingActivityActions.setRefresh());
      dispatch(getUserCalorieInfo());
      dispatch(userAddingActivityActions.setActivityRecordNull());
      onCloseModal();
    } else {
      ToastAndroid.show(
        "You must fill all areas and choose an activity from the table. You can't enter negative values.",
        ToastAndroid.LONG
      );
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={() => onCloseModal()}
      animationType="slide"
      transparent={true}
    >
      <Provider>
        <View style={styles.container}>
          <View style={styles.filterPart}>
            <DropDown
              label={"All Categories"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={category}
              setValue={(val) => {
                if (val) {
                  dispatch(userGettingActivityActions.setCategory(val));
                  dispatch(
                    userGettingActivityActions.setActivityCategoryName(val)
                  );
                } else {
                  dispatch(userGettingActivityActions.setCategory(null));
                  dispatch(
                    userGettingActivityActions.setActivityCategoryName("")
                  );
                }
              }}
              list={dropdownList}
              key={val => val.value}
            />
            <TextInput
              label="Name"
              onChangeText={(text) =>
                dispatch(userGettingActivityActions.setName(text))
              }
              mode="outlined"
              style={styles.textInputFilter}
            />
            <Pressable onPress={filterHandler}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>FIND</Text>
                <Octicons name="search" size={DEVICE_WIDTH / 25} color="white" />
              </View>
            </Pressable>
          </View>
          <DataTable style={styles.dataTable}>
            <DataTable.Header>
              <DataTable.Title style={styles.name}>Name</DataTable.Title>
              <DataTable.Title style={styles.category}>
                Category
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={{ height: DEVICE_HEIGHT / 4 }}>
              {activities.map((item, index) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => handleRowPress(item, index)}
                >
                  <DataTable.Row
                    style={{
                      backgroundColor:
                        selectedRowIndex === index ? "lightblue" : "white",
                    }}
                  >
                    <DataTable.Cell style={styles.name}>
                      {item.name}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.category}>
                      {item.activityCategoryDto.name}
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </DataTable>
          <View style={styles.addingPart}>
            <TextInput
              label="Duration (min)"
              onChangeText={(text) =>
                dispatch(
                  userAddingActivityActions.setAddingActivityDuration(text)
                )
              }
              mode="outlined"
              style={styles.textInputCalculate}
            />
            <TextInput
              label="Heart Rate"
              value={activityRecord.heartRate ? activityRecord.heartRate : 0}
              onChangeText={(text) =>
                dispatch(
                  userAddingActivityActions.setAddingActivityHeartRate(text)
                )
              }
              mode="outlined"
              style={styles.textInputCalculate}
            />
            <TextInput
              label="Body Temperature"
              value={activityRecord.bodyTemp ? activityRecord.bodyTemp : 0}
              onChangeText={(text) =>
                dispatch(
                  userAddingActivityActions.setAddingActivityBodyTemp(text)
                )
              }
              mode="outlined"
              style={styles.textInputCalculate}
            />
            <Pressable onPress={addingHandler}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>ADD</Text>
              </View>
            </Pressable>
          </View>
          <Button title="Close" onPress={() => onCloseModal()} />
        </View>
      </Provider>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  filterPart: {
    flexDirection: "row",
    width: DEVICE_WIDTH / 1.2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  addingPart: {
    flexDirection: "row",
    width: DEVICE_WIDTH / 1.1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DEVICE_HEIGHT / 20
  },
  dataTable: {},
  name: {
    flex: 2,
  },
  category: {
    flex: 3,
  },
  mass: {
    width: DEVICE_WIDTH / 3,
  },
  textInputFilter: {
    width: DEVICE_WIDTH / 4.5,
    height: DEVICE_HEIGHT / 20,
    fontSize: DEVICE_WIDTH / 40,
  },
  textInputCalculate: {
    width: DEVICE_WIDTH / 4.5,
    height: DEVICE_HEIGHT / 20,
    fontSize: DEVICE_WIDTH / 40,
    paddingRight: DEVICE_WIDTH / 4.3
  },
  button: {
    backgroundColor: "#680770",
    width: DEVICE_WIDTH / 6,
    height: DEVICE_HEIGHT / 20,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: DEVICE_WIDTH / 30
  },
  buttonText: {
    fontSize: DEVICE_WIDTH / 25,
    textAlign: "center",
    color: "white"
  },
});
