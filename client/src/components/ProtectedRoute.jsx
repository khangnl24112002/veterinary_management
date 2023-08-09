/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, children }) {
  const user = useSelector((state) => state.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles.includes(user.role)) {
    return children;
  } else {
    return <Navigate to="/unauthorized" />;
  }
}

export default ProtectedRoute;
