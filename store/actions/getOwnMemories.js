import { GET_OWN_MEMORIES } from "../actionTypes";
import api from "../../api/api";

export const getOwnMemories = (userId) => async (dispatch) => {
  try {
    const response = await api.getOwnMemories(userId);
    if (!response.data.result)
      throw new Error("Our servers are too busy! Please try again later...");
    dispatch({
      type: GET_OWN_MEMORIES,
      payload: response.data.result,
    });
  } catch (error) {
    throw error;
  }
};
