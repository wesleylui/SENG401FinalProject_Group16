import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isGuest, userId, isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-400 p-4 shadow-md z-50 flex justify-between items-center">
      {/* STORY name on left side */}
      {isAuthenticated && location.pathname !== "/" && location.pathname !== "/signup" ? (
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
      <div className="flex justify-center w-full">
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
      {/* Profile Icon on right side */}
      <div className="flex items-center ml-4 pr-4">
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
