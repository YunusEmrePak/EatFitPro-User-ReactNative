import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { signInActions } from "../../redux/SignIn/signInSlice";
import { useEffect } from "react";

export default function IntroductionPage({ navigation }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.signIn.token);

  const navigateSignIn = () => {
    navigation.navigate("SignIn");
  };

  const signUp = () => {
    navigation.navigate("SignUpFirst");
  };

  const signOut = () => {
    dispatch(signInActions.signOut());
  };

  useEffect(() => {
    if (token) {
      navigation.navigate("Profile");
    }
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={navigateSignIn}>
        <View style={styles.signContainer}>
          <Text style={styles.text}>Sign In</Text>
        </View>
      </Pressable>
      <Pressable onPress={signUp}>
        <View style={styles.signContainer}>
          <Text style={styles.text}>Sign Up</Text>
        </View>
      </Pressable>
      <Pressable onPress={signOut}>
        <View style={styles.signContainer}>
          <Text style={styles.text}>Sign Out</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
