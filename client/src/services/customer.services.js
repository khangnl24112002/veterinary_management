import axiosInstance from "../axios/axios_interceptor_instance";

export const addNewCustomer = async (customerInfo) => {
  try {
    const response = await axiosInstance.post(`/customers`, customerInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
