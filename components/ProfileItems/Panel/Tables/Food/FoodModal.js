import {
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

import { DataTable, TextInput } from "react-native-paper";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toolsActions } from "../../../../../redux/Tools/toolsSlice";
import {
  addingFoodRecord,
  userAddingFoodActions,
} from "../../../../../redux/User/userAddingFoodSlice";
import { userGettingFoodActions } from "../../../../../redux/User/userGettingFoodSlice";

import { getUserCalorieInfo } from "../../../../../redux/User/userInformationSlice";
import Header from "../../../../Common/Header";
// kamil.aslan548@hotmail.com

import Blur from "../../../../Common/Blur";
import FilterButton from "../../../../Common/FilterButton";
import FoodFilter from "./FoodFilter";

export default function FoodModal() {
  const dispatch = useDispatch();

  const isModalVisible = useSelector((state) => state.tools.foodModal);
  const isFilterModalVisible = useSelector(
    (state) => state.tools.foodFilterModal
  );
  const foods = useSelector((state) => state.userGettingFood.foods);

  const foodRecord = useSelector((state) => state.userAddingFood.foodRecord);

  const mass = useSelector((state) => state.userAddingFood.foodRecord.mass);
  const id = useSelector((state) => state.userAddingFood.foodRecord.food.id);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleRowPress = (rowData, rowIndex) => {
    setSelectedRowIndex(rowIndex);
    dispatch(userAddingFoodActions.setAddingFoodId(rowData.id));
  };

  const onCloseModal = () => {
    dispatch(toolsActions.setFoodModalVisible());
    dispatch(userAddingFoodActions.setFoodRecordNull());
    dispatch(userGettingFoodActions.setFilteredDataNull());
    dispatch(getUserCalorieInfo());
    setSelectedRowIndex(-1);
  };

  const addingHandler = () => {
    if (mass && id && mass > 0) {
      dispatch(addingFoodRecord(foodRecord));
      dispatch(userAddingFoodActions.setRefresh());
      dispatch(getUserCalorieInfo());
      dispatch(userAddingFoodActions.setFoodRecordNull());
      onCloseModal();
    } else {
      ToastAndroid.show(
        "You must fill the amount area and choose a food from the table. You can't enter negative value.",
        ToastAndroid.LONG
      );
    }
  };

  const openModal = () => {
    dispatch(toolsActions.setFoodFilterModalVisible(true));
  };

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
          <Text style={styles.text}>Add Food</Text>
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
          <ScrollView style={{ height: DEVICE_HEIGHT / 4.5 }}>
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
        </DataTable>
        <View style={styles.addingPart}>
          <TextInput
            label="Mass"
            keyboardType="numeric"
            onChangeText={(text) =>
              dispatch(userAddingFoodActions.setAddingFoodMass(text))
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
              <View>
                <Text style={styles.buttonText}>ADD</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <FoodFilter />
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
    flexDirection: "row",
    width: DEVICE_WIDTH / 2.2,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DEVICE_HEIGHT / 20,
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
    width: DEVICE_WIDTH / 6,
    height: DEVICE_HEIGHT / 20,
    marginTop: DEVICE_HEIGHT / 40,
  },
  pressedItem: {
    opacity: 0.8,
  },
});
