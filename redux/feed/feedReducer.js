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
      return {
        ...state,
        loading: true,
      };
    case FETCH_NOMAD_FEED_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case FETCH_NOMAD_FEED_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default feedReducer;
