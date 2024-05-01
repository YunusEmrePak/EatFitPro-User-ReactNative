import {
  Modal,
  Pressable,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

import { StyleSheet, Text, View } from "react-native";
import { DataTable, TextInput } from "react-native-paper";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../../../constants/constants";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toolsActions } from "../../../../../redux/Tools/toolsSlice";
import {
  addingActivityRecord,
  userAddingActivityActions,
} from "../../../../../redux/User/userAddingActivitySlice";
import { userGettingActivityActions } from "../../../../../redux/User/userGettingActivitySlice";

import { getUserCalorieInfo } from "../../../../../redux/User/userInformationSlice";
import Blur from "../../../../Common/Blur";
import FilterButton from "../../../../Common/FilterButton";
import Header from "../../../../Common/Header";
import ActivityFilter from "./ActivityFilter";
import { ActivityIndicator } from "react-native";
// kamil.aslan548@hotmail.com

export default function ActivityModal() {
  const dispatch = useDispatch();

  const isModalVisible = useSelector((state) => state.tools.activityModal);
  const isFilterModalVisible = useSelector(
    (state) => state.tools.activityFilterModal
  );
  const activities = useSelector(
    (state) => state.userGettingActivity.activities
  );
  const activityRecord = useSelector(
    (state) => state.userAddingActivity.activityRecord
  );
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
  const activityStatus = useSelector(
    (state) => state.userGettingActivity.activityStatus
  );
  const activityAddingStatus = useSelector(
    (state) => state.userAddingActivity.addingStatus
  );

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

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

  const addingHandler = () => {
    if (duration && id && duration > 0 && heartRate > 0 && bodyTemp > 0) {
      dispatch(addingActivityRecord(activityRecord));
      dispatch(userAddingActivityActions.setRefresh());
      dispatch(getUserCalorieInfo());
      dispatch(userAddingActivityActions.setActivityRecordNull());
      // onCloseModal();
    } else {
      ToastAndroid.show(
        "You must fill all areas and choose an activity from the table. You can't enter negative values.",
        ToastAndroid.LONG
      );
    }
  };

  const openModal = () => {
    dispatch(userGettingActivityActions.setStatusNull());
    dispatch(toolsActions.setActivityFilterModalVisible(true));
  };

  useEffect(() => {
    if (activityAddingStatus === "succeeded") {
      onCloseModal();
    }
  }, [activityAddingStatus]);

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={() => onCloseModal()}
      animationType="slide"
      transparent={true}
    >
      {isFilterModalVisible && <Blur />}
      <Header />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Add Activity</Text>
          <FilterButton onPress={openModal} />
        </View>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title style={styles.name}>Name</DataTable.Title>
            <DataTable.Title style={styles.category}>Category</DataTable.Title>
          </DataTable.Header>
          <View style={styles.tableContainer}>
            {activityStatus === "pending" ? (
              <ActivityIndicator size="large" />
            ) : activities.length !== 0 ? (
              <ScrollView style={{ height: DEVICE_HEIGHT / 4.5 }}>
                {activities.map((item, index) => (
                  <TouchableOpacity
                    key={Math.random()}
                    onPress={() => handleRowPress(item, index)}
                  >
                    <DataTable.Row
                      style={{
                        backgroundColor:
                          selectedRowIndex === index ? "lightblue" : "white",
                        width: DEVICE_WIDTH / 1.17,
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
            ) : (
              <Text
                style={{
                  fontSize: DEVICE_WIDTH / 25,
                }}
              >
                No results found.
              </Text>
            )}
          </View>
        </DataTable>
        <View style={styles.addingPart}>
          <View style={styles.inputs}>
            <TextInput
              label="Duration (min)"
              onChangeText={(text) =>
                dispatch(
                  userAddingActivityActions.setAddingActivityDuration(text)
                )
              }
              mode="outlined"
              style={styles.textInputCalculate}
              keyboardType="numeric"
            />
            <TextInput
              label="Heart Rate"
              value={heartRate ? heartRate.toString() : "0"}
              onChangeText={(text) =>
                dispatch(
                  userAddingActivityActions.setAddingActivityHeartRate(
                    parseInt(text)
                  )
                )
              }
              mode="outlined"
              style={styles.textInputCalculate}
              keyboardType="numeric"
            />
            <TextInput
              label="Body Temperature"
              value={bodyTemp ? bodyTemp.toString() : "0"}
              onChangeText={(text) =>
                dispatch(
                  userAddingActivityActions.setAddingActivityBodyTemp(
                    parseInt(text)
                  )
                )
              }
              mode="outlined"
              style={styles.textInputCalculate}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.button}>
            <Pressable
              onPress={addingHandler}
              style={({ pressed }) => pressed && styles.pressedItem}
              android_ripple={{
                color: "#fff1fc",
              }}
            >
              {activityAddingStatus === "pending" ? (
                <ActivityIndicator
                  color="#fff"
                  style={{
                    width: DEVICE_WIDTH / 6,
                    height: DEVICE_HEIGHT / 20,
                  }}
                />
              ) : (
                <Text style={styles.buttonText}>ADD</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
      <ActivityFilter />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingTop: DEVICE_HEIGHT / 30,
  },
  tableContainer: {
    height: DEVICE_HEIGHT / 4.5,
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: `rgba(0, 0, 0, 0.5)`,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    // backgroundColor: "black",
    zIndex: 2,
  },
  titleContainer: {
    height: DEVICE_HEIGHT / 20,
    width: DEVICE_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: DEVICE_WIDTH / 12,
    paddingRight: DEVICE_WIDTH / 12,
    marginBottom: DEVICE_HEIGHT / 80,
    marginTop: DEVICE_HEIGHT / 80,
  },
  text: {
    color: "black",
    fontSize: DEVICE_WIDTH / 16,
  },
  addingPart: {
    // width: DEVICE_WIDTH / 2.2,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DEVICE_HEIGHT / 20,
    marginTop: DEVICE_HEIGHT / 50,
  },
  inputs: {
    flexDirection: "row",
    width: DEVICE_WIDTH / 1.1,
    justifyContent: "space-evenly",
  },
  name: {
    flex: 2,
  },
  calorie: {
    flex: 2,
  },
  category: {
    flex: 1,
  },
  mass: {
    width: DEVICE_WIDTH / 3,
  },
  textInputCalculate: {
    width: DEVICE_WIDTH / 3.6,
    height: DEVICE_HEIGHT / 20,
    fontSize: DEVICE_WIDTH / 30,
  },
  button: {
    backgroundColor: "#680770",
    width: DEVICE_WIDTH / 6,
    height: DEVICE_HEIGHT / 20,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: DEVICE_WIDTH / 30,
    marginTop: DEVICE_HEIGHT / 60,
  },
  buttonText: {
    fontSize: DEVICE_WIDTH / 25,
    textAlign: "center",
    color: "white",
    width: DEVICE_WIDTH / 6,
    height: DEVICE_HEIGHT / 20,
    marginTop: DEVICE_HEIGHT / 40,
  },
  pressedItem: {
    opacity: 0.8,
  },
});
