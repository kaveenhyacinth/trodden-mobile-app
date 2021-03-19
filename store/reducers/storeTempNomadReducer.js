import { STORE_TEMP_NOMAD } from "../actionTypes";

initialState = {
  nomadId: "",
};

const storeTempNomadReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TEMP_NOMAD:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default storeTempNomadReducer;
