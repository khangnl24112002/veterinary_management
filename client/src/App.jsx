import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import useToken from "./hooks/useToken";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ManageDrugs from "./pages/ManageDrugs";
import ManageImports from "./pages/ManageImports";
import ManageExports from "./pages/ManageExports";
import ManageSchedules from "./pages/ManageSchedules";
import ManageAccounts from "./pages/ManageAccounts/ManageAccounts";
import ViewAccounts from "./pages/ManageAccounts/ViewAccounts";
import AddNewDrug from "./pages/AddNewDrug";
import AddNewAccount from "./pages/ManageAccounts/AddNewAccount";

const App = () => {
  const { tokens, setTokens, removeTokens } = useToken();
  if (!tokens || (!tokens.accessToken && !tokens.refreshToken)) {
    // truyen function setToken cho component con
    // de khi dang nhap thanh cong thi se setToken
    return <Login setTokens={setTokens} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage removeTokens={removeTokens} />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="manage_drugs" element={<ManageDrugs />}>
            <Route path="add_new_drugs" element={<AddNewDrug />} />
          </Route>
          <Route path="manage_imports" element={<ManageImports />} />
          <Route path="manage_exports" element={<ManageExports />} />
          <Route path="manage_schedules" element={<ManageSchedules />} />
          <Route path="manage_accounts" element={<ManageAccounts />}>
            <Route path="" element={<ViewAccounts />} />
            <Route path="addNewAccount" element={<AddNewAccount />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
