import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SavedStories from "./pages/SavedStories";
import "./App.css"; // potential path conflict bw windows&mac users

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/saved-stories" element={<SavedStories />} />
      </Routes>
    </Router>
  );
};

export default App;
