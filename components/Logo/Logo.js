import { Image, View } from "react-native";

import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../../constants/constants";

import LogoImage from "../../assets/images/Logos/Logo.png"

export default function Logo() {
    return <View>
        <Image source={LogoImage} alt="Logo" style={{
            width: DEVICE_WIDTH / 3,
            height: DEVICE_WIDTH / 3
        }}/>
    </View>
}