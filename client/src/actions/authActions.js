// tao cac action creator de thuc hien dang nhap va dang xuat
import axios from "axios";

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.get("https://reqres.in/api/users?page=2", {
      username,
      password,
    });
    const user = response.data;
    console.log(user.data);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: user,
    });
  } catch (error) {
    console.log("Login error:", error);
  }
};

export const logout = () => ({
  type: "LOGOUT",
});
