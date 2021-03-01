import { STORE_USER } from "../actionTypes";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  username: "",
  email: "",
};

const storeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER:
      return {
        ...state,
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        username: action.payload.username,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default storeUserReducer;
