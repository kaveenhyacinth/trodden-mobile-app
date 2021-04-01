import * as TYPE from "./suggestionTypes";

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
};

const suggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.FETCH_SUGGESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPE.FETCH_NOMAD_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        nomads: {
          ...state.nomads,
          data: action.payload,
          error: "",
        },
      };
    case TYPE.FETCH_NOMAD_SUGGESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        nomads: {
          ...state.nomads,
          data: [],
          error: action.payload,
        },
      };
    case TYPE.FETCH_CARAVAN_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        caravans: {
          ...state.caravans,
          data: action.payload,
          error: "",
        },
      };
    case TYPE.FETCH_CARAVAN_SUGGESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        caravans: {
          ...state.caravans,
          data: [],
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default suggestionsReducer;
