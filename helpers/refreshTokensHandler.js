import { Save, Fetch } from "./deviceStorageHandler";
import { storeToken } from "../store/actions/storeToken";
import { useDispatch } from "react-redux";
import Http from "../api/kit";

/** Refresh token
 * @param {String} refToken Refresh Token
 * @returns Promise
 */
const refreshTokens = async () => {
  const dispatch = useDispatch();
  try {
    const refToken = await Fetch("refToken");
    const newTokens = await Http.post("/api/auth/refresh-token", {
      refreshToken: refToken,
    });
    if (!newTokens.data.success) throw new Error("Couldn't get new token");

    const newRefToken = newTokens.data.result.refToken;
    const newSignInToken = newTokens.data.result.signToken;

    Save("refToken", newRefToken);
    dispatch(storeToken(newSignInToken, newRefToken));

    return { newSignInToken  };
  } catch (error) {
    throw error;
  }
};

export default refreshTokens;
