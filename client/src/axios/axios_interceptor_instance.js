import axios from "axios";
import { API_URL } from "../api/server_api";

function getLocalAccessToken() {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  return refreshToken;
}

function refreshToken() {
  return instance.post("/accounts/refresh-token", {
    refreshToken: "Bearer " + getLocalRefreshToken(),
    account: JSON.parse(localStorage.getItem("account")),
  });
}

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      const bearerToken = "Bearer " + token;
      config.headers.Authorization = bearerToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      // Token het han khong the vao duoc (401: dang nhap that bai do ko co token hoac token khong dung)
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          // Goi refresh-token
          const rs = await refreshToken();
          const { accessToken } = rs.data;
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          instance.defaults.headers.common["x-access-token"] = accessToken;

          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }
      // 403:
      if (err.response.status === 403 && err.response.data.err == 1) {
        // Dang xuat nguoi dung o day
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("account");
        // Điều hướng người dùng đến trang đăng nhập
        console.log("refresh token has expired!");
        // window.location.replace("/");
        return Promise.reject(err.response.data);
      }
      if (err.response.status === 403 && err.response.data.err == 2) {
        window.location.replace("/unauthorized");
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
