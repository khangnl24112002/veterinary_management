import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Admin = () => {
  const user = useSelector((state) => state.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <h1>Welcome to Admin Page</h1>
    </div>
  );
};

export default Admin;
