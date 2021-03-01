import { STORE_TOKEN } from "../actionTypes";

export const storeToken = (signToken, refToken) => ({
  type: STORE_TOKEN,
  payload: { signToken, refToken },
});
