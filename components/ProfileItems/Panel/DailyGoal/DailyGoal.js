import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  pointerEvents,
  Text,
} from "react-native";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../../constants/constants";
import ShowDailyGoal from "./ShowDailyGoal";
import SetDailyGoal from "./SetDailyGoal";
import ShowGoalProcess from "./ShowGoalProcess";
import { Feather } from "@expo/vector-icons";
import {
  getGoalUserCalorieInfo,
  getGoalUserInfo,
  getUserGoal,
  userAddGoalActions,
} from "../../../../redux/User/userAddGoalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCalorieInfo,
  getUserInfo,
} from "../../../../redux/User/userInformationSlice";
import { Octicons } from "@expo/vector-icons";

export default function DailyGoal() {
  const dispatch = useDispatch();
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const setGoal = useSelector((state) => state.userAddGoal.setGoal);
  const userInformation = useSelector(
    (state) => state.userAddGoal.userInformation
  );
  const dailyGoal = useSelector((state) => state.userAddGoal.dailyGoal);
  const calorieBalance = useSelector(
    (state) => state.userAddGoal.calorieBalance
  );

  const token = useSelector((state) => state.signIn.token);

  const refresh = useSelector((state) => state.userAddGoal.refresh);

  useEffect(() => {
    if (token && refresh) {
      dispatch(userAddGoalActions.setRefresh());
      dispatch(getUserGoal());
      dispatch(getGoalUserInfo());
      dispatch(getGoalUserCalorieInfo());
    } else {
      dispatch(getGoalUserInfo());
      dispatch(getGoalUserCalorieInfo());
    }
  }, [dispatch, dailyGoal, calorieBalance, refresh, token]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    dispatch(userAddGoalActions.setGoal(""));
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <View style={styles.cards}>
          <TouchableWithoutFeedback onPress={flipCard}>
            <Animated.View
              style={[
                styles.card,
                frontAnimatedStyle,
                isFlipped ? styles.backfaceDisabled : {},
              ]}
            >
              <ShowDailyGoal />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={flipCard}>
            <Animated.View
              style={[
                styles.card,
                styles.backCard,
                backAnimatedStyle,
                !isFlipped ? styles.backfaceDisabled : {},
              ]}
            >
              <SetDailyGoal onPress={flipCard} />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
        <ShowGoalProcess />
      </View>
      <View style={styles.info}>
        <Octicons name="info" size={24} color="purple" />
        <Text style={styles.infoText}>
          {dailyGoal >= 0
            ? calorieBalance >= dailyGoal
              ? "Congratulations! You have reached your daily calorie goal."
              : "You need to consume a few more calories to reach your goal."
            : calorieBalance <= dailyGoal
            ? "Congratulations! You have reached your daily calorie goal."
            : "You need to burn a few more calories to reach your goal."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cards: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  backCard: {
    position: "absolute",
    top: 0,
  },
  backfaceDisabled: {
    pointerEvents: "none",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: DEVICE_WIDTH / 1.08,
    marginTop: DEVICE_HEIGHT / 80,
    paddingHorizontal: DEVICE_WIDTH / 80
  },
  infoText: {
    marginLeft: DEVICE_WIDTH / 80,
    fontSize: DEVICE_WIDTH / 28
  },
});
