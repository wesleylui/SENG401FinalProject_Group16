import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import "./App.css"; // potential path conflict bw windows&mac users

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />{" "}
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
};

export default App;
