import * as SecureStore from "expo-secure-store";

export const Save = async (key, value) => {
  try {
    if (!SecureStore.isAvailableAsync)
      throw new Error("Storage is not available on this device");

    await SecureStore.setItemAsync(key, value);
    // console.log("Storage Value: " + value);
  } catch (error) {
    console.log("🔴 Secure Storage Saving Error: " + error.message);
  }
};

export const Fetch = async (key) => {
  try {
    if (!SecureStore.isAvailableAsync)
      throw new Error("Storage is not available on this device");

    const result = await SecureStore.getItemAsync(key);
    // console.log("Storage fetch Value: " + result);
    return result;
  } catch (error) {
    console.log("🔴 Secure Storage Fetching Error: " + error.message);
  }
};

export const Delete = async (key) => {
  try {
    if (!SecureStore.isAvailableAsync)
      throw new Error("Storage is not available on this device");

    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("🔴 Secure Storage Error: " + error.message);
  }
};
