import { Modal, Pressable } from "react-native";

import { StyleSheet, Text, View } from "react-native";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../../../constants/constants";

import { TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toolsActions } from "../../../../../redux/Tools/toolsSlice";
import {
  getFoods,
  userGettingFoodActions,
} from "../../../../../redux/User/userGettingFoodSlice";

import { Provider } from "react-native-paper";

import { TouchableWithoutFeedback } from "react-native";

export default function FoodFilter() {
  const dispatch = useDispatch();

  const isModalVisible = useSelector((state) => state.tools.foodFilterModal);
  const filteredData = useSelector(
    (state) => state.userGettingFood.filteredData
  );
  const foodCategories = useSelector(
    (state) => state.userGettingFood.foodCategories
  );
  const category = useSelector((state) => state.userGettingFood.category);
  const name = useSelector((state) => state.userGettingFood.filteredData.name);
  const isReset = useSelector((state) => state.userGettingFood.isReset);

  const dropdownList = foodCategories.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const [showDropDown, setShowDropDown] = useState(false);

  const onCloseModal = () => {
    dispatch(toolsActions.setFoodFilterModalVisible());
  };

  const filterHandler = () => {
    dispatch(getFoods({ filteredData: filteredData, page: 1 }));
    dispatch(toolsActions.setFoodFilterModalVisible());
  };

  const resetFilter = () => {
    dispatch(userGettingFoodActions.setFilteredDataNull());
    dispatch(userGettingFoodActions.setIsReset());
  };

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={() => onCloseModal()}
      transparent={true}
    >
      <Provider>
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.container}
              onPress={(event) => event.stopPropagation()}
            >
              <View style={styles.top}>
                <Text style={styles.title}>Filter Foods</Text>
                <View style={styles.resetButtonContainer}>
                  <Pressable onPress={resetFilter}>
                    <View style={styles.resetButton}>
                      <Text style={styles.resetButtonText}>Reset Filter</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={styles.filterPart}>
                <View
                  style={{
                    width: DEVICE_WIDTH / 1.42,
                  }}
                >
                  <DropDown
                    label={"All Categories"}
                    mode={"outlined"}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    value={category}
                    setValue={(val) => {
                      dispatch(userGettingFoodActions.setCategory(val));
                      dispatch(userGettingFoodActions.setFoodCategoryName(val));
                    }}
                    list={dropdownList}
                    key={(val) => val.value}
                    dropDownItemTextStyle={{ fontSize: 14 }}
                  />
                </View>
                <TextInput
                  label="Name"
                  value={name}
                  onChangeText={(text) =>
                    dispatch(userGettingFoodActions.setName(text))
                  }
                  mode="outlined"
                  style={styles.textInputFilter}
                />
                <Pressable onPress={filterHandler} style={styles.applyFilter}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Apply Filter</Text>
                  </View>
                </Pressable>
              </View>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Provider>
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
    width: DEVICE_WIDTH / 1.2,
    height: DEVICE_HEIGHT / 3.2,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingTop: DEVICE_HEIGHT / 30,
    backgroundColor: "#fff",
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
  filterPart: {
    width: DEVICE_WIDTH / 1.2,
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: DEVICE_WIDTH / 15,
  },
  resetButton: {
    // width: DEVICE_WIDTH / 4,
  },
  resetButtonText: {
    fontSize: DEVICE_WIDTH / 25,
    color: "#680770",
  },
  mass: {
    width: DEVICE_WIDTH / 3,
  },
  textInputFilter: {
    width: DEVICE_WIDTH / 1.42,
    height: DEVICE_HEIGHT / 20,
    fontSize: DEVICE_WIDTH / 30,
    marginBottom: DEVICE_HEIGHT / 100,
    marginTop: DEVICE_HEIGHT / 100,
  },
  applyFilter: {
    width: DEVICE_WIDTH / 1.42,
    alignItems: "center",
    marginTop: DEVICE_HEIGHT / 60,
  },
  button: {
    backgroundColor: "#680770",
    width: DEVICE_WIDTH / 4,
    height: DEVICE_HEIGHT / 22,
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
