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
import ManageAccounts from "./pages/ManageAccounts/ManageAccounts";
import ViewAccounts from "./pages/ManageAccounts/ViewAccounts";
import AddNewAccount from "./pages/ManageAccounts/AddNewAccount";
import ViewAccountDetail from "./pages/ManageAccounts/ViewAccountDetail";
import ViewDrugDetail from "./pages/ManageDrugs/ViewDrugDetail";
import ViewDrugs from "./pages/ManageDrugs/ViewDrugs";
import AddNewDrug from "./pages/ManageDrugs/AddNewDrug";
import ViewImports from "./pages/ManageImports/ViewImports.jsx";
import ViewImportDetail from "./pages/ManageImports/ViewImportDetail";
import AddNewImport from "./pages/ManageImports/AddNewImport";
import ViewExports from "./pages/ManageExports/ViewExports.jsx";
import ViewExportDetail from "./pages/ManageExports/ViewExportDetail";
import AddNewExport from "./pages/ManageExports/AddNewExport";
import Unauthorized from "./pages/ErrorPage/Unauthorized";

// Manage appointment (customer)
import ManageAppointments from "./pages/ManageAppointmentCustomer/ManageAppointments";
import ViewAppointments from "./pages/ManageAppointmentCustomer/ViewAppointments";
import AddNewAppointment from "./pages/ManageAppointmentCustomer/AddNewAppointment";

// Manage appointment (admin)
import ManageExamSchedules from "./pages/ManageExamSchedules/ManageExamSchedules";
import ViewExamSchedules from "./pages/ManageExamSchedules/ViewExamSchedules";
import ViewExamScheduleDetail from "./pages/ManageExamSchedules/ViewExamScheduleDetail";
import AddExamHistory from "./pages/ManageExamHistories/AddExamHistory";

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
            <Route path="" element={<ViewDrugs />} />
            <Route path="addNewDrugs" element={<AddNewDrug />} />
            <Route path=":id" element={<ViewDrugDetail />} />
          </Route>
          <Route path="manage_imports" element={<ManageImports />}>
            <Route path="" element={<ViewImports />} />
            <Route path=":id" element={<ViewImportDetail />} />
            <Route path="addNewImport" element={<AddNewImport />} />
          </Route>
          <Route path="manage_exports" element={<ManageExports />}>
            <Route path="" element={<ViewExports />} />
            <Route path=":id" element={<ViewExportDetail />} />
            <Route path="addNewExport" element={<AddNewExport />} />
          </Route>
          <Route path="manage_appointments" element={<ManageAppointments />}>
            <Route path="" element={<ViewAppointments />} />
            <Route path="addNewAppointment" element={<AddNewAppointment />} />
          </Route>
          <Route path="manage_accounts" element={<ManageAccounts />}>
            <Route path="" element={<ViewAccounts />} />
            <Route path="addNewAccount" element={<AddNewAccount />} />
            <Route path=":id" element={<ViewAccountDetail />} />
          </Route>
          <Route path="manage_examSchedules" element={<ManageExamSchedules />}>
            <Route path="" element={<ViewExamSchedules />} />
            <Route path=":id" element={<ViewExamScheduleDetail />} />
            <Route path="addExamHistory" element={<AddExamHistory />} />
          </Route>
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
