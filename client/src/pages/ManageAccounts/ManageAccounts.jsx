import { Outlet } from "react-router-dom";

const ManageAccounts = () => {
  return (
    <div>
      <h1 className="mt-0">Manage Accounts</h1>
      <Outlet />
    </div>
  );
};

export default ManageAccounts;
