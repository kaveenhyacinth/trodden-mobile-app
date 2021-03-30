import { GET_INTERESTS, INTERESTS_ERROR } from "../actionTypes";

const initialState = {
  loading: true,
  data: [],
  error: {},
};

const storeInterestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERESTS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: {},
      };
    case INTERESTS_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default storeInterestsReducer;
