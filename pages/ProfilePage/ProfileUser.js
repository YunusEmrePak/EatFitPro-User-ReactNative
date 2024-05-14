import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { signInActions } from "../../redux/SignIn/signInSlice";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../../components/Common/Header";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import UserName from "../../components/ProfileItems/User/UserName";
import UserInformation from "../../components/ProfileItems/User/UserInformation";
import { useEffect } from "react";
import UserNameModal from "../../components/ProfileItems/User/UserNameModal";
import Blur from "../../components/Common/Blur";
import UserInformationModal from "../../components/ProfileItems/User/UserInformationModal";

const commonStyle = {
  iconSize: DEVICE_WIDTH / 16,
};

export default function ProfileUser({ navigation }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.signIn.token);
  const isModalVisible = useSelector((state) => state.tools.userNameModal);

  const userInformation = useSelector(
    (state) => state.userInformation.userInformation
  );

  const signOut = () => {
    dispatch(signInActions.signOut());
    navigation.navigate("Introduction");
  };

  return (
    <View>
      {/* <Header title="Profile" /> */}
      {/* {isModalVisible && <Blur />} */}
      <Header title="EatFitPro" />
      <View style={styles.safeArea}>
        <View style={styles.container}>
          <UserName
            name={token && userInformation.name}
            surname={token && userInformation.surname}
            email={token && userInformation.email}
          />
          <UserInformation
            age={token && userInformation.age}
            weight={token && userInformation.weight}
            height={token && userInformation.length}
          />
        </View>
        <View style={styles.signContainer}>
          <Pressable
            onPress={signOut}
            style={({ pressed }) => pressed && styles.pressedItem}
            android_ripple={{
              color: "#fff",
            }}
          >
            <LinearGradient
              colors={["#333", "#666"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signContainer}
            >
              <FontAwesome6
                name="person-running"
                size={commonStyle.iconSize}
                color="white"
              />
              <Text style={styles.text}>Logout</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
      <UserNameModal />
      <UserInformationModal />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    justifyContent: "space-between",
    height: DEVICE_HEIGHT,
    alignItems: "center",
    paddingHorizontal: DEVICE_WIDTH / 20,
    paddingBottom: DEVICE_HEIGHT / 5
  },
  container: {
    marginTop: DEVICE_HEIGHT / 20,
    paddingHorizontal: DEVICE_WIDTH / 10,
    height: DEVICE_HEIGHT / 1.5,
  },
  signContainer: {
    flexDirection: "row",
    width: DEVICE_WIDTH / 4,
    height: DEVICE_HEIGHT / 18,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: DEVICE_WIDTH / 35,
    overflow: "hidden",
  },
  text: {
    color: "white",
  },
  pressedItem: {
    opacity: 0.8,
  },
});
