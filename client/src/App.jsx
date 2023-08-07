import { Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div>
      App page
      <Outlet />
    </div>
  );
};

export default App;
