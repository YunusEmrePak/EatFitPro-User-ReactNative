import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";

import { Octicons } from "@expo/vector-icons";

import { useSelector } from "react-redux";

const commonStyle = {
  fontSize: DEVICE_WIDTH / 20,
};

export default function HistoryActivityTable({ list }) {
  const token = useSelector((state) => state.signIn.token);

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <View style={styles.title}>
          <Octicons name="dot-fill" size={commonStyle.fontSize} color="blue" />
          <Text style={styles.titleText}>Activities</Text>
        </View>
        <View style={styles.activityCount}>
          <Text>{list ? list.length : 0}</Text>
        </View>
      </View>
      <ScrollView nestedScrollEnabled={true}>
        {token &&
          list &&
          list.map((item) => (
            <View style={styles.item} key={Math.random()}>
              <View style={styles.name}>
                <Text style={styles.text} numberOfLines={1}>
                  {item.activityDto.name}
                </Text>
              </View>
              <View style={styles.mass}>
                <Text style={styles.text}>{parseInt(item.duration)} min</Text>
              </View>
              <View style={styles.calorie}>
                <Text style={styles.text}>
                  {parseInt(item.caloriesBurned)} cal
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: DEVICE_WIDTH / 2.7,
    height: DEVICE_HEIGHT / 8,
    backgroundColor: "#DBECF6",
    borderRadius: DEVICE_WIDTH / 30,
    paddingBottom: DEVICE_HEIGHT / 100,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: DEVICE_WIDTH / 3,
    height: DEVICE_HEIGHT / 20,
    marginBottom: DEVICE_HEIGHT / 80,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: DEVICE_WIDTH / 3.5,
    height: DEVICE_HEIGHT / 30,
    backgroundColor: "#79B8E1",
    borderRadius: DEVICE_WIDTH / 25,
    padding: DEVICE_WIDTH / 80,
    marginRight: DEVICE_WIDTH / 60,
  },
  titleText: {
    fontSize: DEVICE_WIDTH / 35,
  },
  item: {
    backgroundColor: "white",
    flexDirection: "row",
    width: DEVICE_WIDTH / 2.9,
    height: DEVICE_HEIGHT / 30,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: DEVICE_WIDTH / 120,
    marginBottom: DEVICE_HEIGHT / 200,
    borderRadius: DEVICE_WIDTH / 50,
  },
  text: {
    fontSize: DEVICE_WIDTH / 40,
  },
  name: {
    width: DEVICE_WIDTH / 6.3,
  },
  mass: {
    width: DEVICE_WIDTH / 11,
    alignItems: "center",
  },
  calorie: {
    // width: DEVICE_WIDTH / 5.3,
    alignItems: "flex-end",
  },
});
