import { GET_INTERESTS } from "../actionTypes";

const initialState = {
  interests: [],
  loading: true,
};

const storeUserReducer = (state = initialState, action) => {
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

export default storeUserReducer;
