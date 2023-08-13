const ProfilePage = () => {
  return (
    <div className=" w-[100%]">
      {/**Title Here */}
      <h1 className="mt-0">Profile Page</h1>
      <div className="flex items-center h-screen bg-gray-100">
        {/* Phần bên trái */}
        <div className="flex-none w-1/4 p-8 bg-white shadow-md">
          <img
            src="https://picsum.photos/300"
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto"
          />
        </div>

        {/* Phần bên phải */}
        <div className="flex-grow p-8 bg-white shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <p>
            <span className="font-semibold">Họ và Tên:</span> John Doe
          </p>
          <p>
            <span className="font-semibold">Tuổi:</span> 30
          </p>
          <p>
            <span className="font-semibold">Email:</span> johndoe@example.com
          </p>
          <p>
            <span className="font-semibold">Địa Chỉ:</span> 123 Main St, City
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
