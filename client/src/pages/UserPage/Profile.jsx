import Account from "./Account";
import Info from "./Info";

const ProfilePage = () => {
  return (
    <>
      <div className="container mx-auto px-6 py-2">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Section: Account Setup */}
          <Account />
          {/* Right Section: User Information */}
          <Info />
        </div>
      </div>
    </>

    // <div>
    //   <h1>Profile Page</h1>
    //   <div>
    //     <label>Name:</label>
    //     {editing ? (
    //       <input
    //         type="text"
    //         value={formData.name}
    //         onChange={(e) => handleChange("name", e.target.value)}
    //       />
    //     ) : (
    //       <p>{formData.name}</p>
    //     )}
    //   </div>
    //   <div>
    //     <label>Phone Number:</label>
    //     {editing ? (
    //       <input
    //         type="text"
    //         value={formData.phoneNumber}
    //         onChange={(e) => handleChange("phoneNumber", e.target.value)}
    //       />
    //     ) : (
    //       <p>{formData.phoneNumber}</p>
    //     )}
    //   </div>
    //   <div>
    //     <label>Address:</label>
    //     {editing ? (
    //       <input
    //         type="text"
    //         value={formData.address}
    //         onChange={(e) => handleChange("address", e.target.value)}
    //       />
    //     ) : (
    //       <p>{formData.address}</p>
    //     )}
    //   </div>
    //   <div>
    //     <label>Email:</label>
    //     {editing ? (
    //       <input
    //         type="text"
    //         value={formData.email}
    //         onChange={(e) => handleChange("email", e.target.value)}
    //       />
    //     ) : (
    //       <p>{formData.email}</p>
    //     )}
    //   </div>
    //   <div>
    //     <label>Avatar:</label>
    //     {editing ? (
    //       <input type="file" accept="image/*" onChange={handleAvatarChange} />
    //     ) : (
    //       <img className="w-20 h-20" src={formData.avatar} alt="avatar" />
    //     )}
    //   </div>
    //   {editing ? (
    //     <div>
    //       <button onClick={handleSave} disabled={!isChanged}>
    //         Save
    //       </button>
    //     </div>
    //   ) : (
    //     <div>
    //       <button onClick={handleEdit}>Edit</button>
    //     </div>
    //   )}
    //   {error && <p>Error: {error}</p>}
    // </div>
  );
};

export default ProfilePage;
