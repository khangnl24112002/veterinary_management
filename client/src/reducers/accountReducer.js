import { DELETE_ACCOUNT, FETCH_ALL_ACCOUNTS } from "../actions/actionTypes";

const initialState = {
  accounts: [],
};

// Tao reducer de quan ly trang thai cua User
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ACCOUNTS: {
      return {
        ...state,
        accounts: action.payload,
      };
    }
    case DELETE_ACCOUNT: {
      const newAccountList = state.accounts.filter(
        (account) => account.id !== action.payload
      );
      return {
        ...state,
        accounts: newAccountList,
      };
    }
    default:
      return state;
  }
};

export default accountReducer;
