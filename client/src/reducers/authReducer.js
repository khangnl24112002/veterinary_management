const initialState = {
  isLoggedIn: false,
  user: null,
};

// Tao reducer de quan ly trang thai dang nhap
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Neu action la dang nhap thanh cong
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    // neu action la dang xuat
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
