import { produce } from "immer";
import {
  FETCH_NOMAD_MEMORIES_REQUEST,
  FETCH_NOMAD_MEMORIES_SUCCESS,
  FETCH_NOMAD_MEMORIES_FAILURE,
  RESET_NOMAD_MEMORIES,
} from "./memoryTypes";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const nomadMemoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOMAD_MEMORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NOMAD_MEMORIES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case FETCH_NOMAD_MEMORIES_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case RESET_NOMAD_MEMORIES:
      return {
        loading: false,
        data: [],
        error: "",
      };
    default:
      return state;
  }
};

export default nomadMemoriesReducer;
