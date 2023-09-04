import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateAccount } from "../../services/account.services";
import { useSelector } from "react-redux";

const Account = () => {
  // useState luu trang thai da edit hay chua
  const [editing, setEditing] = useState(false);

  // Chinh sua button edit
  const handleEdit = () => {
    setEditing(!editing);
  };

  // Su dung react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // luu trang thai error
  const [error, setIsError] = useState("");

  // Khi submit du lieu len server de thay doi account
  const onSubmit = async (account) => {
    // check Password
    if (account.password !== account.confirmPassword) {
      setIsError("Password and Confirm password not match!");
      return;
    } else {
      const response = await updateAccount(formData.id, account);
      if (response.success === true) {
        setIsError("Update successfully!");
      } else {
        setIsError(response.message);
      }
    }
  };

  // Lay du lieu account hien tai tu localStorage
  // const account = JSON.parse(localStorage.getItem("account"));

  // Su dung useSelector de lay du lieu tu redux
  const formData = useSelector((state) => state.user.account);
  // Lay du lieu nguoi dung tu server
  // useEffect(() => {
  //   const fetchUserData = async (accountId) => {
  //     const response = await getAccountById(accountId);
  //     setFormData(response.data.account);
  //   };
  //   fetchUserData(account.id);
  // }, [account.id]);

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
              disabled
              value={formData.username}
            />
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
          <div className="col-span-2 flex flex-col items-center">
            <p className="text-red-500">{error}</p>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-4"
              onClick={handleEdit}
            >
              Change password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
