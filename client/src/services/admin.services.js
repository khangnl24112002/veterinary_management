import axiosInstance from "../axios/axios_interceptor_instance";

export const updateAdminInfo = async (updatedData) => {
  try {
    const response = await axiosInstance.put("/admins", updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
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
  try {
    const response = await axiosInstance.post(`/admins`, adminInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
