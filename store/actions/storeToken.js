export const STORE_TOKEN = "STORE_TOKEN";

export const storeToken = (token) => {
  return {
    type: STORE_TOKEN,
    value: token,
  };
};
