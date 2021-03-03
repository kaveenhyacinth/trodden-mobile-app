import { combineReducers } from "redux";
import StoreTokenReducer from "./storeTokenReducer";
import StoreUserReducer from "./storeUserReducer";
import StoreInterestsReducer from "./storeInterestsReducer";

const rootReducer = combineReducers({
  tokenStore: StoreTokenReducer,
  userStore: StoreUserReducer,
  interestsStore: StoreInterestsReducer,
});

export default rootReducer;
