import { combineReducers } from "redux";
import StoreTokenReducer from "./storeTokenReducer";
import StoreUserReducer from "./storeUserReducer";
import StoreInterestsReducer from "./storeInterestsReducer";
import StoreNomadReducer from "./storeNomadReducer";

const rootReducer = combineReducers({
  tokenStore: StoreTokenReducer,
  userStore: StoreUserReducer,
  nomadStore: StoreNomadReducer,
  interestsStore: StoreInterestsReducer,
});

export default rootReducer;
