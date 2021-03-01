import { STORE_USER } from "../actionTypes";

export const storeUser = (userData) => ({
  type: STORE_USER,
  payload: {
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email: userData.email,
  },
});
