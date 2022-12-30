import { Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import EmpList from "./views/empList/EmpList";
import EmpCreate from "./views/empCreate/EmpCreate";
import NotFound from "./views/notFound/NotFound";
import EmpDetail from "./views/empDetail/EmpDetail";
import EmpEdit from "./views/empEdit/EmpEdit";
import "./styles.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/employee" element={<EmpList />} />
      <Route path="/employee/create" element={<EmpCreate />} />
      <Route path="/employee/detail/:empId" element={<EmpDetail />} />
      <Route path="/employee/edit" element={<EmpEdit />} />
      <Route path="*" element={<NotFound />} />
      <Route />
    </Routes>
  );
}

export default App;
