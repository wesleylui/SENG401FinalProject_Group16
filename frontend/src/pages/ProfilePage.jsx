import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { logout, username } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h1>My Account</h1>
        <h2>Username: {username}</h2> {/* Display the username */}
      </div>

      {/* Sign out button*/}
      <div className="text-center mt-5">
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-black py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
