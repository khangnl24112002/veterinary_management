import axiosInstance from "./axiosInstance";

const authInterceptor = () => {
  axiosInstance.interceptors.request.use(async (config) => {
    // Lay token tu localStorage
  });
};
