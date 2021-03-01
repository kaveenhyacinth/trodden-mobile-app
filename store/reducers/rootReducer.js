import { combineReducers } from "redux";
import StoreTokenReducer from "./storeTokenReducer";
import StoreUserReducer from "./storeUserReducer"

const rootReducer = combineReducers({
  tokenStore: StoreTokenReducer,
  userStore: StoreUserReducer,
});

export default rootReducer;
