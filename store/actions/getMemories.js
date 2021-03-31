import {
  GET_OWN_MEMORIES,
  GET_NOMAD_MEMORIES,
  RESET_NOMAD_MEMORIES,
} from "../actionTypes";
import api from "../../api";

export const getOwnMemories = (userId) => async (dispatch) => {
  try {
    const response = await api.get.getOwnMemories(userId);
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

export const getNomadMemories = (userId) => async (dispatch) => {
  try {
    const response = await api.get.getNomadMemories(userId);
    if (!response.data.result)
      throw new Error("Our servers are too busy! Please try again later...");
    dispatch({
      type: GET_NOMAD_MEMORIES,
      payload: response.data.result,
    });
  } catch (error) {
    throw error;
  }
};

export const resetMomeries = () => {
  return {
    type: RESET_NOMAD_MEMORIES,
    payload: [],
  };
};
