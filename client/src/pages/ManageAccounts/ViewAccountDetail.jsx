/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccountById } from "../../services/account.services";
import axiosInstance from "../../axios/axios_interceptor_instance";

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
  const [avatar, setAvatar] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [error, setIsError] = useState("");
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    const getInfo = async () => {
      const res = await getAccountById(id);
      const accountInfo = res.data.data.accountInfo;
      accountInfo["role"] = res.data.data.account.role;
      setAccount(accountInfo);
    };
    getInfo();
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedData = { ...account };
    if (avatar) {
      updatedData.avatar = avatar;
    }
    try {
      let response;
      if (account.role === 1) {
        response = await axiosInstance.put(`/admins/${id}`, updatedData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axiosInstance.put(`/customers/${id}`, updatedData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      if (response.data.success === false) {
        setIsError(response.data.message);
      } else {
        setIsError("Update successfully");
      }
      setEditing(false);
      setIsChanged(false);
    } catch (error) {
      setIsError(
        "An error has occured when saving your info! Please try after."
      );
    }
  };

  const handleChange = (field, value) => {
    setAccount((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setIsChanged(true);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
    setIsChanged(true);
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <label>Name:</label>
        {editing ? (
          <input
            type="text"
            value={account.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        ) : (
          <p>{account.name}</p>
        )}
      </div>
      <div>
        <label>Phone Number:</label>
        {editing ? (
          <input
            type="text"
            value={account.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        ) : (
          <p>{account.phoneNumber}</p>
        )}
      </div>
      <div>
        <label>Address:</label>
        {editing ? (
          <input
            type="text"
            value={account.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        ) : (
          <p>{account.address}</p>
        )}
      </div>
      <div>
        <label>Email:</label>
        {editing ? (
          <input
            type="text"
            value={account.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        ) : (
          <p>{account.email}</p>
        )}
      </div>
      <div>
        <label>Avatar:</label>
        {editing ? (
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        ) : (
          <img className="w-20 h-20" src={account.avatar} alt="avatar" />
        )}
      </div>
      {editing ? (
        <div>
          <button onClick={handleSave} disabled={!isChanged}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ViewAccountDetail;
