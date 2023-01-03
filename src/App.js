import { Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import EmpCreate from "./views/empCreate/EmpCreate";
import NotFound from "./views/notFound/NotFound";
import EmpDetail from "./views/empDetail/EmpDetail";
import EmpEdit from "./views/empEdit/EmpEdit";
import AppLayout from "./components/AppLayout"
import "./styles.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/project" element={<AppLayout />} />
      <Route path="/project/create" element={<EmpCreate />} />
      <Route path="/project/detail/:empId" element={<EmpDetail />} />
      <Route path="/project/edit" element={<EmpEdit />} />
      <Route path="*" element={<NotFound />} />
      <Route />
    </Routes>
  );
}

export default App;
