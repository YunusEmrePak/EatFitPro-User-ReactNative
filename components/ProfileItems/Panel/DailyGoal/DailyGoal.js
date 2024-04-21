import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../../constants/constants';
import ShowDailyGoal from './ShowDailyGoal';
import SetDailyGoal from './SetDailyGoal';
import ShowGoalProcess from './ShowGoalProcess';
import { Feather } from '@expo/vector-icons';

export default function DailyGoal() {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={styles.container}>
      <View>
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <TouchableOpacity onPress={flipCard} activeOpacity={1}>
            <ShowDailyGoal />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
          <SetDailyGoal />
        </Animated.View>
      </View>
      <ShowGoalProcess />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  backCard: {
    position: 'absolute',
    top: 0,
  },
  cardContainer: {
    paddingVertical: DEVICE_WIDTH / 40,
    borderRadius: DEVICE_WIDTH / 40,
    margin: DEVICE_WIDTH / 80,
    width: DEVICE_WIDTH / 2.3,
    height: DEVICE_WIDTH / 2.3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  dailyText: {
    color: 'white',
    fontSize: DEVICE_WIDTH / 25,
  },
  goalText: {
    color: 'white',
    fontSize: DEVICE_WIDTH / 25,
  },
  goalNumber: {
    color: 'white',
    fontSize: DEVICE_WIDTH / 13,
  },
  change: {
    width: DEVICE_HEIGHT / 10,
    backgroundColor: 'red',
  },
});
