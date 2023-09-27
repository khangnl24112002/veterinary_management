import axiosInstance from "../axios/axios_interceptor_instance";

export const getAllExports = async () => {
  return await axiosInstance
    .get("/exports")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getExportDetail = async (id) => {
  return await axiosInstance
    .get(`/exports/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const addNewExport = async (exportReport) => {
  return await axiosInstance
    .post(`/exports`, exportReport)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const deleteExport = async (id) => {
  return await axiosInstance
    .delete(`/exports/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
