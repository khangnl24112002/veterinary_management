import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [verticalActive, setVerticalActive] = useState("tab1");

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };
  return (
    <div className="flex items-start">
      <TETabs vertical>
        <TETabsItem
          onClick={() => handleVerticalClick("tab1")}
          active={verticalActive === "tab1"}
        >
          <Link to="/manage_drugs">Manage Drugs</Link>
        </TETabsItem>
        <TETabsItem
          onClick={() => handleVerticalClick("tab2")}
          active={verticalActive === "tab2"}
        >
          Manage Imports
        </TETabsItem>
        <TETabsItem
          onClick={() => handleVerticalClick("tab3")}
          active={verticalActive === "tab3"}
        >
          Manage Exports
        </TETabsItem>
        <TETabsItem
          onClick={() => handleVerticalClick("tab4")}
          active={verticalActive === "tab4"}
        >
          Manage Schedules
        </TETabsItem>
        <TETabsItem
          onClick={() => handleVerticalClick("tab5")}
          active={verticalActive === "tab5"}
        >
          Manage Accounts
        </TETabsItem>
      </TETabs>

      <TETabsContent>
        <TETabsPane show={verticalActive === "tab1"}>
          <Outlet />
        </TETabsPane>
        <TETabsPane show={verticalActive === "tab2"}>
          <Outlet />
        </TETabsPane>
        <TETabsPane show={verticalActive === "tab3"}>
          <Outlet />
        </TETabsPane>
        <TETabsPane show={verticalActive === "tab4"}>
          <Outlet />
        </TETabsPane>
        <TETabsPane show={verticalActive === "tab5"}>
          <Outlet />
        </TETabsPane>
      </TETabsContent>
    </div>
  );
};

export default Navbar;
