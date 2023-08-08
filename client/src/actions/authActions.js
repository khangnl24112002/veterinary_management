// tao cac action creator de thuc hien dang nhap va dang xuat
import axios from "axios";
import { LOGIN_API } from "../api/login_api";

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(LOGIN_API, {
      username: username,
      password: password,
    });
    // Neu dang nhap thanh cong thi se dispatch len reducer voi payload la thong tin tai khoan
    if (response.status === 200) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
    }
  } catch (error) {
    // Neu bi loi khong login duoc thi se thong bao loi ra man hinh
    console.log("Login error:", error.response.data);
    if (error.response.data.err === 1) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Invalid credentials",
      });
    }
    // Sau do dispatch len tren reducer
  }
};

export const logout = () => ({
  type: "LOGOUT",
});
