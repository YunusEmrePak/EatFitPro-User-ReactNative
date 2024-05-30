import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";
  
  import { Modal, TextInput } from "react-native-paper";
import { toolsActions } from "../../../redux/Tools/toolsSlice";
import { getUserInfo, setUpdatedInformation, userInformationActions } from "../../../redux/User/userInformationSlice";
import { useEffect } from "react";
  
  export default function UserInformationModal() {
    const dispatch = useDispatch();

    const age = useSelector(
      (state) => state.userInformation.updatedUserInformation.age
    );
    const length = useSelector(
        (state) => state.userInformation.updatedUserInformation.length
    );
    const weight = useSelector(
        (state) => state.userInformation.updatedUserInformation.weight
    );
    const isModalVisible = useSelector((state) => state.tools.userInformationModal);
  
    const updatedUserInformationStatus = useSelector(
      (state) => state.userInformation.updatedUserInformationStatus
    );

    const updatedUserInformation = useSelector(
        (state) => state.userInformation.updatedUserInformation
      );
  
    const updateInformation = () => {
      dispatch(setUpdatedInformation(updatedUserInformation));
    };
  
    useEffect(() => {
      if (updatedUserInformationStatus === "succeeded") {
        dispatch(toolsActions.setUserInformationModalVisible(false));
        dispatch(getUserInfo())
      }
    }, [updatedUserInformationStatus]);
  
    const onCloseModal = () => {
      if (updatedUserInformationStatus !== "pending") {
        dispatch(toolsActions.setUserInformationModalVisible(false));
      }
    };
  
    return (
      <Modal
        visible={isModalVisible}
        onRequestClose={() => onCloseModal()}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.container}
              onPress={(event) => event.stopPropagation()}
            >
              <View>
                <View style={styles.top}>
                  <Text style={styles.title}>Update Information</Text>
                </View>
                <View style={styles.inputs}>
                  <TextInput
                    label="Age"
                    onChangeText={(text) =>
                      dispatch(userInformationActions.setUpdatedAge(parseInt(text)))
                    }
                    mode="outlined"
                    value={age && age.toString()}
                    style={styles.textInputFilter}
                    keyboardType="numeric"
                  />
                  <TextInput
                    label="Height"
                    onChangeText={(text) =>
                      dispatch(userInformationActions.setUpdatedLength(parseInt(text)))
                    }
                    mode="outlined"
                    value={length && length.toString()}
                    style={styles.textInputFilter}
                    keyboardType="numeric"
                  />
                  <TextInput
                    label="Weight"
                    onChangeText={(text) =>
                      dispatch(userInformationActions.setUpdatedWeight(parseInt(text)))
                    }
                    mode="outlined"
                    value={weight && weight.toString()}
                    style={styles.textInputFilter}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <Pressable
                      onPress={updateInformation}
                      style={({ pressed }) => pressed && styles.pressedItem}
                      android_ripple={{
                        color: "#fff1fc",
                      }}
                    >
                      {updatedUserInformationStatus === "pending" ? (
                      <ActivityIndicator
                        color="#fff"
                        style={{
                          width: DEVICE_WIDTH / 4,
                          height: DEVICE_HEIGHT / 24,
                        }}
                      />
                    ) : (
                      <Text style={styles.buttonText}>Update</Text>
                    )}
                      {/* <Text style={styles.buttonText}>Update</Text> */}
                    </Pressable>
                  </View>
                </View>
              </View>
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
      paddingTop: DEVICE_HEIGHT / 4,
    },
    container: {
      width: DEVICE_WIDTH / 1.25,
      height: DEVICE_HEIGHT / 3,
      alignItems: "flex-start",
      backgroundColor: "white",
      paddingHorizontal: DEVICE_WIDTH / 20,
      paddingVertical: DEVICE_HEIGHT / 80,
      borderRadius: DEVICE_WIDTH / 40,
    },
    top: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: DEVICE_WIDTH / 1.45,
      marginBottom: DEVICE_HEIGHT / 80,
    },
    title: {
      fontSize: DEVICE_WIDTH / 20,
    },
    textInputFilter: {
      width: DEVICE_WIDTH / 1.43,
      height: DEVICE_HEIGHT / 20,
      fontSize: DEVICE_WIDTH / 30,
      marginBottom: DEVICE_HEIGHT / 200,
    },
    button: {
      backgroundColor: "#680770",
      width: DEVICE_WIDTH / 4,
      height: DEVICE_HEIGHT / 24,
      justifyContent: "space-evenly",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: DEVICE_WIDTH / 30,
    },
    buttonText: {
      fontSize: DEVICE_WIDTH / 25,
      textAlign: "center",
      color: "white",
      width: DEVICE_WIDTH / 4,
      height: DEVICE_HEIGHT / 24,
      marginTop: DEVICE_HEIGHT / 48,
    },
    buttonContainer: {
      alignItems: "center",
      width: DEVICE_WIDTH / 1.25,
      paddingRight: DEVICE_WIDTH / 10,
      overflow: "hidden",
    },
    pressedItem: {
      opacity: 0.8,
    },
    resetButtonText: {
      fontSize: DEVICE_WIDTH / 25,
      color: "#680770",
    },
    inputs: {
      justifyContent: "space-evenly",
      marginBottom: DEVICE_HEIGHT / 50,
    },
  });
  