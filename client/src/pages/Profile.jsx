import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/adminActions/adminActions";
import axiosInstance from "../axios/axios_interceptor_instance";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phoneNumber: user.phoneNumber,
    address: user.address,
    email: user.email,
  });
  const [avatar, setAvatar] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();

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

      // Dispatch action to update Redux store if needed
      dispatch(updateUser(updatedData));

      console.log(response.data);
      setEditing(false);
      setIsChanged(false);
    } catch (error) {
      console.error("Error uploading data:", error);
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
    </div>
  );
};

export default ProfilePage;
