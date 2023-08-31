import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/AuthPage/Login";
import NotFound from "./pages/ErrorPage/NotFound";
import useToken from "./hooks/useToken";
import Homepage from "./pages/AuthPage/Homepage";
import Profile from "./pages/UserPage/Profile";
import Settings from "./pages/UserPage/Settings";
import ManageDrugs from "./pages/ManageDrugs/ManageDrugs";
import ManageImports from "./pages/ManageImports/ManageImports";
import ManageExports from "./pages/ManageExports/ManageExports";
import ManageSchedules from "./pages/ManageSchedules/ManageSchedules";
import ManageAccounts from "./pages/ManageAccounts/ManageAccounts";
import ViewAccounts from "./pages/ManageAccounts/ViewAccounts";
import AddNewDrug from "./pages/ManageDrugs/AddNewDrug";
import AddNewAccount from "./pages/ManageAccounts/AddNewAccount";
import ViewAccountDetail from "./pages/ManageAccounts/ViewAccountDetail";

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
            <Route path=":id" element={<ViewAccountDetail />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
