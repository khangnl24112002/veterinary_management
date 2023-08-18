import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/userActions/userActions";
import { getAdminInfo } from "../services/admin.services";
import axiosInstance from "../axios/axios_interceptor_instance";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const account = JSON.parse(localStorage.getItem("account"));
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phoneNumber: user.phoneNumber,
    address: user.address,
    email: user.email,
    avatar: user.avatar,
  });
  const [avatar, setAvatar] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [error, setIsError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async (accountId) => {
      const response = await getAdminInfo(accountId);
      const userInfo = response.data.message;
      dispatch(updateUser(userInfo));
    };
    fetchUserData(account.id);
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    if (avatar) {
      updatedData.avatar = avatar;
    }
    try {
      const response = await axiosInstance.put("/admins", updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(updateUser(response.data.data));
      setEditing(false);
      setIsChanged(false);
    } catch (error) {
      setIsError(
        "An error has occured when saving your info! Please try after."
      );
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
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
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        ) : (
          <p>{formData.name}</p>
        )}
      </div>
      <div>
        <label>Phone Number:</label>
        {editing ? (
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        ) : (
          <p>{formData.phoneNumber}</p>
        )}
      </div>
      <div>
        <label>Address:</label>
        {editing ? (
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        ) : (
          <p>{formData.address}</p>
        )}
      </div>
      <div>
        <label>Email:</label>
        {editing ? (
          <input
            type="text"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        ) : (
          <p>{formData.email}</p>
        )}
      </div>
      <div>
        <label>Avatar:</label>
        {editing ? (
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        ) : (
          <img className="w-20 h-20" src={formData.avatar} alt="avatar" />
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

export default ProfilePage;
