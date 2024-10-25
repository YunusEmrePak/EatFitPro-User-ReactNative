import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";

import CalorieCards from "../../components/ProfileItems/Panel/Cards/CalorieCards";
import Header from "../../components/Common/Header";
import Title from "../../components/Common/Title";

import { useDispatch, useSelector } from "react-redux";
import FoodTable from "../../components/ProfileItems/Panel/Tables/Food/FoodTable";
import ActivityTable from "../../components/ProfileItems/Panel/Tables/Activity/ActivityTable";
import TableButtons from "../../components/ProfileItems/Panel/Tables/Buttons/TableButtons";
import {
  getUserCalorieInfo,
  getUserInfo,
} from "../../redux/User/userInformationSlice";
import { useEffect } from "react";
import {
  getFoodCategoriesCalculator,
  getFoodsCalculator,
} from "../../redux/User/userFoodCalorieCalculatorSlice";
import {
  getActivitiesCalculator,
  getActivityCategoriesCalculator,
} from "../../redux/User/userActivityCalorieCalculatorSlice";
import { getUserGoal } from "../../redux/User/userAddGoalSlice";
import DailyGoal from "../../components/ProfileItems/Panel/DailyGoal/DailyGoal";
import Prediction from "../../components/ProfileItems/Panel/Prediction/Prediction";
import Blur from "../../components/Common/Blur";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Graph from "../../components/ProfileItems/Panel/Graph/Graph";
import { getUserGraphs } from "../../redux/User/userCalorieGraphSlice";

// kamil.aslan548@hotmail.com

export default function ProfilePanel() {
  const dispatch = useDispatch();

  const tableName = useSelector((state) => state.tools.tableName);

  const token = useSelector((state) => state.signIn.token);
  let refreshFood = useSelector((state) => state.userAddingFood.refresh);

  let refreshActivity = useSelector(
    (state) => state.userAddingActivity.refresh
  );

  const filteredFoodData = useSelector(
    (state) => state.userFoodCalculator.filteredData
  );

  const filteredActivityData = useSelector(
    (state) => state.userActivityCalculator.filteredData
  );

  const isPredictionModalVisible = useSelector(
    (state) => state.tools.predictionModal
  );

  useEffect(() => {
    if (token && (refreshFood || refreshActivity)) {
      dispatch(getUserInfo());
      dispatch(getUserCalorieInfo());
      dispatch(getFoodsCalculator({ filteredData: filteredFoodData, page: 1 }));
      dispatch(getFoodCategoriesCalculator());
      dispatch(
        getActivitiesCalculator({
          filteredData: filteredActivityData,
          page: 1,
        })
      );
      dispatch(getActivityCategoriesCalculator());
      dispatch(getUserGoal());
      dispatch(getUserGraphs());
    }
  }, [token, refreshFood, refreshActivity]);

  return (
    <View style={styles.container}>
      {/* <Header title="Panel" /> */}
      {isPredictionModalVisible && <Blur />}
      <Header title="EatFitPro" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        {/* <Graph /> */}
        <Title title="Today" />
        <CalorieCards />
        <Title title="Prediction" />
        <Prediction />
        <Title title="Daily Goal" />
        <DailyGoal />
        <Title title="Today's Record" />
        <TableButtons />
        <View style={styles.pagerView}>
          {tableName === "Food" && <FoodTable />}
          {tableName === "Activity" && <ActivityTable />}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: DEVICE_HEIGHT / 5,
  },
  scrollView: {
    alignItems: "center",
  },
  pagerView: {
    width: DEVICE_WIDTH / 1.2,
    marginBottom: DEVICE_HEIGHT / 15,
  },
});
