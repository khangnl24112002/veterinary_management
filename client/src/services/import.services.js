import axiosInstance from "../axios/axios_interceptor_instance";

export const getAllImports = async () => {
  return await axiosInstance
    .get("/imports")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getImportDetail = async (id) => {
  return await axiosInstance
    .get(`/imports/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const addNewImport = async (importReport) => {
  return await axiosInstance
    .post(`/imports`, importReport, {
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

export const deleteImport = async (id) => {
  return await axiosInstance
    .delete(`/imports/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
