import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // for incorrect pw
  const [message, setMessage] = useState(""); // for success message
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Error checking
    if (!username) {
      setError("Username cannot be empty");
      return;
    }
    if (!password) {
      setError("Password cannot be empty");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // local version
      const response = await axios.post("http://localhost:5050/signup", {
        username,
        password,
      });

      // deployment version
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACKEND_URL}/signup`,
      //   {
      //     username,
      //     password,
      //   }
      // );

      setMessage(response.data.message);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      login();
      navigate("/main");
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-white text-black p-6 rounded shadow-lg mb-4">
        <h2 className="text-xl font-bold text-center mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
          <input
            type="password"
            className="border p-2 w-full mb-3 rounded bg-white text-black"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-black p-2 rounded w-full hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-3">
          {"Already have an account?"}{" "}
          <Link to="/" className="text-blue-500 cursor-pointer hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
