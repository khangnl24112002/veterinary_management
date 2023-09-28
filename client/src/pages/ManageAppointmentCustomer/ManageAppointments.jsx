import { Outlet } from "react-router-dom";

const ManageAppointments = () => {
  const userInfo = JSON.parse(localStorage.getItem("account"));
  if (userInfo?.role === 2) {
    return (
      <div className="m-5">
        <h1 className="mt-0 mb-10 pl-5">Manage Appointments</h1>
        <Outlet />
      </div>
    );
  } else {
    window.location.replace("/unauthorized");
  }
};

export default ManageAppointments;
