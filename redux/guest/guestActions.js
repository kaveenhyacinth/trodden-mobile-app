import { STORE_GUEST } from "./guestTypes";

export const storeGuest = (guest) => {
  return {
    type: STORE_GUEST,
    payload: guest,
  };
};
