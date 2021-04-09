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
      return produce(state, (draftState) => {
        draftState.loading = true;
      });
    case FETCH_NOMAD_MEMORIES_SUCCESS:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.data = [...action.payload];
        draftState.error = "";
      });
    case FETCH_NOMAD_MEMORIES_FAILURE:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.data = [];
        draftState.error = action.payload;
      });
    case RESET_NOMAD_MEMORIES:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.data = [];
        draftState.error = "";
      });
    default:
      return state;
  }
};

export default nomadMemoriesReducer;
