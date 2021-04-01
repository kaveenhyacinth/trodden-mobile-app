import { combineReducers } from "redux";

import StoreTempNomadReducer from "./reducers/storeTempNomadReducer";

import interestsStore from "./interests/interestsReducer";
import guestStore from "./guest/guestReducer";
import tokensStore from "./jwtTokens/tokensReducer";
import nomadStore from "./nomad/nomadReducer";
import memoriesStore from "./memories/memoriesReducer";
import feedStore from "./feed/feedReducer";
import suggestionsStore from "./suggestions/suggestionReducer";

const rootReducer = combineReducers({
  tempNomadStore: StoreTempNomadReducer,

  interestsStore,
  guestStore,
  tokensStore,
  nomadStore,
  memoriesStore,
  feedStore,
  suggestionsStore,
});

export default rootReducer;
