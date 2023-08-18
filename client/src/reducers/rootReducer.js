import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import accountReducer from "./accountReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  account: accountReducer,
});

export default rootReducer;
