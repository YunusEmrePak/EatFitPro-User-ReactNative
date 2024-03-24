import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { signInActions } from "../../redux/SignIn/signInSlice";

export default function IntroductionPage({ navigation }) {
  const dispatch = useDispatch();

  const navigateSignIn = () => {
    navigation.navigate("SignIn");
  };

  const signOut = () => {
    dispatch(signInActions.signOut());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={navigateSignIn}>
        <View style={styles.signInContainer}>
          <Text>Sign In</Text>
        </View>
      </Pressable>
      <Pressable onPress={signOut}>
        <View
          style={styles.signUpContainer}
        >
          <Text>Sign Out</Text>
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
  signInContainer: {
    marginBottom: DEVICE_HEIGHT / 20,
  },
});
