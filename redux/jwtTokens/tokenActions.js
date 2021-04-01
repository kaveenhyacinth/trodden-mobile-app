import { STORE_TOKEN } from "./tokenTypes";

export const storeTokens = (signToken, refToken) => ({
  type: STORE_TOKEN,
  payload: { signToken, refToken },
});
