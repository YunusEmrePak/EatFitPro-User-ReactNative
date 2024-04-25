import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Provider } from "react-native-paper";
import { useDispatch } from "react-redux";
import ForgotPasswordFirstForm from "../../components/Forms/ForgotPasswordForm/ForgotPasswordFirstForm";
import Logo from "../../components/Logo/Logo";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

export default function ForgotPasswordFirstPage({ navigation }) {
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
        <ForgotPasswordFirstForm navigation={navigation} />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT + DEVICE_HEIGHT / 20,
    paddingBottom: DEVICE_HEIGHT / 5,
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
