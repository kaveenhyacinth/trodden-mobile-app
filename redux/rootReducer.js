import { combineReducers } from "redux";

import StoreSuggestionsReducer from "./reducers/storeSuggestionsReducer";
import StoreTempNomadReducer from "./reducers/storeTempNomadReducer";
import StoreFeedReducer from "./reducers/storeFeedReducer";

import interestsStore from "./interests/interestsReducer";
import guestStore from "./guest/guestReducer";
import tokensStore from "./jwtTokens/tokensReducer";
import nomadStore from "./nomad/nomadReducer";
import memoriesStore from "./memories/memoriesReducer";

const rootReducer = combineReducers({
  feedStore: StoreFeedReducer,
  tempNomadStore: StoreTempNomadReducer,
  suggestionsStore: StoreSuggestionsReducer,

  interestsStore,
  guestStore,
  tokensStore,
  nomadStore,
  memoriesStore,
});

export default rootReducer;
