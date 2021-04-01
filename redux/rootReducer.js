import { combineReducers } from "redux";

import StoreNomadReducer from "./nomad/nomadReducer";
import StoreMemoriesReducer from "./reducers/storeMemoriesReducer";
import StoreSuggestionsReducer from "./reducers/storeSuggestionsReducer";
import StoreTempNomadReducer from "./reducers/storeTempNomadReducer";
import StoreFeedReducer from "./reducers/storeFeedReducer";

import interestsStore from "./interests/interestsReducer";
import guestStore from "./guest/guestReducer";
import tokensStore from "./jwtTokens/tokensReducer";
import nomadStore from "./nomad/nomadReducer";

const rootReducer = combineReducers({
  feedStore: StoreFeedReducer,
  tempNomadStore: StoreTempNomadReducer,
  memoriesStore: StoreMemoriesReducer,
  suggestionsStore: StoreSuggestionsReducer,

  interestsStore,
  guestStore,
  tokensStore,
  nomadStore,
});

export default rootReducer;
