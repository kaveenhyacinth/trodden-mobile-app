import produce from "immer";
import {
  FETCH_NOMAD_FEED_REQUEST,
  FETCH_NOMAD_FEED_SUCCESS,
  FETCH_NOMAD_FEED_FAILURE,
} from "./feedTypes";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOMAD_FEED_REQUEST:
      return produce(state, (draftState) => {
        draftState.loading = true;
      });
    case FETCH_NOMAD_FEED_SUCCESS:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.data = [...action.payload];
        draftState.error = "";
      });
    case FETCH_NOMAD_FEED_FAILURE:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.data = [];
        draftState.error = action.payload;
      });
    default:
      return state;
  }
};

export default feedReducer;
