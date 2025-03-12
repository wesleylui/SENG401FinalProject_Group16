import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-400 p-4 shadow-md z-50 flex justify-between items-center">
      <Link to="/main">
        <h1 className="text-white hover:text-gray-700 transition duration-300">
          S.T.O.R.Y
        </h1>
      </Link>
      <div className="flex justify-center w-full">
        <Link to="/main">
          <button className="text-black p-2 rounded w-full mt-3 hover transition mr-4">
            New Story
          </button>
        </Link>
        <Link to="/saved-stories">
          <button className="text-black p-2 rounded w-full mt-3 hover transition ml-4">
            View Saved Stories
          </button>
        </Link>
      </div>
      <div className="flex items-center ml-4 pr-4">
        <Link to="/profile">
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            className="text-white p-2 rounded hover:text-gray-700 transition duration-300"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
