import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HistoryList from "../../components/ProfileItems/History/HistoryList";
import HistoryFilter from "../../components/ProfileItems/History/HistoryFilter";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/constants";

export default function ProfileHistory() {
  return (
    <SafeAreaView
      style={{ alignItems: "center", justifyContent: "flex-start" }}
    >
      <HistoryFilter />
      <HistoryList />
    </SafeAreaView>
  );
}
