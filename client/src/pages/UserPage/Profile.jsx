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
  );
};

export default ProfilePage;
