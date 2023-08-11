import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import useToken from "./hooks/useToken";
import Homepage from "./pages/Homepage";

const App = () => {
  const { tokens, setTokens, removeTokens } = useToken();
  if (!tokens || (!tokens.accessToken && !tokens.refreshToken)) {
    // truyen function setToken cho component con
    // de khi dang nhap thanh cong thi se setToken
    return <Login setTokens={setTokens} />;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage removeTokens={removeTokens} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
