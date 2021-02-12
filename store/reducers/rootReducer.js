import { combineReducers } from "redux";
import StoreTokenReducer from "./storeTokenReducer";

const rootReducer = combineReducers({
  storeToken: StoreTokenReducer,
});

export default rootReducer;
