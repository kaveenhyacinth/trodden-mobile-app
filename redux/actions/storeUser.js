import { STORE_USER } from "../actionTypes";

export const storeUser = (userData) => ({
  type: STORE_USER,
  payload: userData,
});
