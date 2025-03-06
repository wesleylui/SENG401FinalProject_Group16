import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css"; // potential path conflict bw windows&mac users

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
