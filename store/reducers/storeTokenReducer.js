import { loadToken } from "../../services/deviceStorage";
import { STORE_TOKEN } from "../actions/storeToken";

// const token = loadToken("id_token");

const initialState = {
  signToken: "",
  // idToken: token,
};

const storeTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TOKEN:
      return { ...state, signToken: action.payload.signToken };
    default:
      return state;
  }
};

export default storeTokenReducer;
