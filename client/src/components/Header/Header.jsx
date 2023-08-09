import { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/imgs/logo.jpg";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-primary-200">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/admin" className="flex text-primary font-semibold text-lg">
            <img src={logoImage} alt="Logo" className="w-8 h-8 mr-2" />
            N2K HCMUS
          </Link>
        </div>
        <div className="flex items-center flex-grow">
          <div className="relative mx-auto">
            <input
              type="text"
              placeholder="Search"
              className="py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none">
              {/* Search icon SVG */}
            </button>
          </div>
        </div>
        <div className="flex items-center ml-4">
          <button className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <button
            className="relative focus:outline-none"
            onClick={toggleDropdown}
          >
            <img
              src={logoImage}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <button className="flex items-center w-full focus:outline-none">
                      {/* Edit Profile icon SVG */}
                      Edit Profile
                    </button>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <button className="flex items-center w-full focus:outline-none">
                      {/* Settings icon SVG */}
                      Settings
                    </button>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <button className="flex items-center w-full focus:outline-none">
                      {/* Logout icon SVG */}
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
