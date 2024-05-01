import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../../constants/constants";
import { LinearGradient } from "expo-linear-gradient";

import Predict from "../../../../assets/images/ProfileImages/predict.png";
import PredictionModal from "./PredictionModal";
import { toolsActions } from "../../../../redux/Tools/toolsSlice";
import { useDispatch } from "react-redux";
import { predictCalories } from "../../../../redux/User/userCaloriePredictorSlice";

export default function Prediction() {
    const dispatch = useDispatch();

  const openModal = () => {
    dispatch(predictCalories());
    dispatch(toolsActions.setPredictionModalVisible());
  };

  return (
    <LinearGradient
      colors={["#FF5852", "#FF8E4C"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.icon}>
        <Image source={Predict} alt="image" style={styles.image} />
      </View>
      <View style={styles.name}>
        <Text style={styles.nameText}>Calories Predictor</Text>
      </View>
      <View style={styles.predict}>
        <Pressable
          onPress={openModal}
          style={({ pressed }) => pressed && styles.pressedItem}
          android_ripple={{
            color: "#fff1fc",
          }}
        >
          <Text style={styles.predictText}>Predict</Text>
        </Pressable>
      </View>
      <PredictionModal />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF5852",
    width: DEVICE_WIDTH / 1.15,
    height: DEVICE_HEIGHT / 7,
    flexDirection: "row",
    borderRadius: DEVICE_WIDTH / 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: DEVICE_HEIGHT / 40,
  },
  icon: {
    width: "20%",
  },
  image: {
    width: DEVICE_WIDTH / 6,
    height: DEVICE_HEIGHT / 12.5,
  },
  name: {
    width: "35%",
  },
  nameText: {
    fontSize: DEVICE_WIDTH / 20,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  predict: {
    // flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    width: DEVICE_WIDTH / 4,
    height: DEVICE_HEIGHT / 22,
    backgroundColor: "#FF6952",
    borderWidth: DEVICE_WIDTH / 500,
    borderColor: "#FFD9D2",
    borderRadius: DEVICE_WIDTH / 40,
    overflow: "hidden",
  },
  predictText: {
    fontSize: DEVICE_WIDTH / 16,
    color: "white",
    textAlign: "center",
    // width: DEVICE_WIDTH / 4,
    // height: DEVICE_HEIGHT / 10,
    // marginTop: DEVICE_HEIGHT / 44,
    paddingVertical: DEVICE_HEIGHT / 170
  },
});
