import axiosInstance from "../axios/axios_interceptor_instance";

export const getAllAccounts = async () => {
  try {
    const response = await axiosInstance.get(`/accounts`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAccountById = async (id) => {
  try {
    const response = await axiosInstance.get(`/accounts/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const addNewAccount = async (account) => {
  try {
    const response = await axiosInstance.post(`/accounts`, account);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteAccount = async (accountId) => {
  try {
    const response = await axiosInstance.delete(`/accounts/${accountId}`);
    return response;
  } catch (error) {
    return error;
  }
};
