import axiosInstance from "../axios/axios_interceptor_instance";

export const getAllDrugs = async () => {
  return await axiosInstance
    .get("/drugs")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getAllCategories = async () => {
  return await axiosInstance
    .get("/drugs/categories")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const addNewDrugs = async (drug) => {
  return await axiosInstance
    .post(`/drugs`, drug, {
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

export const updateDrug = async (id, updatedData) => {
  return await axiosInstance
    .put(`/drugs/${id}`, updatedData, {
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

export const deleteDrug = async (id) => {
  return await axiosInstance
    .delete(`/drugs/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
