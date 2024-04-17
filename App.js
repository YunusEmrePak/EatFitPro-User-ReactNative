import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./store/store";

import ForgotPasswordFirstPage from "./pages/ForgotPassword/ForgotPasswordFirstPage";
import ForgotPasswordSecondPage from "./pages/ForgotPassword/ForgotPasswordSecondPage";
import IntroductionPage from "./pages/IntroductionPage/IntroductionPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpFirstPage from "./pages/SignUpPage/SignUpFirstPage";
import SignUpSecondPage from "./pages/SignUpPage/SignUpSecondPage";
import SignUpVerifyPage from "./pages/SignUpPage/SignUpVerifyPage";
import FoodModal from "./components/ProfileItems/Panel/Tables/Food/FoodModal";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Introduction"
            component={IntroductionPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInPage}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="SignUpFirst"
            component={SignUpFirstPage}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="SignUpSecond"
            component={SignUpSecondPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpVerify"
            component={SignUpVerifyPage}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="ForgotPasswordFirst"
            component={ForgotPasswordFirstPage}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="ForgotPasswordSecond"
            component={ForgotPasswordSecondPage}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="ProfilePage"
            component={ProfilePage}
            options={{ headerShown: false }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
