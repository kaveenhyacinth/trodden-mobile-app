import { combineReducers } from "redux";
import StoreTokenReducer from "./storeTokenReducer";
import StoreUserReducer from "./storeUserReducer";
import StoreInterestsReducer from "./storeInterestsReducer";
import StoreNomadReducer from "./storeNomadReducer";
import StoreOwnMemoriesReducer from "./storeOwnMemoriesReducer";
import StoreSuggestionsReducer from "./storeSuggestionsReducer";

const rootReducer = combineReducers({
  tokenStore: StoreTokenReducer,
  userStore: StoreUserReducer,
  nomadStore: StoreNomadReducer,
  interestsStore: StoreInterestsReducer,
  ownMemoriesStore: StoreOwnMemoriesReducer,
  suggestionsStore: StoreSuggestionsReducer,
});

export default rootReducer;
