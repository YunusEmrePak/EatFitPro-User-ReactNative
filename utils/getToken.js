import * as SecureStore from "expo-secure-store";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = () => {
  return SecureStore.getItem("bearerToken");
  // return AsyncStorage.getItem('bearerToken');
};
