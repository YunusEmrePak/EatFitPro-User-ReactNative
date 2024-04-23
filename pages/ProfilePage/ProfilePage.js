import { StyleSheet, BackHandler, ToastAndroid, View } from "react-native";

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
    // backgroundColor: "#1A1038",
    backgroundColor: "#1A1038",
    paddingBottom: DEVICE_HEIGHT / 200,
    paddingTop: DEVICE_HEIGHT / 250,
  },
};

const commonStyle = {
  tabBarSize: DEVICE_WIDTH / 30,
  focusedColor: "#690770",
  // focusedColor: "#3F3C99",
  unFocusedColor: "#fff",
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
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1038",
    alignItems: "center",
    justifyContent: "center",
  },
  focusIcon: {
    backgroundColor: "#fff1fc",
    // backgroundColor: "#0c131b",
    width: DEVICE_WIDTH / 7,
    height: DEVICE_HEIGHT / 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: DEVICE_WIDTH / 20
  },
});
