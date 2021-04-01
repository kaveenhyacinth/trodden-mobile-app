import { STORE_NOMAD } from "../actionTypes";

const initialState = {
  _id: "",
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  role: "",
  contact: "",
  country: "",
  city: "",
  region: "",
  location: {},
  birthdate: "",
  gender: "",
  prof_bio: "",
  occupation: "",
  prof_img: "",
  interests: [],
  memories: [],
  trips: [],
  tribe: [],
};

const storeNomadReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_NOMAD:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default storeNomadReducer;
