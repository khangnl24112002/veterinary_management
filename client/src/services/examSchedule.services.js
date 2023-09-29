import axiosInstance from "../axios/axios_interceptor_instance";

export const getAllExamSchedules = async () => {
  return await axiosInstance
    .get("/examSchedules")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const updateExamSchedules = async (examId, confirm) => {
  return await axiosInstance
    .put(`/examSchedules/${examId}`, { isOk: confirm })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const deleteExamSchedules = async (examId) => {
  return await axiosInstance
    .delete(`/examSchedules/${examId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
