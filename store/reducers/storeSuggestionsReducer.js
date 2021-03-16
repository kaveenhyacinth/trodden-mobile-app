import { GET_NOMAD_SUGGESTIONS, GET_CARAVAN_SUGGESTIONS } from "../actionTypes";

const initialState = {
  nomads: [],
  caravans: [],
};

const storeSuggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOMAD_SUGGESTIONS:
      return {
        ...state,
        nomads: action.payload,
      };
    case GET_CARAVAN_SUGGESTIONS:
      return {
        ...state,
        caravans: action.payload,
      };
    default:
      return state;
  }
};

export default storeSuggestionsReducer;
