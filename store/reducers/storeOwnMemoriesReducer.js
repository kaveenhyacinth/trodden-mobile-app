import { GET_OWN_MEMORIES } from "../actionTypes";

const initialState = {
  memories: []
};

const storeOwnMemoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OWN_MEMORIES:
      return {
        ...state,
        memories: action.payload
      };
    default:
      return state;
  }
};

export default storeOwnMemoriesReducer;
