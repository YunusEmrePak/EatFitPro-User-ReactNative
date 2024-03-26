import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

import IntroductionPage from "./pages/IntroductionPage/IntroductionPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpFirstPage from "./pages/SignUpPage/SignUpFirstPage";
import SignUpSecondPage from "./pages/SignUpPage/SignUpSecondPage";

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
            name="Profile"
            component={ProfilePage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
