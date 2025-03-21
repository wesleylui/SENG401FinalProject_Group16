import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // login error msg
  const navigate = useNavigate();
  const { login, guestLogin } = useAuth();

  const backendUrl =
    import.meta.env.ENV === "local"
      ? "http://localhost:5050"
      : import.meta.env.VITE_BACKEND_URL;

  // console.log("Using backend URL:", backendUrl); // Debugging: Log the backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Debugging: Log the backend URL
    console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

    if (!username) {
      setError("Username cannot be empty");
      return;
    }
    if (!password) {
      setError("Password cannot be empty");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/login`, {
        username,
        password,
      });

      if (response.data.success) {
        login(response.data.userId, response.data.username);
        navigate("/main");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex sm:flex-col md:flex-row gap-10 items-center justify-center mt-10">
        {/* Left Column: App Name and Description */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-black-600 mb-4">
            S.T.O.R.Y
          </h1>
          <p className="text-lg text-gray-700">
            <strong>Smart Tales On Request for Youngsters</strong> is your
            personalized story generator. Create engaging, custom stories for
            children with just a few clicks!
          </p>
        </div>

        {/* Right Column: Login Form */}
        <div className="flex-1 bg-white text-black p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">Login</h2>
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Enter Username Text Field */}
            <input
              type="text"
              className="border p-2 w-full mb-3 rounded bg-white text-black"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* Enter Password Text Field */}
            <input
              type="password"
              className="border p-2 w-full mb-3 rounded bg-white text-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Login Button */}
            <button
              className="bg-blue-500 text-black p-2 rounded w-full hover:bg-blue-600 transition"
              type="submit"
            >
              Login
            </button>
          </form>
          {/* Continue as Guest Button */}
          <button
            className="bg-gray-500 text-black p-2 rounded w-full mt-3 hover:bg-gray-600 transition"
            onClick={() => {
              guestLogin();
              navigate("/main");
            }}
          >
            Continue as Guest
          </button>

          <p className="text-center text-sm mt-3">
            {"Don't have an account?"} {/* Switch to SignupForm Link */}
            <Link
              to="/signup"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
