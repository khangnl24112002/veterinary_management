import axiosInstance from "../axios/axios_interceptor_instance";

const updateAdminInfo = async (updatedData) => {
  try {
    console.log(updatedData);
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

export default updateAdminInfo;
