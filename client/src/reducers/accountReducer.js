import { FETCH_ALL_ACCOUNTS } from "../actions/actionTypes";

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
    default:
      return state;
  }
};

export default accountReducer;
