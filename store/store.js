import { configureStore } from "@reduxjs/toolkit";
import signInSlice from "../redux/SignIn/signInSlice";
import signUpSlice from "../redux/SignIn/signUpSlice";
import userForgotPasswordSlice from "../redux/User/userForgotPasswordSlice";
import userInformationSlice from "../redux/User/userInformationSlice";
import toolsSlice from "../redux/Tools/toolsSlice";
import userAddingFoodSlice from "../redux/User/userAddingFoodSlice";
import userGettingFoodSlice from "../redux/User/userGettingFoodSlice";
import userAddingActivitySlice from "../redux/User/userAddingActivitySlice";
import userGettingActivitySlice from "../redux/User/userGettingActivitySlice";
import userCalorieHistorySlice from "../redux/User/userCalorieHistorySlice";

export const store = configureStore({
  reducer: {
    signIn: signInSlice,
    signUp: signUpSlice,
    userForgotPassword: userForgotPasswordSlice,
    userInformation: userInformationSlice,
    tools: toolsSlice,
    userAddingFood: userAddingFoodSlice,
    userGettingFood: userGettingFoodSlice,
    userAddingActivity: userAddingActivitySlice,
    userGettingActivity: userGettingActivitySlice,
    userCalorieHistory: userCalorieHistorySlice,
  },
});
