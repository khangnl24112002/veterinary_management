import axiosInstance from "../axios/axios_interceptor_instance";

export const addNewCustomer = async (customerInfo) => {
  return await axiosInstance
    .post(`/customers`, customerInfo, {
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

export const updateCustomerInfo = async (accountId, updatedData) => {
  return await axiosInstance
    .put(`/customers/${accountId}`, updatedData, {
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
