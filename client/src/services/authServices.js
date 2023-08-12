import axiosInstance from "../axios/axiosInstance";

const getRefreshAccessToken = async (account, refreshToken) => {
  try {
    const response = await axiosInstance.post("/accounts/refresh-token", {
      account,
      refreshToken,
    });

    // Lưu trữ lại access token mới và trả về nó
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    // Xử lý lỗi nếu không thể lấy access token mới
    console.log(error);
  }
};
export default getRefreshAccessToken;
