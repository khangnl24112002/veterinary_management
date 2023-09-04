/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccountById } from "../../services/account.services";
import { updateAdminInfo } from "../../services/admin.services";
import { updateCustomerInfo } from "../../services/customer.services";
import { useForm } from "react-hook-form";
const ViewAccountDetail = () => {
  const { id } = useParams();
  const [account, setAccount] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    email: "",
    avatar: "",
    role: "",
  });
  // Su dung react-hook-form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // luu trang thai error
  const [error, setIsError] = useState("");

  // luu trang thai edit
  const [editing, setEditing] = useState(false);

  // goi API lay account info
  useEffect(() => {
    const getInfo = async () => {
      const res = await getAccountById(id);
      if (res.success === true) {
        const accountInfo = res.data.accountInfo;
        setAccount(accountInfo);
      } else {
        setIsError("Cannot get data!");
      }
    };
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reset({ ...account });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const handleEdit = () => {
    setEditing(!editing);
  };

  const onSubmit = async (data) => {
    data.avatar = data.avatar[0];
    let response;
    if (account.role === 1) {
      response = await updateAdminInfo(id, data);
    } else {
      response = await updateCustomerInfo(id, data);
    }
    if (response.success === false) {
      setIsError(response.message);
    } else {
      setIsError("Update successfully");
    }
  };

  return (
    <div>
      {editing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-semibold mb-4">Edit Account Detail</h2>
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
              className="text-blue-500 hover:underline"
              onClick={() => {
                handleEdit();
                setIsError("");
              }}
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
              value={account.name}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Phone Number:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={account.phoneNumber}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Address:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={account.address}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Email:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={account.email}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Avatar:</label>
            <img
              src={account.avatar}
              style={{ width: "200px", height: "200px" }}
              alt={account.avatar}
            />
          </div>
          {/* Bottom Buttons */}
          <div className="col-span-2 flex flex-col items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-4"
              onClick={handleEdit}
            >
              Change Account Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAccountDetail;
