import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/constants";

import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useDispatch } from "react-redux";
import boyAvatar from "../../../assets/images/ProfileImages/boyAvatar.png";
import { toolsActions } from "../../../redux/Tools/toolsSlice";
import { getUserInfo } from "../../../redux/User/userInformationSlice";

export default function UserName({ name, surname, email }) {
  const dispatch = useDispatch()

  const openModal = () => {
    dispatch(getUserInfo())
    dispatch(toolsActions.setUserNameModalVisible())
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#116391", "#26A1B0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.outBox}
      >
        <View style={styles.outBox}>
          <View style={styles.top}>
            <Image source={boyAvatar} style={styles.avatar} />
            <Pressable onPress={openModal}>
              <Feather name="edit" size={24} color="white" />
            </Pressable>
          </View>
          <View style={styles.bottom}>
            <View>
              <Text style={styles.name}>{name + " " + surname}</Text>
            </View>
            <View>
              <Text style={styles.email}>{email}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT / 5,
    marginBottom: DEVICE_HEIGHT / 15,
    marginLeft: DEVICE_WIDTH / 10,
  },
  outBox: {
    width: DEVICE_WIDTH / 1.5,
    height: DEVICE_HEIGHT / 4.5,
    borderRadius: DEVICE_WIDTH / 20,
    padding: DEVICE_WIDTH / 80,
    //
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: DEVICE_WIDTH / 20,
  },
  avatar: {
    width: DEVICE_WIDTH / 8,
    height: DEVICE_HEIGHT / 15,
    borderRadius: DEVICE_WIDTH / 2,
  },
  bottom: {
    marginTop: DEVICE_HEIGHT / 80,
  },
  name: {
    fontSize: DEVICE_WIDTH / 16,
    marginBottom: DEVICE_HEIGHT / 160,
    color: "white",
  },
  email: {
    fontSize: DEVICE_WIDTH / 24,
    color: "white",
  },
});
