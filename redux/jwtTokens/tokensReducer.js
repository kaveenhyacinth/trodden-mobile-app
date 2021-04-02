import { STORE_TOKEN } from "./tokenTypes";

const initialState = {
  signToken: "",
  refToken: "",
};

const tokensReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TOKEN:
      return {
        ...state,
        signToken: action.payload.signToken,
        refToken: action.payload.refToken,
      };
    default:
      return state;
  }
};

export default tokensReducer;
