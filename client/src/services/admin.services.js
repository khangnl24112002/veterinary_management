import axiosInstance from "../axios/axios_interceptor_instance";

export const updateAdminInfo = async (accountId, updatedData) => {
  return await axiosInstance
    .put(`/admins/${accountId}`, updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getAdminInfo = async (accountId) => {
  try {
    const response = await axiosInstance.get(`/admins/${accountId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const addNewAdmin = async (adminInfo) => {
  return await axiosInstance
    .post(`/admins`, adminInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
