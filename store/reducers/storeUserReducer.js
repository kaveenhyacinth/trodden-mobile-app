import { STORE_USER } from "../actionTypes";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  contact: "",
  country: "",
  region: "",
  birthday: "",
  gender: "",
};

const storeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default storeUserReducer;
