import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import accountReducer from "./accountReducer";
import drugReducer from "./drugReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  account: accountReducer,
  drug: drugReducer,
});

export default rootReducer;
