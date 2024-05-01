import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../../constants/constants";

import { useDispatch, useSelector } from "react-redux";
import { toolsActions } from "../../../../redux/Tools/toolsSlice";

import Header from "../../../Common/Header";
// kamil.aslan548@hotmail.com

export default function PredictionModal() {
  const dispatch = useDispatch();

  const isModalVisible = useSelector((state) => state.tools.predictionModal);

  const prediction = useSelector(
    (state) => state.userCaloriePredictor.prediction
  );

  const onCloseModal = () => {
    dispatch(toolsActions.setPredictionModalVisible());
  };

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={() => onCloseModal()}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.container}
            onPress={(event) => event.stopPropagation()}
          >
            <Text style={styles.predictText}>{prediction}</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    paddingTop: DEVICE_HEIGHT / 3,
  },
  container: {
    width: DEVICE_WIDTH / 1.2,
    height: DEVICE_HEIGHT / 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: DEVICE_WIDTH / 40,
    paddingHorizontal: DEVICE_WIDTH / 40
  },
  predictText: {
    fontSize: DEVICE_WIDTH / 20,
    textAlign: "center",
    lineHeight: DEVICE_HEIGHT / 30
  },
  
});
