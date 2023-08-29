import { useState } from "react";
import { Link } from "react-router-dom";
import { addNewAdmin } from "../../services/admin.services";
import { addNewAccount } from "../../services/account.services";
import { addNewCustomer } from "../../services/customer.services";
const AddNewAccount = () => {
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
    role: "",
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    avatar: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [error, setIsError] = useState("");
  const handleSave = async (e) => {
    e.preventDefault();
    const data = { ...formInfo };
    if (avatar) {
      data.avatar = avatar;
    }
    // call API
    try {
      // create account
      const createAccountResponse = await addNewAccount({
        username: data.username,
        password: data.password,
        role: data.role === "admin" ? 1 : 2,
      });
      if (createAccountResponse.data.success === false) {
        setIsError("Cannot Create account!");
        return;
      }
      // get ID
      const accountId = createAccountResponse.data.data.id;
      let response;
      if (data.role === "admin") {
        // call Admin API
        response = await addNewAdmin({
          name: data.name,
          address: data.address,
          phoneNumber: data.phoneNumber,
          email: data.email,
          avatar: data.avatar,
          accountId: accountId,
        });
      } else {
        response = await addNewCustomer({
          name: data.name,
          address: data.address,
          phoneNumber: data.phoneNumber,
          email: data.email,
          avatar: data.avatar,
          accountId: accountId,
        });
      }
      if (response.data.success) {
        setIsError("Create account successfully!");
      }
    } catch (error) {
      setIsError("An error has occured when creating! Please try later.");
    }
  };
  const handleChange = (field, value) => {
    setFormInfo((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };
  return (
    <div>
      <h3>Add new account</h3>
      <div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <select onChange={(e) => handleChange("role", e.target.value)}>
            <option value="admin">Admin</option>
            <option value="customer" selected>
              Customer
            </option>
          </select>
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <label>Avatar:</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>
        <button onClick={handleSave}>Create</button>
        {error && <p>{error}</p>}
        <Link to="../">Back</Link>
      </div>
    </div>
  );
};

export default AddNewAccount;
