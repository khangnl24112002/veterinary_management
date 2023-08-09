import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../src/pages/Layout";
import Admin from "./pages/Admin";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin", "customer"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          ;
          <Route path="/customer" element={<Customer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
