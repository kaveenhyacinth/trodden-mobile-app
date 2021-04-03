import {
  FETCH_NOMAD_PROFILE_REQUEST,
  FETCH_NOMAD_PROFILE_SUCCESS,
  FETCH_NOMAD_PROFILE_FAILURE,
} from "./nomadTypes";

const initialState = {
  loading: false,
  data: {
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
  },
  error: "",
};

const nomadReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOMAD_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NOMAD_PROFILE_SUCCESS:
      return {
        loading: false,
        data: {
          ...state.data,
          ...action.payload,
        },
        error: "",
      };
    case FETCH_NOMAD_PROFILE_FAILURE:
      return {
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default nomadReducer;
