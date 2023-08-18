import axiosInstance from "../axios/axios_interceptor_instance";

const updateAdminInfo = async (admin) => {
  // const { name, phoneNumber, address, email, avatar } = admin;
  // // // Tao formData de gui thong tin
  // const formData = new FormData();
  // formData.append("name", name);
  // formData.append("phoneNumber", phoneNumber);
  // formData.append("address", address);
  // formData.append("email", email);
  // formData.append("avatar", avatar);
  // try {
  //   const response = await axiosInstance.put("/admins", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  //   console.log(response.data);
  //   return response.data;
  // } catch (error) {
  //   console.log(error);
  //   return error;
  // }
  const formData = new FormData();
  formData.append("username", "Khang ne");
  formData.append("avatar", admin.avatar);
  try {
    const response = await axiosInstance.put("/admins", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

export default updateAdminInfo;
