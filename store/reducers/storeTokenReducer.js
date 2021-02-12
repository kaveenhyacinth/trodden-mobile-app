import { loadToken } from "../../services/deviceStorage";
import { STORE_TOKEN } from "../actions/storeToken";

// const token = loadToken("id_token");

const initialState = {
  idToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBlNzk1MTdlZTE2MTFlNDRjZjkxYjIiLCJpYXQiOjE2MTMwMDQ3OTd9.OSbhW_m9BX5SLxKm87VHakES9U6RDxoXS8SBsw9GkJY",
  // idToken: token,
};

const storeTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TOKEN:
      return { ...state, idToken: action.value };
    default:
      return state;
  }
};

export default storeTokenReducer;
