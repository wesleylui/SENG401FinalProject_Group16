import { useState } from "react";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    console.log("signing up with: ", { username, password });
  };

  return (
    <div className="bg-white text-black p-6 rounded shadow-lg">
      <h2 className="text-xl font-bold">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="border p-2 w-full mt-4 bg-white text-black"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mt-2 bg-white text-black"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mt-2 bg-white text-black"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-black p-2 rounded w-full mt-4"
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
  );
};

export default SignupForm;
