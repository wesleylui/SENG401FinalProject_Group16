import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { logout, username, isGuest } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout(); // logout deauthenticates, and resets isGuest, userId, and username
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h1>My Account</h1>
        <h2>Username: {isGuest ? "Guest" : username}</h2>
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
