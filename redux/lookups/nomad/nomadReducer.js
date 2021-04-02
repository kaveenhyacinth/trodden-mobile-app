import {
  FETCH_LN_REQUEST,
  FETCH_LN_SUCCESS,
  FETCH_LN_FAILURE,
  RESET_LN,
} from "../lookupTypes";

const initialState = {
  loading: false,
  data: {
    user: {
      memories: [],
      trips: [],
      tribe: [],
    },
    memories: [],
  },
  error: "",
};

const lookupNomadReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          user: action.payload.user,
          memories: action.payload.memories,
        },
        error: "",
      };
    case FETCH_LN_FAILURE:
      return {
        ...state,
        loading: false,
        data: {
          user: {},
          memories: [],
        },
        error: action.payload.error,
      };
    case RESET_LN:
      return initialState;
    default:
      return state;
  }
};

export default lookupNomadReducer;
