import { combineReducers } from "redux";

import StoreSuggestionsReducer from "./reducers/storeSuggestionsReducer";
import StoreTempNomadReducer from "./reducers/storeTempNomadReducer";

import interestsStore from "./interests/interestsReducer";
import guestStore from "./guest/guestReducer";
import tokensStore from "./jwtTokens/tokensReducer";
import nomadStore from "./nomad/nomadReducer";
import memoriesStore from "./memories/memoriesReducer";
import feedStore from "./feed/feedReducer";

const rootReducer = combineReducers({
  tempNomadStore: StoreTempNomadReducer,
  suggestionsStore: StoreSuggestionsReducer,

  interestsStore,
  guestStore,
  tokensStore,
  nomadStore,
  memoriesStore,
  feedStore,
});

export default rootReducer;
