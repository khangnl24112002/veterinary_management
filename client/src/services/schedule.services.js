import axiosInstance from "../axios/axios_interceptor_instance";

export const getAllSchedules = async () => {
  return await axiosInstance
    .get("/schedules")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getScheduleByCustomerId = async (customerId) => {
  return await axiosInstance
    .get(`/schedules/${customerId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const addNewSchedule = async (schedule) => {
  return await axiosInstance
    .post(`/schedules`, schedule)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const deleteSchedule = async (id) => {
  return await axiosInstance
    .delete(`/schedules/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
