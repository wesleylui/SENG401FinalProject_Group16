const HomePage = () => {
  return (
    <div className="bg-dark-blue text-white p-6 rounded shadow-lg">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        type="text"
        className="border p-2 w-full mt-4 bg-dark-blue text-white"
        placeholder="Username"
      />
      <input
        type="password"
        className="border p-2 w-full mt-2 bg-dark-blue text-white"
        placeholder="Password"
      />
      <button className="bg-blue-500 text-white p-2 rounded w-full mt-4">
        Login
      </button>
    </div>
  );
};

export default HomePage;
