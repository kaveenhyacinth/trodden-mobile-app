import { combineReducers } from "redux";
import StoreTokenReducer from "./storeTokenReducer";
import StoreUserReducer from "./storeUserReducer";
import StoreInterestsReducer from "./storeInterestsReducer";
import StoreNomadReducer from "./storeNomadReducer";
import StoreMemoriesReducer from "./storeMemoriesReducer";
import StoreSuggestionsReducer from "./storeSuggestionsReducer";
import StoreTempNomadReducer from "./storeTempNomadReducer";

const rootReducer = combineReducers({
  tokenStore: StoreTokenReducer,
  userStore: StoreUserReducer,
  nomadStore: StoreNomadReducer,
  tempNomadStore: StoreTempNomadReducer,
  interestsStore: StoreInterestsReducer,
  memoriesStore: StoreMemoriesReducer,
  suggestionsStore: StoreSuggestionsReducer,
});

export default rootReducer;
