import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../../../constants/constants";

import { useDispatch, useSelector } from "react-redux";
import { toolsActions } from "../../../../../redux/Tools/toolsSlice";

// kamil.aslan548@hotmail.com

export default function TableButtons() {
  const dispatch = useDispatch();

  const tableName = useSelector((state) => state.tools.tableName);

  const changeToFoodTable = () => {
    dispatch(toolsActions.setTableName("Food"));
  };

  const changeToActivityTable = () => {
    dispatch(toolsActions.setTableName("Activity"));
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.foodButton,
          tableName === "Food" && { backgroundColor: "#690770", elevation: 8 },
        ]}
        onPress={changeToFoodTable}
      >
        <Text style={styles.text}>Food</Text>
      </Pressable>
      <Pressable
        style={[
          styles.activityButton,
          tableName === "Activity" && { backgroundColor: "#690770", elevation: 8 },
        ]}
        onPress={changeToActivityTable}
      >
        <Text style={styles.text}>Activity</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: DEVICE_WIDTH / 1.7,
    height: DEVICE_HEIGHT / 25,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: DEVICE_WIDTH / 50,
    marginBottom: DEVICE_HEIGHT / 40,
  },
  foodButton: {
    width: DEVICE_WIDTH / 4,
    height: DEVICE_HEIGHT / 23,
    backgroundColor: "#bb90bf", // bb90bf
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DEVICE_WIDTH / 30,
  },
  activityButton: {
    width: DEVICE_WIDTH / 4,
    height: DEVICE_HEIGHT / 23,
    backgroundColor: "#bb90bf",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DEVICE_WIDTH / 30,
  },
  text: {
    fontSize: DEVICE_WIDTH / 25,
    color: "white",
  },
});
