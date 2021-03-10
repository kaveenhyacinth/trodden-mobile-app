import { STORE_USER } from "../actionTypes";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  role: "",
  contact: "",
  country: "",
  city: "",
  region: "",
  birthdate: "",
  gender: "",
  bio: "",
  occupation: "",
  // profileImage: "",
  // interests: [],
  ImageDataUri: "",
  ImageDataName: "",
  ImageDataType: "",
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
