import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAdminInfo } from "../../services/admin.services";
import axiosInstance from "../../axios/axios_interceptor_instance";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/userActions/userActions";

const Account = () => {
  // useState luu trang thai da edit hay chua
  const [editing, setEditing] = useState(false);

  // Su dung react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Su dung useDispatch
  const dispatch = useDispatch();

  // luu trang thai error
  const [error, setIsError] = useState("");

  // Chinh sua button edit
  const handleEdit = () => {
    setEditing(true);
  };

  // Khi submit du lieu len server
  const onSubmit = async (account) => {
    console.log(account);
    const updatedData = { ...formData };
    try {
      const response = await axiosInstance.put(
        `/admins/${formData.id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(updateUser(response.data.data));
      setEditing(false);
    } catch (error) {
      setIsError(
        "An error has occured when saving your info! Please try after."
      );
    }
  };

  // Lay du lieu account hien tai tu localStorage
  const account = JSON.parse(localStorage.getItem("account"));

  // Luu tru du lieu account cua nguoi dung
  const [formData, setFormData] = useState({});
  // Lay du lieu nguoi dung tu server
  useEffect(() => {
    const fetchUserData = async (accountId) => {
      const response = await getAdminInfo(accountId);
      const userInfo = response.data.message;
      setFormData({
        name: userInfo.name,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
        email: userInfo.email,
        avatar: userInfo.avatar,
        id: userInfo.id,
        accountId: userInfo.accountId,
      });
    };
    fetchUserData(account.id);
  }, [account.id]);
  return (
    <div>
      {editing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-semibold mb-4">Change Account</h2>
          <div className="mb-3">
            <label className="block font-medium mb-1">Username:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Password:</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Confirm password:</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          {/**Bottom buttons */}
          <div className="col-span-2 flex flex-col items-center mt-48">
            <p className="text-red-500">{error}</p>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-4"
            >
              Save
            </button>
            <Link to="../" className="text-blue-500 hover:underline">
              Back
            </Link>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your account</h2>
          <div className="mb-3">
            <label className="block font-medium mb-1">Username:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={formData.username}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Role:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={formData.role}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Created At:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={formData.createdAt}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Last time updated:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={formData.updatedAt}
            />
          </div>
          {/**Bottom buttons */}
          <div className="col-span-2 flex flex-col items-center mt-48">
            <p className="text-red-500">{error}</p>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-4"
              onClick={handleEdit}
            >
              Change password
            </button>
            <Link to="../" className="text-blue-500 hover:underline">
              Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
