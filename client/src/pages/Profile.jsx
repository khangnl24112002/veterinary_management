import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const initialData = {
  name: "John Doe",
  phoneNumber: "123-456-7890",
  address: "123 Main St, City",
  email: "john.doe@example.com",
  image: "https://picsum.photos/seed/picsum/200/300",
};

const ProfilePage = () => {
  const [data, setData] = useState(initialData);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 });
  const [resultImage, setResultImage] = useState(null);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    if (resultImage) {
      setData((prevData) => ({ ...prevData, image: resultImage }));
    }
  };

  const handleChange = (field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setSaved(false);
  };

  const onFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    generateResultImage(croppedAreaPixels);
  };

  const generateResultImage = async (croppedAreaPixels) => {
    if (!image) return;
    const imageObj = new Image();
    imageObj.src = image;
    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imageObj,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    setResultImage(canvas.toDataURL("image/jpeg"));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="font-semibold">Image:</p>
              {editing ? (
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileChange(e.target.files[0])}
                    className="mt-1"
                  />
                </div>
              ) : (
                <img
                  src={
                    data.image || "https://picsum.photos/seed/picsum/300/200"
                  }
                  alt="Profile"
                  className="w-20 h-20 object-cover rounded-full"
                />
              )}
            </div>
            {editing && image && (
              <ReactCrop
                src={image}
                crop={crop}
                onChange={handleCropChange}
                onComplete={handleCropComplete}
              />
            )}
          </div>
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
