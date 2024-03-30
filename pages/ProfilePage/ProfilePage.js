import { StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import ProfileCalculator from "./ProfileCalculator";
import ProfileHistory from "./ProfileHistory";
import ProfileLeaderboard from "./ProfileLeaderboard";
import ProfilePanel from "./ProfilePanel";
import ProfileUser from "./ProfileUser";

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
    height: 55,
  },
};

export default function ProfilePage({ navigation }) {
  const dispatch = useDispatch();

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
                size={24}
                color={focused ? "#000" : "#5C5D5D"}
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: 14,
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
                size={24}
                color={focused ? "#000" : "#5C5D5D"}
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: 14,
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
                size={24}
                color={focused ? "#000" : "#5C5D5D"}
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: 14,
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
                size={24}
                color={focused ? "#000" : "#5C5D5D"}
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: 14,
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
                size={24}
                color={focused ? "#000" : "#5C5D5D"}
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: 14,
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
