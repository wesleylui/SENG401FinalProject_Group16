import Header from "../components/Header";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div>
      <Header />
      <div className="profile-container">
        <h1>My Account</h1>
        <h2>Username: </h2>
      </div>

      {/* Sign out button*/}
      <div className="text-center mt-5">
        <Link to="/">
          <button className="bg-red-500 text-black py-2 px-4 rounded hover:bg-red-600 transition duration-300">Sign out</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
