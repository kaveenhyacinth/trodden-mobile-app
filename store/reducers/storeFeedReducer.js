import { GET_FEED } from "../actionTypes";

const initialState = [];

const storeFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED:
      return action.payload;
    default:
      return state;
  }
};

export default storeFeedReducer;
