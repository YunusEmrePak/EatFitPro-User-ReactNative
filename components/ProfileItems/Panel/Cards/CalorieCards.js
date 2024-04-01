import { StyleSheet, View } from "react-native";
import { DEVICE_HEIGHT } from "../../../../constants/constants";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BalanceImage from "../../../../assets/images/ProfileImages/balance.png";
import ConsumedImage from "../../../../assets/images/ProfileImages/salad.png";
import BurnedImage from "../../../../assets/images/ProfileImages/speed.png";
import CalorieCard from "./CalorieCard";
import { getUserCalorieInfo } from "../../../../redux/User/userInformationSlice";

const BurnedColor = {
  first: "#FF5852",
  second: "#FF8E4C",
};

const ConsumedColor = {
  first: "#AB4599",
  second: "#4F043F",
};

const BalanceColor = {
  first: "#116391",
  second: "#26A1B0",
};

// kamil.aslan548@hotmail.com

export default function CalorieCards() {
  const dispatch = useDispatch();

  const userCalorieInformation = useSelector(
    (state) => state.userInformation.userCalorieInformation
  );

  const token = useSelector((state) => state.signIn.token);

  useEffect(() => {
    dispatch(getUserCalorieInfo());
  }, [token]);

  return (
    <View>
      <CalorieCard
        color={BurnedColor}
        src={BurnedImage}
        name="Burned"
        calorie={userCalorieInformation.totalBurnedCalories}
      />
      <CalorieCard
        color={ConsumedColor}
        src={ConsumedImage}
        name="Consumed"
        calorie={userCalorieInformation.totalConsumedCalories}
      />
      <CalorieCard
        color={BalanceColor}
        src={BalanceImage}
        name="Calories Balance"
        calorie={userCalorieInformation.balance}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: DEVICE_HEIGHT / 11,
  },
});
