import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../../constants/constants';

export default function ShowDailyGoal({ onPress }) {
  const helo = () => {
    console.log('hel');
    onPress(); // Trigger flip animation when the button is pressed
  };

  return (
    <LinearGradient
      colors={['#56ab2f', '#a8e063']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      <View style={styles.icons}>
        <Feather name="target" size={36} color="white" />
      </View>
      <View style={styles.daily}>
        <Text style={styles.dailyText}>Daily Goal</Text>
      </View>
      <View style={styles.goal}>
        <Text style={styles.goalText}>
          <Text style={styles.goalNumber}>200</Text> cal
        </Text>
      </View>
      <Pressable onPress={helo} style={styles.change}>
        <Text>Hello</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
