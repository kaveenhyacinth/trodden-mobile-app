import { Save } from "./deviceStorage";
import { storeToken } from "../store/actions/storeToken";
import Http from "../api/kit";

/**
 *
 * @param {String} refToken Refresh Token
 * @returns Promise
 */
const refreshTokens = async (refToken) => {
  try {
    const newTokens = await Http.post("/api/auth/refresh-token", {
      refreshToken: refToken,
    });
    if (!newTokens.data.success) throw new Error("Couldn't get new token");

    const newRefToken = newTokens.data.result.refToken;
    const newSignInToken = newTokens.data.result.signToken;

    Save("refToken", newRefToken);

    return { newSignInToken, newRefToken };
  } catch (error) {
    throw error;
  }
};

export default refreshTokens;
