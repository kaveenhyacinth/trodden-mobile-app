import { GET_INTERESTS } from "../actionTypes";

const initialState = []

const storeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERESTS:
      return [
        ...state,
        ...action.payload,
      ];
    default:
      return state;
  }
};

export default storeUserReducer;
