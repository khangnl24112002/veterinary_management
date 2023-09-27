import { Outlet } from "react-router-dom";

const ManageSchedules = () => {
  return (
    <div className="m-5">
      <h1 className="mt-0 mb-10 pl-5">Manage Schedule</h1>
      <Outlet />
    </div>
  );
};

export default ManageSchedules;
