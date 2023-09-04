import {
  UPDATE_USER,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_INFO,
} from "../actions/actionTypes";

const initialState = {
  account: {},
  accountInfo: {},
};

// Tao reducer de quan ly trang thai cua User
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER: {
      return {
        ...state,
        account: action.payload.account,
        accountInfo: action.payload.accountInfo,
      };
    }
    case UPDATE_ACCOUNT: {
      return {
        ...state,
        account: action.payload,
      };
    }
    case UPDATE_ACCOUNT_INFO: {
      return {
        ...state,
        accountInfo: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
