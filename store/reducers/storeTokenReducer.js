import { loadToken } from "../../services/deviceStorage";
import { STORE_TOKEN } from "../actionTypes";

// const token = loadToken("id_token");

const initialState = {
  signToken: "",
  refToken: "",
};

const storeTokenReducer = (state = initialState, action) => {
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

export default storeTokenReducer;
