export const STORE_TOKEN = "STORE_TOKEN";

export const storeToken = (signToken) => {
  return { type: STORE_TOKEN, payload: { signToken } };
};
