import {
  GET_INTERESTS_REQUEST,
  GET_INTERESTS_SUCCESS,
  GET_INTERESTS_FAILURE,
} from "../actionTypes";

const initialState = {
  loading: true,
  data: [],
  error: "",
};

const storeInterestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERESTS:
      return {
        ...state,
        interests: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default storeInterestsReducer;
