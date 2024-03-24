import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

export default function SignUpPage({ navigation }) {
  const navigateSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text> Sign Up Page</Text>
      <Pressable onPress={navigateSignIn}>
        <View style={styles.signInContainer}>
          <Text>Sign In</Text>
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
    marginTop: DEVICE_HEIGHT / 20,
  },
});
