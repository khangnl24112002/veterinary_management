import { Outlet } from "react-router-dom";

const ManageImports = () => {
  return (
    <div className="m-5">
      <h1 className="mt-0 pl-5">Manage Imports</h1>
      <Outlet />
    </div>
  );
};

export default ManageImports;
