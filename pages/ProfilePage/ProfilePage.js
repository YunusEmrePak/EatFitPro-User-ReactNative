import { BackHandler, StyleSheet, ToastAndroid, View } from "react-native";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

import { useEffect, useRef } from "react";
import ProfileCalculator from "./ProfileCalculator";
import ProfileHistory from "./ProfileHistory";
import ProfileLeaderboard from "./ProfileLeaderboard";
import ProfilePanel from "./ProfilePanel";
import ProfileUser from "./ProfileUser";
import {
  getFoodCategoriesCalculator,
  getFoodsCalculator,
  userFoodCalorieCalculatorActions,
} from "../../redux/User/userFoodCalorieCalculatorSlice";
import {
  getActivitiesCalculator,
  getActivityCategoriesCalculator,
  userActivityCalorieCalculatorActions,
} from "../../redux/User/userActivityCalorieCalculatorSlice";
import {
  getUserCalorieInfo,
  getUserInfo,
} from "../../redux/User/userInformationSlice";
import { getHistory } from "../../redux/User/userCalorieHistorySlice";
import { getLeaderboard, getUserGoal } from "../../redux/User/userAddGoalSlice";
import { signInActions } from "../../redux/SignIn/signInSlice";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: DEVICE_HEIGHT / 13,
    // backgroundColor: "#1A1038",
    backgroundColor: "#1A1038",
    paddingBottom: DEVICE_HEIGHT / 200,
    paddingTop: DEVICE_HEIGHT / 250,
  },
};

const commonStyle = {
  tabBarSize: DEVICE_WIDTH / 30,
  focusedColor: "#680770",
  // focusedColor: "#3F3C99",
  unFocusedColor: "#fff",
  iconSize: DEVICE_WIDTH / 16,
};

export default function ProfilePage({ navigation }) {
  const dispatch = useDispatch();

  const backPressCount = useRef(0);

  const filteredFoodData = useSelector(
    (state) => state.userFoodCalculator.filteredData
  );
  const filteredActivityData = useSelector(
    (state) => state.userActivityCalculator.filteredData
  );
  const filteredHistoryData = useSelector(
    (state) => state.userCalorieHistory.filteredData
  );

  const pressLeaderboardHandler = () => {
    dispatch(getLeaderboard(1));
  };

  const pressCalculatorHandler = () => {
    dispatch(getFoodsCalculator({ filteredData: filteredFoodData, page: 1 }));
    dispatch(getFoodCategoriesCalculator());
    dispatch(
      getActivitiesCalculator({
        filteredData: filteredActivityData,
        page: 1,
      })
    );
    dispatch(getActivityCategoriesCalculator());
    dispatch(userFoodCalorieCalculatorActions.setResultNone());
    dispatch(userActivityCalorieCalculatorActions.setResultNone());
  };

  const pressPanelHandler = () => {
    dispatch(getUserCalorieInfo());
    dispatch(getUserGoal());
  };

  const pressHistoryHandler = () => {
    dispatch(
      getHistory({
        filteredData: filteredHistoryData,
        page: 1,
      })
    );
  };

  const pressProfileHandler = () => {
    dispatch(getUserInfo());
  };

  useEffect(() => {
    const backAction = () => {
      if (backPressCount.current === 1) {
        dispatch(signInActions.signOut());
        navigation.navigate("Introduction");
      } else {
        ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
        backPressCount.current += 1;

        setTimeout(() => {
          backPressCount.current = 0;
        }, 2000);
      }

      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Panel">
      <Tab.Screen
        name="Leaderboard"
        component={ProfileLeaderboard}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={focused && styles.focusIcon}>
                <MaterialIcons
                  name="leaderboard"
                  size={commonStyle.iconSize}
                  color={
                    focused
                      ? commonStyle.focusedColor
                      : commonStyle.unFocusedColor
                  }
                />
              </View>
            );
          },
          tabBarLabelStyle: {
            fontSize: commonStyle.tabBarSize,
            color: "#fff",
          },
        }}
        listeners={{
          tabPress: () => {
            pressLeaderboardHandler();
          },
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={ProfileCalculator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={focused && styles.focusIcon}>
                <Ionicons
                  name={"calculator"}
                  size={commonStyle.iconSize}
                  color={
                    focused
                      ? commonStyle.focusedColor
                      : commonStyle.unFocusedColor
                  }
                />
              </View>
            );
          },
          tabBarLabelStyle: {
            fontSize: commonStyle.tabBarSize,
            color: "#fff",
          },
        }}
        listeners={{
          tabPress: () => {
            pressCalculatorHandler();
          },
        }}
      />
      <Tab.Screen
        name="Panel"
        component={ProfilePanel}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={focused && styles.focusIcon}>
                <Ionicons
                  name={"home"}
                  size={commonStyle.iconSize}
                  color={
                    focused
                      ? commonStyle.focusedColor
                      : commonStyle.unFocusedColor
                  }
                />
              </View>
            );
          },
          tabBarLabelStyle: {
            fontSize: commonStyle.tabBarSize,
            color: "#fff",
          },
        }}
        listeners={{
          tabPress: () => {
            pressPanelHandler();
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={ProfileHistory}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={focused && styles.focusIcon}>
                <MaterialCommunityIcons
                  name="clipboard-text"
                  size={commonStyle.iconSize}
                  color={
                    focused
                      ? commonStyle.focusedColor
                      : commonStyle.unFocusedColor
                  }
                />
              </View>
            );
          },
          tabBarLabelStyle: {
            fontSize: commonStyle.tabBarSize,
            color: "#fff",
          },
        }}
        listeners={{
          tabPress: () => {
            pressHistoryHandler();
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileUser}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={focused && styles.focusIcon}>
                <MaterialIcons
                  name="person"
                  size={commonStyle.iconSize}
                  color={
                    focused
                      ? commonStyle.focusedColor
                      : commonStyle.unFocusedColor
                  }
                />
              </View>
            );
          },
          tabBarLabelStyle: {
            fontSize: commonStyle.tabBarSize,
            color: "#fff",
          },
        }}
        listeners={{
          tabPress: () => {
            pressProfileHandler();
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  focusIcon: {
    backgroundColor: "#fff1fc",
    // backgroundColor: "#0c131b",
    width: DEVICE_WIDTH / 7,
    height: DEVICE_HEIGHT / 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: DEVICE_WIDTH / 20,
  },
});
