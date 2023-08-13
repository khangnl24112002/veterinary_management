/* eslint-disable react/prop-types */
import { useState } from "react";
import logoImage from "../../assets/imgs/logo.jpg";
import { Link } from "react-router-dom";

const Header = ({ userInfo }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  return (
    <div className="flex flex-row w-sceen content-center justify-around my-2">
      <div className="flex items-center justify-center">
        <img
          src={logoImage}
          alt="Image"
          className="rounded-full w-12 h-12 object-cover"
        />
        <Link to="/">
          <h1 className="mt-2 ml-2">N2K</h1>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        {/* Tao 1 thanh search bar o day */}
        <div className="w-96 flex items-center justify-center pt-3">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />
            <button
              className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {/**Code here */}
        <div className="mr-2">
          <h3>Hello {userInfo.username}</h3>
        </div>
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={toggleDropdown}
            onBlur={closeDropdown}
            className="rounded-full focus:outline-none"
            id="user-menu"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            <img
              className="h-12 w-12 rounded-full object-cover cursor-pointer"
              src={logoImage} // Replace with the actual avatar URL
              alt="User Avatar"
            />
          </button>
          {isDropdownOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <div className="py-1" role="none">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {}} // Implement your logout function here
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
