import * as SecureStore from "expo-secure-store";
import ErrorAlertModal from "../components/modals/ErrorAlertModal";

export const Save = async (key, value) => {
  try {
    if (!SecureStore.isAvailableAsync)
      throw new Error("Storage is not available on this device");

    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    ErrorAlertModal("🔴 Secure Storage Saving Error: ", error);
  }
};

export const Fetch = async (key) => {
  try {
    if (!SecureStore.isAvailableAsync)
      throw new Error("Storage is not available on this device");

    const result = await SecureStore.getItemAsync(key);
    return result;
  } catch (error) {
    ErrorAlertModal("🔴 Secure Storage Fetching Error: ", error);
  }
};

export const Delete = async (key) => {
  try {
    if (!SecureStore.isAvailableAsync)
      throw new Error("Storage is not available on this device");
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    ErrorAlertModal("🔴 Secure Storage Error: ", error);
  }
};
