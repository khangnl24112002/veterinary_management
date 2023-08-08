const initialState = {
  isAuthenticated: false,
  user: null,
  errorMessage: "",
};

// Tao reducer de quan ly trang thai dang nhap
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Neu action la dang nhap thanh cong
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: "",
      };
    // Neu action la login that bai
    case "LOGIN_FAILURE":
      return {
        ...state,
        errorMessage: action.payload,
      };
    // neu action la dang xuat
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
