import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignUpSecondForm from "../../components/Forms/SignUpForm/SignUpSecondForm";
import Logo from "../../components/Logo/Logo";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { Provider } from "react-native-paper";

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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
