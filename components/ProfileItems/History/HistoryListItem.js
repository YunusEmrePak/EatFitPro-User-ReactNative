import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";

import BalanceImage from "../../../assets/images/ProfileImages/blackBalance.png";
import ConsumedImage from "../../../assets/images/ProfileImages/blackFood.png";
import BurnedImage from "../../../assets/images/ProfileImages/blackExercise.png";

import CalendarIcon from "../../../assets/images/ProfileImages/calendar.png";
import HistoryFoodTable from "./HistoryFoodTable";
import HistoryActivityTable from "./HistoryActivityTable";

// kamil.aslan548@hotmail.com

const commonStyle = {
  fontSize: DEVICE_WIDTH / 18,
};

export default function HistoryListItem() {
  //   const [year, month, day] = data.date.split("-");
  //   const dateObj = new Date(year, month - 1, day);
  //   const formattedDate = dateObj.toLocaleDateString("en-GB", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.date}>
          <Image source={CalendarIcon} style={styles.icon} />
          <View>
            <Text style={styles.dateTitle}>17 Nisan 2024</Text>
          </View>
        </View>
        <View style={styles.calories}>
          <View style={styles.calorieContainer}>
            <Image source={ConsumedImage} style={styles.icon} />
            <Text style={styles.calorieText}>156 cal</Text>
          </View>
          <View style={styles.calorieContainer}>
            <Image source={BurnedImage} style={styles.icon} />
            <Text style={styles.calorieText}>125 cal</Text>
          </View>
          <View style={styles.calorieContainer}>
            <Image source={BalanceImage} style={styles.icon} />
            <Text style={styles.calorieText}>26 cal</Text>
          </View>
        </View>
      </View>
      <View style={styles.middle}>
        <HistoryFoodTable />
      </View>
      <View style={styles.right}>
        <HistoryActivityTable />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFB1F2",
    width: DEVICE_WIDTH / 1.05,
    height: DEVICE_HEIGHT / 4,
    borderRadius: DEVICE_WIDTH / 40,
    marginTop: DEVICE_HEIGHT / 60
  },
  left: {
    height: DEVICE_HEIGHT / 4.2,
    width: DEVICE_WIDTH / 6,
  },
  middle: {
    height: DEVICE_HEIGHT / 4.2,
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    height: DEVICE_HEIGHT / 4.2,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: DEVICE_WIDTH / 20,
    height: DEVICE_WIDTH / 20,
  },
  date: {
    alignItems: "center",
    marginTop: DEVICE_HEIGHT / 150,
  },
  dateTitle: {
    textAlign: "center",
  },
  calories: {
    alignItems: "center",
  },
  calorieContainer: {
    alignItems: "center",
    backgroundColor: "#FDFFB3",
    width: DEVICE_WIDTH / 6.5,
    height: DEVICE_HEIGHT / 20,
    marginTop: DEVICE_HEIGHT / 150,
    padding: DEVICE_WIDTH / 100,
    borderRadius: DEVICE_WIDTH / 50,
  },
});
