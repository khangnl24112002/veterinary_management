import { Outlet } from "react-router-dom";

const ManageAccounts = () => {
  return (
    <div className="m-5">
      <h1 className="mt-0 mb-10 pl-5">Manage Accounts</h1>
      <Outlet />
    </div>
  );
};

export default ManageAccounts;
