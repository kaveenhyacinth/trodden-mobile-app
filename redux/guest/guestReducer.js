import { STORE_GUEST } from "./guestTypes";

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
  ImageDataUri: "",
  ImageDataName: "",
  ImageDataType: "",
};

const guestReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_GUEST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default guestReducer;
