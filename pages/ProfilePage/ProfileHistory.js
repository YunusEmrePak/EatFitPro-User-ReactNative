import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HistoryList from "../../components/ProfileItems/History/HistoryList";

export default function ProfileHistory() {
  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <HistoryList />
    </SafeAreaView>
  );
}
