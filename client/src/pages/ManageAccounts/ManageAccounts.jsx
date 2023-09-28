import { Outlet } from "react-router-dom";

const ManageAccounts = () => {
  const userInfo = JSON.parse(localStorage.getItem("account"));
  if (userInfo?.role === 1) {
    return (
      <div className="m-5">
        <h1 className="mt-0 mb-10 pl-5">Manage Accounts</h1>
        <Outlet />
      </div>
    );
  } else {
    window.location.replace("/unauthorized");
  }
};

export default ManageAccounts;
