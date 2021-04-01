import api from "../../api";
import {
  FETCH_NOMAD_MEMORIES_REQUEST,
  FETCH_NOMAD_MEMORIES_SUCCESS,
  FETCH_NOMAD_MEMORIES_FAILURE,
  RESET_NOMAD_MEMORIES,
} from "./memoryTypes";

const fetchMemoriesRequest = () => ({
  type: FETCH_NOMAD_MEMORIES_REQUEST,
  payload: [],
});

const fetchMemoriesSuccess = (memories) => ({
  type: FETCH_NOMAD_MEMORIES_SUCCESS,
  payload: memories,
});

const fethcMemoriesFailure = (error) => ({
  type: FETCH_NOMAD_MEMORIES_FAILURE,
  payload: error,
});

export const fetchNomadMemories = (userId) => async (dispatch) => {
  try {
    dispatch(fetchMemoriesRequest());
    const response = await api.get.getOwnMemories(userId);
    if (!response.data.result)
      throw new Error("Our servers are too busy! Please try again later...");
    const memories = response.data.result;
    dispatch(fetchMemoriesSuccess(memories));
  } catch (error) {
    console.error("Error at fetchMemories", error);
    dispatch(fethcMemoriesFailure(error.message));
  }
};

export const resetNomadMomeries = () => {
  return {
    type: RESET_NOMAD_MEMORIES,
    payload: [],
  };
};

// export const getNomadMemories = (userId) => async (dispatch) => {
//   try {
//     const response = await api.get.getNomadMemories(userId);
//     if (!response.data.result)
//       throw new Error("Our servers are too busy! Please try again later...");
//     dispatch({
//       type: GET_NOMAD_MEMORIES,
//       payload: response.data.result,
//     });
//   } catch (error) {
//     throw error;
//   }
// };
