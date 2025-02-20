import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("logging in with: ", { username, password });
    // maybe API call for authentication?
  };

  return (
    <div className="bg-white text-black p-6 rounded shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
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
      <button className="bg-gray-500 text-black p-2 rounded w-full mt-3 hover:bg-gray-600 transition">
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
  );
};

export default LoginForm;
