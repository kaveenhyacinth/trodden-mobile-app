import {
  GET_OWN_MEMORIES,
  GET_NOMAD_MEMORIES,
  RESET_NOMAD_MEMORIES,
} from "../actionTypes";

const initialState = {
  ownMemories: [],
  nomadMemories: [],
};

const storeMemoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OWN_MEMORIES:
      return {
        ...state,
        ownMemories: action.payload,
      };
    case GET_NOMAD_MEMORIES:
      return {
        ...state,
        nomadMemories: action.payload,
      };
    case RESET_NOMAD_MEMORIES:
      return {
        ownMemories: [],
        nomadMemories: [],
      };
    default:
      return state;
  }
};

export default storeMemoriesReducer;
