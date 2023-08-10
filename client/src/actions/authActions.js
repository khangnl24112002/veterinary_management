/* eslint-disable no-unused-vars */
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const loginUser = (username, password) => async (dispatch) => {
  // const response = await axios.post("https://reqres.in/api/login", {
  //   email: "eve.holt@reqres.in",
  //   password: "cityslicka",
  // });
  const t = 0; // gia su response gui ve la thanh cong
  if (t === 1) {
    // Gia su day la du lieu sau khi da nhan duoc tu server
    const responseData = {
      username: "abc",
      id: 1,
      role: "admin",
      accessToken: "abc",
      refreshToken: "xyz",
    };
    // Lay thong tin user
    const user = {
      username: responseData.username,
      id: responseData.id,
      role: responseData.role,
    };
    // Dispatch du lieu len server
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
    // tra ve token
    return {
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
    };
  } else {
    // Neu dang nhap khong thanh cong
    const error = "Tai khoan hoac mat khau khong dung";
    return {
      error,
    };
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
