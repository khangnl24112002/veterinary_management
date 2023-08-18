import axiosInstance from "../axios/axios_interceptor_instance";

export const getAllAccounts = async () => {
  try {
    const response = await axiosInstance.get(`/accounts`);
    return response;
  } catch (error) {
    return error;
  }
};
