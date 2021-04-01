import * as TYPE from "./tribeTypes";

const initialState = {
  loading: false,
  nomads: {
    data: [],
    error: "",
  },
  caravans: {
    data: [],
    error: "",
  },
  blazes: {
    data: [],
    error: "",
  },
};

//TODO: Caravans and blazes

const tribeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.FETCH_T_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPE.FETCH_TN_SUCCESS:
      return {
        ...state,
        loading: false,
        nomads: {
          ...state.nomads,
          data: action.payload,
          error: "",
        },
      };
    case TYPE.FETCH_TN_FAILURE:
      return {
        ...state,
        loading: false,
        nomads: {
          ...state.nomads,
          data: [],
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default tribeReducer;
