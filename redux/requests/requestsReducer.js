import * as TYPE from "./requestTypes";

const initialState = {
  loading: false,
  incoming: {
    data: [],
    error: "",
  },
  outgoing: {
    data: [],
    error: "",
  },
};

const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.FETCH_R_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPE.FETCH_RI_SUCCESS:
      return {
        ...state,
        loading: false,
        incoming: {
          ...state.incoming,
          data: action.payload,
          error: "",
        },
      };
    case TYPE.FETCH_RI_FAILURE:
      return {
        ...state,
        loading: false,
        incoming: {
          data: [],
          error: action.payload,
        },
      };
    case TYPE.FETCH_RO_SUCCESS:
      return {
        ...state,
        loading: false,
        outgoing: {
          ...state.incoming,
          data: action.payload,
          error: "",
        },
      };
    case TYPE.FETCH_RO_FAILURE:
      return {
        ...state,
        loading: false,
        outgoing: {
          data: [],
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default requestsReducer;
