import {
  Pressable,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

import { StyleSheet, Text, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";

import { DataTable, TextInput } from "react-native-paper";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toolsActions } from "../../../redux/Tools/toolsSlice";
import { userAddingFoodActions } from "../../../redux/User/userAddingFoodSlice";

import { Ionicons } from "@expo/vector-icons";
import {
  foodCalculator,
  userFoodCalorieCalculatorActions,
} from "../../../redux/User/userFoodCalorieCalculatorSlice";
import Blur from "../../Common/Blur";
import FoodCalculatorFilter from "./FoodCalculatorFilter";
import {
  activityCalculator,
  userActivityCalorieCalculatorActions,
} from "../../../redux/User/userActivityCalorieCalculatorSlice";
import ActivityCalculatorFilter from "./ActivityCalculatorFilter";

export default function ActivityCalculator() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.signIn.token);
  const filteredData = useSelector(
    (state) => state.userActivityCalculator.filteredData
  );
  const isFoodFilterModalVisible = useSelector(
    (state) => state.tools.foodCalculationFilterModal
  );
  const isActivityFilterModalVisible = useSelector(
    (state) => state.tools.activityCalculationFilterModal
  );
  const activityCategories = useSelector(
    (state) => state.userActivityCalculator.activityCategories
  );
  const activities = useSelector(
    (state) => state.userActivityCalculator.activities
  );
  const category = useSelector(
    (state) => state.userActivityCalculator.filteredData.category
  );
  const activityRecord = useSelector(
    (state) => state.userActivityCalculator.activityRecord
  );

  const calculationResult = useSelector(
    (state) => state.userActivityCalculator.calculationResult
  );

  const id = useSelector(
    (state) => state.userActivityCalculator.activityRecord.activityId
  );
  const duration = useSelector(
    (state) => state.userActivityCalculator.activityRecord.duration
  );
  const heartRate = useSelector(
    (state) => state.userActivityCalculator.activityRecord.heartRate
  );
  const bodyTemp = useSelector(
    (state) => state.userActivityCalculator.activityRecord.bodyTemp
  );

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleRowPress = (rowData, rowIndex) => {
    setSelectedRowIndex(rowIndex);
    dispatch(
      userActivityCalorieCalculatorActions.setActivityCalculatorId(rowData.id)
    );
    dispatch(
      userActivityCalorieCalculatorActions.setActivityCalculatorHeartRate(
        rowData.heartBeat
      )
    );
    dispatch(
      userActivityCalorieCalculatorActions.setActivityCalculatorBodyTemp(
        rowData.bodyTemp
      )
    );
  };

  const addingHandler = () => {
    if (duration && id && duration > 0 && heartRate > 0 && bodyTemp > 0) {
      dispatch(activityCalculator(activityRecord));
      dispatch(userActivityCalorieCalculatorActions.setRefresh());
    } else {
      ToastAndroid.show(
        "You must fill all areas and choose an activity from the table. You can't enter negative values.",
        ToastAndroid.LONG
      );
    }
  };

  const openModal = () => {
    dispatch(toolsActions.setActivityCalculationFilterModalVisible(true));
  };

  return (
    <View>
      {/* {(isFoodFilterModalVisible || isActivityFilterModalVisible) && <Blur />} */}
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Activity Calculator</Text>
          <Pressable onPress={openModal}>
            <Ionicons name="filter-outline" size={32} color="black" />
          </Pressable>
        </View>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title style={styles.name}>Name</DataTable.Title>
            <DataTable.Title style={styles.category}>Category</DataTable.Title>
          </DataTable.Header>
          <ScrollView
            style={{ height: DEVICE_HEIGHT / 4.5 }}
            nestedScrollEnabled={true}
          >
            {activities.map((item, index) => (
              <TouchableOpacity
                key={Math.random()}
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
          <View style={styles.inputs}>
            <TextInput
              label="Duration (min)"
              onChangeText={(text) =>
                dispatch(
                  userActivityCalorieCalculatorActions.setActivityCalculatorDuration(
                    text
                  )
                )
              }
              mode="outlined"
              style={styles.textInputCalculate}
            />
            <TextInput
              label="Heart Rate"
              value={heartRate ? heartRate.toString() : "0"}
              onChangeText={(text) =>
                dispatch(
                  userActivityCalorieCalculatorActions.setActivityCalculatorHeartRate(
                    parseInt(text)
                  )
                )
              }
              mode="outlined"
              style={styles.textInputCalculate}
            />
            <TextInput
              label="Body Temperature"
              value={bodyTemp ? bodyTemp.toString() : "0"}
              onChangeText={(text) =>
                dispatch(
                  userActivityCalorieCalculatorActions.setActivityCalculatorBodyTemp(
                    parseInt(text)
                  )
                )
              }
              mode="outlined"
              style={styles.textInputCalculate}
            />
          </View>
          <Pressable onPress={addingHandler} style={styles.addContainer}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Calculate</Text>
            </View>
          </Pressable>
        </View>
        <View>
          <Text style={styles.calculationText}>
            {calculationResult} calories
          </Text>
        </View>
      </View>
      <ActivityCalculatorFilter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    marginBottom: DEVICE_HEIGHT / 2.5,
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
  dataTable: {
    height: DEVICE_HEIGHT / 3.1,
  },
  addingPart: {
    // width: DEVICE_WIDTH / 2.2,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DEVICE_HEIGHT / 40,
    marginTop: DEVICE_HEIGHT / 50,
  },
  inputs: {
    flexDirection: "row",
    width: DEVICE_WIDTH / 1.1,
    justifyContent: "space-evenly",
    marginBottom: DEVICE_HEIGHT / 60,
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
    width: DEVICE_WIDTH / 4,
    height: DEVICE_HEIGHT / 20,
    fontSize: DEVICE_WIDTH / 30,
  },
  button: {
    backgroundColor: "#680770",
    width: DEVICE_WIDTH / 5,
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
  calculationText: {
    fontSize: DEVICE_WIDTH / 15,
  },
});