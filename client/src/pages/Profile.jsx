import { useState } from "react";

const ProfilePage = () => {
  const initialProfile = {
    name: "John Doe",
    phoneNumber: "0988233222",
    email: "johndoe@example.com",
    address: "123 Main St, City",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    // Simulate saving changes
    // In a real scenario, you would perform API requests or data updates here
    setIsSuccess(true);
  };

  return (
    <div className="w-[100%]">
      <h1 className="mt-0 text-3xl font-semibold">Profile Page</h1>
      <div className="flex items-center h-screen bg-gray-100">
        <div className="flex-none w-1/4 p-8 bg-white shadow-md">
          <img
            src="https://picsum.photos/300"
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto"
          />
        </div>
        <div className="flex-grow p-8 bg-white shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <form className="space-y-4">
            {/**Name */}
            <div className="flex items-center">
              <span className="font-semibold w-1/4">Name:</span>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-3/4 p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="w-3/4">{profile.name}</p>
              )}
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-1/4">Phone Number:</span>
              {editing ? (
                <input
                  type="number"
                  name="age"
                  value={profile.phoneNumber}
                  onChange={handleInputChange}
                  className="w-3/4 p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="w-3/4">{profile.phoneNumber}</p>
              )}
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-1/4">Email:</span>
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-3/4 p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="w-3/4">{profile.email}</p>
              )}
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-1/4">Address:</span>
              {editing ? (
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  className="w-3/4 p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="w-3/4">{profile.address}</p>
              )}
            </div>
            {editing ? (
              <div className="flex space-x-4">
                <button
                  className="flex-grow bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                {isSuccess && (
                  <p className="flex-none text-green-600 self-center">
                    Update successfully!
                  </p>
                )}
              </div>
            ) : (
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
