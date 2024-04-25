import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Common/Header";
import FoodCalculator from "../../components/ProfileItems/Calculator/FoodCalculator";
import { View } from "react-native";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../../constants/constants";
import ActivityCalculator from "../../components/ProfileItems/Calculator/ActivityCalculator";
import { useSelector } from "react-redux";
import Blur from "../../components/Common/Blur";

export default function ProfileCalculator() {
  const isFoodFilterModalVisible = useSelector(
    (state) => state.tools.foodCalculationFilterModal
  );
  const isActivityFilterModalVisible = useSelector(
    (state) => state.tools.activityCalculationFilterModal
  );
  return (
    <View>
      {(isFoodFilterModalVisible || isActivityFilterModalVisible) && <Blur />}
      {/* <Header title="Calculator" /> */}
      <Header title="EatFitPro" />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <FoodCalculator />
        <View style={styles.divider}></View>
        <ActivityCalculator />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    width: DEVICE_WIDTH,
    borderTopColor: "#777",
    borderTopWidth: DEVICE_WIDTH / 400,
    marginTop: DEVICE_HEIGHT / 40,
  },
});
