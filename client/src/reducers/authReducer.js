import { LOGIN_SUCCESS, LOGOUT } from "../actions/authActions";

const initialState = {
  user: null,
};

// Tao reducer de quan ly trang thai dang nhap
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
