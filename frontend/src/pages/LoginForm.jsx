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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Error checking
    if (!username) {
      setError("Username cannot be empty");
      return;
    }
    if (!password) {
      setError("Password cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.data.success) {
        console.log("login successful:", response.data);
        login();
        navigate("/main"); // redirect to main page
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
      <div className="bg-white text-black p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border p-2 w-full mb-3 rounded bg-white text-black"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="border p-2 w-full mb-3 rounded bg-white text-black"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-black p-2 rounded w-full hover:bg-blue-600 transition"
            type="submit"
          >
            Login
          </button>
        </form>
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
          {"Don't have an account?"}{" "}
          <Link
            to="/signup"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
