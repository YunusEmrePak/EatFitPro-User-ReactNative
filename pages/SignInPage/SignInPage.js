import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

export default function SignInPage({ navigation }) {
  const navigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text> Sign In Page</Text>
      <Pressable onPress={navigateSignUp}>
        <View style={styles.signUpContainer}>
          <Text>Sign Up</Text>
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
  signUpContainer: {
    marginTop: DEVICE_HEIGHT / 20,
  },
});
