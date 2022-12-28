import { Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import DashBoard from "./views/dashboard/DashBoard";
import "./styles.scss";

function App() {
  return (
    <Routes>
      <Route path="/log-in" element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  );
}

export default App;
