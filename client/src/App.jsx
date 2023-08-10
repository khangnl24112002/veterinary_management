import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import useToken from "./hooks/useToken";
import Homepage from "./pages/Homepage";

const App = () => {
  const { token, setToken, removeToken } = useToken();
  if (!token) {
    // truyen function setToken cho component con
    // de khi dang nhap thanh cong thi se setToken
    return <Login setToken={setToken} />;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage removeToken={removeToken} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
