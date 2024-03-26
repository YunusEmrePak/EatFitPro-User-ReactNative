import * as SecureStore from "expo-secure-store";

export const getToken = () => {
  return SecureStore.getItem("bearerToken");
};
