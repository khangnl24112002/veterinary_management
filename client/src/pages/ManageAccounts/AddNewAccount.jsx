import { useState } from "react";
import { Link } from "react-router-dom";
import { addNewAdmin } from "../../services/admin.services";
import { addNewAccount } from "../../services/account.services";
import { addNewCustomer } from "../../services/customer.services";
import { useForm } from "react-hook-form";
const AddNewAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (userInfo) => {
    const createAccountResponse = await addNewAccount({
      username: userInfo.username,
      password: userInfo.password,
      role: userInfo.role === "admin" ? 1 : 2,
    });
    if (createAccountResponse.success === false) {
      setError("Error:" + createAccountResponse.message);
    } else {
      const accountId = createAccountResponse.data.id;
      let response;
      const info = {
        name: userInfo.name,
        address: userInfo.address,
        phoneNumber: userInfo.phoneNumber,
        email: userInfo.email,
        avatar: userInfo.avatar[0],
        accountId: accountId,
      };
      if (userInfo.role === "admin") {
        // call Admin API
        response = await addNewAdmin(info);
      } else {
        response = await addNewCustomer(info);
      }
      if (response.success === true) {
        setError("Create account successfully!");
      } else {
        setError("Error: " + response.message);
      }
    }
  };
  return (
    <div className="container mx-auto px-6 py-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-8"
      >
        {/* Left Section: Account Setup */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Account Setup</h2>
          <div className="mb-3">
            <label className="block font-medium mb-1">Username:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              {...register("username", { required: "Username is required" })}
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
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Role:</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
          </div>
        </div>
        {/* Right Section: User Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
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
        </div>
        {/* Bottom Buttons */}
        <div className="col-span-2 flex flex-col items-center">
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-4"
          >
            Create Account
          </button>
          <Link to="../" className="text-blue-500 hover:underline">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddNewAccount;
