import { useSelector } from "react-redux";
import { getToken } from "../utils/getToken";
import IntroductionPage from "../pages/IntroductionPage/IntroductionPage";

const RootPathRedirect = ({ navigation }) => {
  const token = useSelector((state) => state.signIn.token) || getToken();

  if (token) {
    navigation.navigate("Profile");
  }
  else {
    navigation.navigate("Introduction");
  }

  return <IntroductionPage />;
};

export default RootPathRedirect;
