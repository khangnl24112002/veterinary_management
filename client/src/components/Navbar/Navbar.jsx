import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white w-1/6 h-screen p-4">
      <h2 className="text-xl mb-4">Sidebar</h2>
      <ul>
        <li className="mb-2">
          <Link to="/manage_drugs">Manage Drugs</Link>
        </li>
        <li className="mb-2">
          <Link to="/manage_imports">Manage Imports</Link>
        </li>
        <li className="mb-2">
          <Link to="/manage_exports">Manage Exports</Link>
        </li>
        <li className="mb-2">
          <Link to="/manage_schedules">Manage Schedules</Link>
        </li>
        <li className="mb-2">
          <Link to="/manage_accounts">Manage Accounts</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
