import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import "./App.css"; // potential path conflict bw windows&mac users

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
