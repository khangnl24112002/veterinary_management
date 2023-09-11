import { Outlet } from "react-router-dom";

const ManageDrugs = () => {
  return (
    <div className="m-5">
      <h1 className="mt-0 pl-5">Manage Drugs</h1>
      <Outlet />
    </div>
  );
};

export default ManageDrugs;
