import { UPDATE_ACCOUNT } from "../actions/actionTypes";

const initialState = {
  user: {},
};

// Tao reducer de quan ly trang thai cua User
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
