import { GET_NOMAD_SUGGESTIONS, GET_CARAVAN_SUGGESTIONS } from "../actionTypes";
import api from "../../api";

export const nomadSuggestions = (userId) => async (dispatch) => {
  try {
    const response = await api.get.getNomadSuggestions(userId);
    if (!response.data.result)
      throw new Error("Our servers are too busy! Please try again later...");
    dispatch({
      type: GET_NOMAD_SUGGESTIONS,
      payload: response.data.result,
    });
  } catch (error) {
    throw error;
  }
};

export const caravanSuggestions = (userId) => async (dispatch) => {
  try {
    const response = await api.get.getCaravanSuggestions(userId);
    if (!response.data.result)
      throw new Error("Our servers are too busy! Please try again later...");
    dispatch({
      type: GET_CARAVAN_SUGGESTIONS,
      payload: response.data.result,
    });
  } catch (error) {
    throw error;
  }
};
