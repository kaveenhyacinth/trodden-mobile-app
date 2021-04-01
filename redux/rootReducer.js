import { combineReducers } from "redux";

import StoreNomadReducer from "./reducers/storeNomadReducer";
import StoreMemoriesReducer from "./reducers/storeMemoriesReducer";
import StoreSuggestionsReducer from "./reducers/storeSuggestionsReducer";
import StoreTempNomadReducer from "./reducers/storeTempNomadReducer";
import StoreFeedReducer from "./reducers/storeFeedReducer";

import interestsStore from "./interests/interestsReducer";
import guestStore from "./guest/guestReducer";
import tokensStore from "./jwtTokens/tokensReducer";

const rootReducer = combineReducers({
  feedStore: StoreFeedReducer,
  nomadStore: StoreNomadReducer,
  tempNomadStore: StoreTempNomadReducer,
  memoriesStore: StoreMemoriesReducer,
  suggestionsStore: StoreSuggestionsReducer,

  interestsStore,
  guestStore,
  tokensStore,
});

export default rootReducer;
