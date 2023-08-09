import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const loginUser = (username, password) => async (dispatch) => {
  const response = await axios.post("https://reqres.in/api/login", {
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });
  console.log(response);
  // Lat nua thay the lai user
  const user = {
    username,
    password,
    role: "admin",
  };
  dispatch({
    type: LOGIN_SUCCESS,
    payload: user,
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
