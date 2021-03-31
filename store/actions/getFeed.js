import { GET_FEED } from "../actionTypes";
import api from "../../api";

export const getFeed = (userId) => async (dispatch) => {
  try {
    const response = await api.get.getFeed(userId);
    if (!response.data.result)
      throw new Error("Our servers are too busy! Please try again later...");
    dispatch({
      type: GET_FEED,
      payload: response.data.result,
    });
  } catch (error) {
    throw error;
  }
};
