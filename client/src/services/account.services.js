import axiosInstance from "../axios/axios_interceptor_instance";

export const getAllAccounts = async () => {
  return await axiosInstance
    .get(`/accounts`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getAccountById = async (id) => {
  return await axiosInstance
    .get(`/accounts/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const addNewAccount = async (account) => {
  return await axiosInstance
    .post(`/accounts`, account)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const deleteAccount = async (accountId) => {
  try {
    const response = await axiosInstance.delete(`/accounts/${accountId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateAccount = async (accountId, account) => {
  return await axiosInstance
    .put(`/accounts/${accountId}`, account)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
