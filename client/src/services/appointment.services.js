import axiosInstance from "../axios/axios_interceptor_instance";

export const getAllAppointments = async () => {
  return await axiosInstance
    .get("/appointments")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getAppointmentByCustomerId = async (customerId) => {
  return await axiosInstance
    .get(`/appointments/${customerId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const addNewAppointment = async (appointment) => {
  return await axiosInstance
    .post(`/appointments`, appointment)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const deleteAppointment = async (id) => {
  return await axiosInstance
    .delete(`/appointments/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
