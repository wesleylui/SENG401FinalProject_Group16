import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
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
      <div className="profile-container text-center mt-10">
        <h1 className="text-4xl font-bold mb-4">My Account</h1>
        <h2 className="text-lg text-gray-600 mb-8">Username: {username}</h2>
      </div>

      {/* Sign out button */}
      <div className="text-center mt-5">
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-black py-2 px-6 rounded hover:bg-red-600 transition duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
