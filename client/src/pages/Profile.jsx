import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/userAction/userActions";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState(user);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();
  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    dispatch(updateUser(data));
  };

  const handleChange = (field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setSaved(false);
  };

  const handleChangeImage = (e) => {
    console.log(e.target.files);
    setData((prevData) => ({
      ...prevData,
      avatar: URL.createObjectURL(e.target.files[0]),
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4 mt-0">Profile</h1>
        <div className="space-y-4">
          {/**Image */}
          <p className="font-semibold">Avatar:</p>
          {editing ? (
            <input type="file" onChange={handleChangeImage} />
          ) : (
            <img className="w-20 h-20" src={data.avatar} alt="avatar" />
          )}
          {/**Name */}
          <p className="font-semibold">Name:</p>
          {editing ? (
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border rounded p-2 w-full"
            />
          ) : (
            <p>{data.name}</p>
          )}
          {/**Phone Number */}
          <p className="font-semibold">Phone number:</p>
          {editing ? (
            <input
              type="text"
              value={data.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="border rounded p-2 w-full"
            />
          ) : (
            <p>{data.phoneNumber}</p>
          )}
          {/**Address */}
          <p className="font-semibold">Address:</p>
          {editing ? (
            <input
              type="text"
              value={data.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="border rounded p-2 w-full"
            />
          ) : (
            <p>{data.address}</p>
          )}
          {/**Email */}
          <p className="font-semibold">Email:</p>
          {editing ? (
            <input
              type="text"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border rounded p-2 w-full"
            />
          ) : (
            <p>{data.email}</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          {editing ? (
            <button
              onClick={handleSave}
              className={`bg-green-500 text-white rounded px-4 py-2 ${
                saved ? "cursor-not-allowed opacity-50" : "hover:bg-green-600"
              }`}
              disabled={saved}
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
