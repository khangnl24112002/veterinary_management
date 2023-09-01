import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/userActions/userActions";
import { getAdminInfo } from "../../services/admin.services";
import axiosInstance from "../../axios/axios_interceptor_instance";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const ProfilePage = () => {
  const account = JSON.parse(localStorage.getItem("account"));
  const [editing, setEditing] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [error, setIsError] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const handleEdit = () => {
    setEditing(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    if (avatar) {
      updatedData.avatar = avatar;
    }
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
      setIsChanged(false);
    } catch (error) {
      setIsError(
        "An error has occured when saving your info! Please try after."
      );
    }
  };

  return (
    <>
      <div className="container mx-auto px-6 py-2">
        <div
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-8"
        >
          {/* Left Section: Account Setup */}
          <form>
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
              <label className="block font-medium mb-1">
                Confirm password:
              </label>
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
          {/* Right Section: User Information */}
          <form>
            <h2 className="text-2xl font-semibold mb-4">
              Change User Information
            </h2>
            <div className="mb-3">
              <label className="block font-medium mb-1">Name:</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Phone Number:</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Address:</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Email:</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Avatar:</label>
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded px-3 py-2"
                {...register("avatar", { required: "Avatar is required" })}
              />
              {errors.avatar && (
                <p className="text-red-500">{errors.avatar.message}</p>
              )}
            </div>
            {/* Bottom Buttons */}
            <div className="col-span-2 flex flex-col items-center">
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
        </div>
      </div>
    </>

    // <div>
    //   <h1>Profile Page</h1>
    //   <div>
    //     <label>Name:</label>
    //     {editing ? (
    //       <input
    //         type="text"
    //         value={formData.name}
    //         onChange={(e) => handleChange("name", e.target.value)}
    //       />
    //     ) : (
    //       <p>{formData.name}</p>
    //     )}
    //   </div>
    //   <div>
    //     <label>Phone Number:</label>
    //     {editing ? (
    //       <input
    //         type="text"
    //         value={formData.phoneNumber}
    //         onChange={(e) => handleChange("phoneNumber", e.target.value)}
    //       />
    //     ) : (
    //       <p>{formData.phoneNumber}</p>
    //     )}
    //   </div>
    //   <div>
    //     <label>Address:</label>
    //     {editing ? (
    //       <input
    //         type="text"
    //         value={formData.address}
    //         onChange={(e) => handleChange("address", e.target.value)}
    //       />
    //     ) : (
    //       <p>{formData.address}</p>
    //     )}
    //   </div>
    //   <div>
    //     <label>Email:</label>
    //     {editing ? (
    //       <input
    //         type="text"
    //         value={formData.email}
    //         onChange={(e) => handleChange("email", e.target.value)}
    //       />
    //     ) : (
    //       <p>{formData.email}</p>
    //     )}
    //   </div>
    //   <div>
    //     <label>Avatar:</label>
    //     {editing ? (
    //       <input type="file" accept="image/*" onChange={handleAvatarChange} />
    //     ) : (
    //       <img className="w-20 h-20" src={formData.avatar} alt="avatar" />
    //     )}
    //   </div>
    //   {editing ? (
    //     <div>
    //       <button onClick={handleSave} disabled={!isChanged}>
    //         Save
    //       </button>
    //     </div>
    //   ) : (
    //     <div>
    //       <button onClick={handleEdit}>Edit</button>
    //     </div>
    //   )}
    //   {error && <p>Error: {error}</p>}
    // </div>
  );
};

export default ProfilePage;
