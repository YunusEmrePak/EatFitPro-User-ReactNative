import {
  ActivityIndicator,
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

import {
  foodCalculator,
  userFoodCalorieCalculatorActions,
} from "../../../redux/User/userFoodCalorieCalculatorSlice";
import FilterButton from "../../Common/FilterButton";
import FoodCalculatorFilter from "./FoodCalculatorFilter";

export default function FoodCalculator() {
  const dispatch = useDispatch();

  const foods = useSelector((state) => state.userFoodCalculator.foods);
  const foodRecord = useSelector(
    (state) => state.userFoodCalculator.foodRecord
  );
  const calculationResult = useSelector(
    (state) => state.userFoodCalculator.calculationResult
  );
  const mass = useSelector((state) => state.userFoodCalculator.foodRecord.mass);
  const id = useSelector(
    (state) => state.userFoodCalculator.foodRecord.foodDto.id
  );

  const foodStatus = useSelector(
    (state) => state.userFoodCalculator.foodStatus
  );
  const calculateStatus = useSelector(
    (state) => state.userFoodCalculator.calculateStatus
  );

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleRowPress = (rowData, rowIndex) => {
    setSelectedRowIndex(rowIndex);
    dispatch(userFoodCalorieCalculatorActions.setFoodCalculatorId(rowData.id));
  };

  const addingHandler = () => {
    if (mass && id && mass > 0) {
      dispatch(foodCalculator(foodRecord));
      dispatch(userFoodCalorieCalculatorActions.setRefresh());
      setSelectedRowIndex(-1);
      dispatch(userFoodCalorieCalculatorActions.setFoodRecordNull());
    } else {
      ToastAndroid.show(
        "You must fill the amount area and choose a food from the table to calculate. You can't enter negative value.",
        ToastAndroid.LONG
      );
    }
  };

  const openModal = () => {
    dispatch(toolsActions.setFoodCalculationFilterModalVisible(true));
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Food Calculator</Text>
          <FilterButton onPress={openModal} />
        </View>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title style={styles.name}>Name</DataTable.Title>
            <DataTable.Title style={styles.calorie}>
              Calories (per 100gr)
            </DataTable.Title>
            <DataTable.Title style={styles.category}>Category</DataTable.Title>
          </DataTable.Header>
          <View style={styles.tableContainer}>
            {foodStatus === "pending" ? (
              <ActivityIndicator size="large" />
            ) : (
              <ScrollView
                style={{ height: DEVICE_HEIGHT / 4.5 }}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps="handled"
              >
                {foods.map((item, index) => (
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
                      <DataTable.Cell style={styles.calorie}>
                        {item.calories}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.category}>
                        {item.foodCategoryDto.name}
                      </DataTable.Cell>
                    </DataTable.Row>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </DataTable>
        <View style={styles.addingPart}>
          <TextInput
            label="Mass"
            value={mass}
            keyboardType="numeric"
            onChangeText={(text) =>
              dispatch(
                userFoodCalorieCalculatorActions.setFoodCalculatorMass(text)
              )
            }
            mode="outlined"
            style={styles.textInputCalculate}
          />
          <View style={styles.button}>
            <Pressable
              onPress={addingHandler}
              style={({ pressed }) => pressed && styles.pressedItem}
              android_ripple={{
                color: "#fff1fc",
              }}
            >
              {calculateStatus === "pending" ? (
                <ActivityIndicator
                  color="#fff"
                  style={{
                    width: DEVICE_WIDTH / 5,
                    height: DEVICE_HEIGHT / 20,
                  }}
                />
              ) : (
                <Text style={styles.buttonText}>Calculate</Text>
              )}
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={styles.calculationText}>
            {calculationResult} calories
          </Text>
        </View>
      </View>
      <FoodCalculatorFilter />
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
  tableContainer: {
    height: DEVICE_HEIGHT / 3.7,
    justifyContent: "center",
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
    flexDirection: "row",
    width: DEVICE_WIDTH / 2,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DEVICE_HEIGHT / 50,
    marginTop: DEVICE_HEIGHT / 50,
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
    overflow: "hidden",
  },
  buttonText: {
    fontSize: DEVICE_WIDTH / 25,
    textAlign: "center",
    color: "white",
    // padding: DEVICE_WIDTH / 50,
    width: DEVICE_WIDTH / 5,
    height: DEVICE_HEIGHT / 20,
    marginTop: DEVICE_HEIGHT / 40,
  },
  calculationText: {
    fontSize: DEVICE_WIDTH / 15,
  },
  pressedItem: {
    opacity: 0.8,
  },
});
