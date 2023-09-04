/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateAdminInfo } from "../../services/admin.services";
import { updateCustomerInfo } from "../../services/customer.services";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountInfo } from "../../actions/userActions/userActions";
const Info = () => {
  // Lay id cua account
  const account = JSON.parse(localStorage.getItem("account"));

  // useState luu trang thai da edit hay chua
  const [editing, setEditing] = useState(false);

  // chinh sua button edit
  const handleEdit = () => {
    setEditing(!editing);
  };

  // Su dung react-hook-form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // luu trang thai error
  const [error, setIsError] = useState("");

  // Goi dispatch
  const dispatch = useDispatch();

  // Khi submit du lieu len server de thay doi Info
  const onSubmit = async (acc) => {
    acc.avatar = acc.avatar[0];
    // Goi API
    let response;
    // truong hop la admin
    if (account.role === 1) {
      response = await updateAdminInfo(account.id, acc);
    } else {
      response = await updateCustomerInfo(account.id, acc);
    }
    if (response.success) {
      setIsError("Update successfully!");
      dispatch(updateAccountInfo(response.data));
    } else {
      setIsError(response.message);
    }
  };

  // Luu tru du lieu account cua nguoi dung
  // const [formData, setFormData] = useState({});
  const formData = useSelector((state) => state.user.accountInfo);
  useEffect(() => {
    reset({ ...formData });
  }, [formData]);
  // useEffect(() => {
  //   const fetchUserData = async (accountId) => {
  //     const response = await getAccountById(accountId);
  //     const accountInfo = response.data.accountInfo;
  //     setFormData(accountInfo);
  //     reset({ ...accountInfo });
  //   };
  //   fetchUserData(account.id);
  // }, [account.id]);

  return (
    <div>
      {editing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <button
              type="button"
              onClick={() => {
                handleEdit();
                setIsError("");
              }}
              className="text-blue-500 hover:underline"
            >
              Back
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <div className="mb-3">
            <label className="block font-medium mb-1">Name:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={formData.name}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Phone Number:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={formData.phoneNumber}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Address:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={formData.address}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Email:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={formData.email}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Avatar:</label>
            <img
              src={formData.avatar}
              style={{ width: "200px", height: "200px" }}
              alt={formData.avatar}
            />
          </div>
          {/* Bottom Buttons */}
          <div className="col-span-2 flex flex-col items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-4"
              onClick={handleEdit}
            >
              Change Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
