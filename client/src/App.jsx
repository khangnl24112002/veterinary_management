import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../src/pages/Layout";
import Admin from "./pages/Admin";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";

const App = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user}>
                <Admin />
              </ProtectedRoute>
            }
          />
          ;
          <Route path="/customer" element={<Customer />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
