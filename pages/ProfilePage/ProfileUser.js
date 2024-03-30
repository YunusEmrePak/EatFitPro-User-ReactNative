import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { signInActions } from "../../redux/SignIn/signInSlice";
import * as SecureStore from "expo-secure-store";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

export default function ProfileUser({ navigation }) {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signInActions.signOut());
    navigation.navigate("Introduction");
  };

  return (
    <SafeAreaView>
      <Text>User Profile</Text>
      <Pressable onPress={signOut}>
        <View style={styles.signContainer}>
          <Text style={styles.text}>Sign Out</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signContainer: {
    marginBottom: DEVICE_HEIGHT / 20,
    backgroundColor: "red",
    width: DEVICE_WIDTH / 5,
    height: DEVICE_HEIGHT / 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
