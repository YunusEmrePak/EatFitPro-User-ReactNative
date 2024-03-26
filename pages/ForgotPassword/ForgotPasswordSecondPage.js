import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignUpSecondForm from "../../components/Forms/SignUpForm/SignUpSecondForm";
import Logo from "../../components/Logo/Logo";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";
import { Provider } from "react-native-paper";
import { signUpActions } from "../../redux/SignIn/signUpSlice";
import { useDispatch } from "react-redux";
import ForgotPasswordFirstForm from "../../components/Forms/ForgotPasswordForm/ForgotPasswordFirstForm";
import ForgotPasswordSecondForm from "../../components/Forms/ForgotPasswordForm/ForgotPasswordSecondForm";

export default function ForgotPasswordSecondPage({ navigation }) {
  const dispatch = useDispatch();

  const navigateSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <ForgotPasswordSecondForm navigation={navigation} />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
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
    width: DEVICE_WIDTH / 1.55,
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
