import * as SecureStore from "expo-secure-store";

export const saveKey = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log("Storage Value: " + value);
  } catch (error) {
    console.log("🔴 Secure Storage Error: " + error.message);
  }
};

export const loadToken = async (key) => {
  try {
    await SecureStore.getItemAsync(key);
    console.log(
      "Storage fetch Value: " + (await SecureStore.getItemAsync(key))
    );
  } catch (error) {
    console.log("🔴 Secure Storage Error: " + error.message);
  }
};
