import axiosInstance from "../../axios/axiosInstance";
import { LOGIN_SUCCESS, LOGOUT } from "../actionTypes";
/* eslint-disable no-unused-vars */

export const loginUser = (username, password) => async (dispatch) => {
  // const response = await axios.post("https://reqres.in/api/login", {
  //   email: "eve.holt@reqres.in",
  //   password: "cityslicka",
  // });
  try {
    const response = await axiosInstance.post("/accounts/login", {
      username,
      password,
    });
    const t = 1; // gia su response gui ve la thanh cong
    if (response.status === 200) {
      const responseData = response.data;
      // Lay thong tin user
      const user = {
        username: responseData.data.username,
        id: responseData.data.accountId,
        role: responseData.data.role,
      };
      // Dispatch du lieu len server
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
      // Luu thong tin user vao localStorage
      localStorage.setItem("account", JSON.stringify(user));
      // tra ve token
      return {
        accessToken: responseData.accessToken,
        refreshToken: responseData.refreshToken,
      };
    }
  } catch (error) {
    if (error?.response) {
      return {
        error: error.response.data.message,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
