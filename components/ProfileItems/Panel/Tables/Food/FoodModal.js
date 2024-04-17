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

import DropDown from "react-native-paper-dropdown";
import { DataTable, TextInput } from "react-native-paper";
import Pagination from "react-native-pagination";

import { Octicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { toolsActions } from "../../../../../redux/Tools/toolsSlice";
import { useState } from "react";
import {
  getFoods,
  userGettingFoodActions,
} from "../../../../../redux/User/userGettingFoodSlice";
import {
  addingFoodRecord,
  userAddingFoodActions,
} from "../../../../../redux/User/userAddingFoodSlice";

import { Provider } from "react-native-paper";
import {
  getUserCalorieInfo,
  getUserInfo,
} from "../../../../../redux/User/userInformationSlice";
// kamil.aslan548@hotmail.com

export default function FoodModal() {
  const dispatch = useDispatch();

  const isModalVisible = useSelector((state) => state.tools.foodModal);
  const filteredData = useSelector(
    (state) => state.userGettingFood.filteredData
  );
  const pageNumber = useSelector((state) => state.userGettingFood.pageNumber);
  const totalPage = useSelector((state) => state.userGettingFood.totalPage);
  const foodCategories = useSelector(
    (state) => state.userGettingFood.foodCategories
  );
  const foods = useSelector((state) => state.userGettingFood.foods);
  const category = useSelector((state) => state.userGettingFood.category);
  const foodRecord = useSelector((state) => state.userAddingFood.foodRecord);
  const addingStatus = useSelector((state) => state.userAddingFood.status);

  const mass = useSelector((state) => state.userAddingFood.foodRecord.mass);
  const id = useSelector((state) => state.userAddingFood.foodRecord.food.id);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const dropdownList = foodCategories.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const [showDropDown, setShowDropDown] = useState(false);

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

  const filterHandler = () => {
    dispatch(getFoods({ filteredData: filteredData, page: 1 }));
    dispatch(userGettingFoodActions.setPageNumber(1));
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
                  dispatch(userGettingFoodActions.setCategory(val));
                  dispatch(userGettingFoodActions.setFoodCategoryName(val));
                } else {
                  dispatch(userGettingFoodActions.setCategory(null));
                  dispatch(userGettingFoodActions.setFoodCategoryName(""));
                }
              }}
              list={dropdownList}
              key={(val) => val.value}
              dropDownItemTextStyle={{ fontSize: 14 }}
            />
            <TextInput
              label="Name"
              onChangeText={(text) =>
                dispatch(userGettingFoodActions.setName(text))
              }
              mode="outlined"
              style={styles.textInputFilter}
            />
            <Pressable onPress={filterHandler}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>FIND</Text>
                <Octicons
                  name="search"
                  size={DEVICE_WIDTH / 25}
                  color="white"
                />
              </View>
            </Pressable>
          </View>
          <DataTable style={styles.dataTable}>
            <DataTable.Header>
              <DataTable.Title style={styles.name}>Name</DataTable.Title>
              <DataTable.Title style={styles.calorie}>
                Calories (per 100gr)
              </DataTable.Title>
              <DataTable.Title style={styles.category}>
                Category
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={{ height: DEVICE_HEIGHT / 4 }}>
              {foods.map((item, index) => (
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
          {/* <Pagination
            totalItemsCount={foods.length}
            itemsCountPerPage={5}
            activePage={2}
            onSelectPage={(page) => setCurrentPage(page)}
          /> */}
          <View style={styles.addingPart}>
            <TextInput
              label="Mass"
              onChangeText={(text) =>
                dispatch(userAddingFoodActions.setAddingFoodMass(text))
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
    width: DEVICE_WIDTH / 2.2,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DEVICE_HEIGHT / 20,
  },
  dataTable: {},
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
  textInputFilter: {
    width: DEVICE_WIDTH / 4.5,
    height: DEVICE_HEIGHT / 20,
    fontSize: DEVICE_WIDTH / 30,
  },
  textInputCalculate: {
    width: DEVICE_WIDTH / 4.5,
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
  },
});
