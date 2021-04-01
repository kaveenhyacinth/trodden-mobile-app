import { STORE_NOMAD } from "../actionTypes";
import api from "../../api";

export const getNomads = (userId) => async (dispatch) => {
  try {
    const response = await api.get.getCurrentUser(userId);
    if (!response.data.result)
      throw new Error("Our servers are too busy! Please try again later...");
    dispatch({
      type: STORE_NOMAD,
      payload: response.data.result,
    });
  } catch (error) {
    throw error;
  }
};
