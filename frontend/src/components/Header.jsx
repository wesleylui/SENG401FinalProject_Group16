import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-400 p-4 shadow-md z-50 flex justify-between items-center">
      <h1 className="text-black text-3xl font-bold text-left flex-grow">
        <Link
          to="/"
          className="home-link text-black hover:text-gray-700 transition duration-300"
        >
          S.T.O.R.Y
        </Link>
      </h1>
      <div className="flex justify-center w-full">
        <Link to="/main">
          <button className="text-black p-2 rounded w-full mt-3 hover transition">
            New Story
          </button>
        </Link>
      </div>
      <div className="flex items-center ml-4 pr-4">
        <Link
          to="/profile"
          className="profile-link text-black p-2 rounded hover:text-gray-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faUser} size="2x" className="text-black" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
