import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Header = () => {
  const { isGuest, userId, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-400 p-4 shadow-md z-50 flex justify-between items-center">
      {/* S.T.O.R.Y name on the left side */}
      {isAuthenticated &&
      location.pathname !== "/" &&
      location.pathname !== "/signup" ? (
        <Link to="/main">
          <h1 className="text-white hover:text-gray-700 transition duration-300">
            S.T.O.R.Y
          </h1>
        </Link>
      ) : (
        <h1 className="text-white hover:text-gray-700 transition duration-300">
          S.T.O.R.Y
        </h1>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-center w-full">
        {location.pathname !== "/" && location.pathname !== "/signup" && (
          <>
            {/* New Story Button */}
            <Link to="/main">
              <button className="text-black p-2 rounded w-full mt-3 hover transition mr-4">
                New Story
              </button>
            </Link>
            {/* View Saved Stories Button */}
            {!isGuest && (
              <Link to={`/stories/${userId}`}>
                <button className="text-black p-2 rounded w-full mt-3 hover transition ml-4">
                  View Saved Stories
                </button>
              </Link>
            )}
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {location.pathname !== "/" && location.pathname !== "/signup" && (
        <div className="md:hidden flex items-center">
          <button
            className="text-black p-2 rounded hover:text-gray-700 transition duration-300"
            onClick={toggleDropdown}
          >
            <FontAwesomeIcon icon={faBars} size="2x" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-16 right-4 bg-gray-200 shadow-lg rounded p-4">
              {/* New Story Button */}
              <Link to="/main">
                <button
                  className="block text-black p-2 rounded w-full hover transition mb-2"
                  onClick={toggleDropdown}
                >
                  New Story
                </button>
              </Link>
              {/* View Saved Stories Button */}
              {!isGuest && (
                <Link to={`/stories/${userId}`}>
                  <button
                    className="block text-black p-2 rounded w-full hover transition mb-2"
                    onClick={toggleDropdown}
                  >
                    View Saved Stories
                  </button>
                </Link>
              )}
              {/* Profile Button */}
              <Link to="/profile">
                <button
                  className="block text-black p-2 rounded w-full hover transition"
                  onClick={toggleDropdown}
                >
                  Profile
                </button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Profile Icon on the right side (Desktop) */}
      <div className="hidden md:flex items-center ml-4 pr-4">
        {location.pathname !== "/" && location.pathname !== "/signup" && (
          <Link to="/profile">
            <FontAwesomeIcon
              icon={faUser}
              size="2x"
              className="text-white p-2 rounded hover:text-gray-700 transition duration-300"
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
