import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Provider } from "react-native-paper";
import SignUpSecondForm from "../../components/Forms/SignUpForm/SignUpSecondForm";
import Logo from "../../components/Logo/Logo";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

export default function SignUpSecondPage({ navigation }) {
  const navigateSignIn = () => {
    navigation.navigate("SignIn");
  };
  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <SignUpSecondForm navigation={navigation} />
        <View style={styles.haveAccount}>
          <Text style={styles.haveText}>Already Have an Account?</Text>
          <Pressable onPress={navigateSignIn}>
            <Text style={styles.signInButton}>Sign In</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: DEVICE_HEIGHT + DEVICE_HEIGHT / 20,
    paddingBottom: DEVICE_HEIGHT / 5,
  },
  logo: {
    marginBottom: DEVICE_HEIGHT / 40,
  },
  signInContainer: {
    marginTop: DEVICE_HEIGHT / 20,
  },
  haveAccount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: DEVICE_WIDTH / 1.7,
  },
  haveText: {
    fontSize: DEVICE_WIDTH / 24,
  },
  signInButton: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: DEVICE_WIDTH / 24,
  },
});
