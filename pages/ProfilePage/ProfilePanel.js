import { Pressable, StyleSheet, Text, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { SafeAreaView } from "react-native-safe-area-context";

import ConsumedImage from "../../assets/images/ProfileImages/salad.png";
import BurnedImage from "../../assets/images/ProfileImages/speed.png";
import BalanceImage from "../../assets/images/ProfileImages/balance.png";
import CalorieCard from "../../components/ProfileItems/CalorieCard";

const BurnedColor = {
  first: "#FF5852",
  second: "#FF8E4C",
};

const ConsumedColor = {
  first: "#AB4599",
  second: "#4F043F",
};

const BalanceColor = {
  first: "#116391",
  second: "#26A1B0",
};

export default function ProfilePanel() {
  return (
    <SafeAreaView style={styles.container}>
      <CalorieCard
        color={BurnedColor}
        src={BurnedImage}
        name="Burned"
        calorie="1516"
      />
      <CalorieCard
        color={ConsumedColor}
        src={ConsumedImage}
        name="Consumed"
        calorie="2563"
      />
      <CalorieCard
        color={BalanceColor}
        src={BalanceImage}
        name="Calories Balance"
        calorie="147"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
