import { StyleSheet, BackHandler, ToastAndroid } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

import ProfileCalculator from "./ProfileCalculator";
import ProfileHistory from "./ProfileHistory";
import ProfileLeaderboard from "./ProfileLeaderboard";
import ProfilePanel from "./ProfilePanel";
import ProfileUser from "./ProfileUser";
import { useEffect, useRef } from "react";

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
    height: DEVICE_HEIGHT / 15,
  },
};

const commonStyle = {
  tabBarSize: DEVICE_WIDTH / 30,
  focusedColor: "#000",
  unFocusedColor: "#5C5D5D",
  iconSize: DEVICE_WIDTH / 16,
};

export default function ProfilePage({ navigation }) {
  const dispatch = useDispatch();

  const backPressCount = useRef(0);

  useEffect(() => {
    const backAction = () => {
      if (backPressCount.current === 1) {
        BackHandler.exitApp();
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
              <MaterialIcons
                name="leaderboard"
                size={commonStyle.iconSize}
                color={
                  focused
                    ? commonStyle.focusedColor
                    : commonStyle.unFocusedColor
                }
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: commonStyle.tabBarSize,
          },
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={ProfileCalculator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={"calculator"}
                size={commonStyle.iconSize}
                color={
                  focused
                    ? commonStyle.focusedColor
                    : commonStyle.unFocusedColor
                }
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: commonStyle.tabBarSize,
          },
        }}
      />

      <Tab.Screen
        name="Panel"
        component={ProfilePanel}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={"home"}
                size={commonStyle.iconSize}
                color={
                  focused
                    ? commonStyle.focusedColor
                    : commonStyle.unFocusedColor
                }
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: commonStyle.tabBarSize,
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={ProfileHistory}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="clipboard-text"
                size={commonStyle.iconSize}
                color={
                  focused
                    ? commonStyle.focusedColor
                    : commonStyle.unFocusedColor
                }
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: commonStyle.tabBarSize,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileUser}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="person"
                size={commonStyle.iconSize}
                color={
                  focused
                    ? commonStyle.focusedColor
                    : commonStyle.unFocusedColor
                }
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: commonStyle.tabBarSize,
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
