import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.scss";

const loading = (
  <div>
    <img
      width="300px"
      height="300px"
      src={require("./assets/logo/logo.svg").default}
      alt="REE LOGO"
    />
  </div>
);

//Layout of the whole app
const AppLayout = React.lazy(() => import("./components/AppLayout"));

//Views
const Login = React.lazy(() => import("./views/login/Login"));

function App() {
  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" name="Home" element={<AppLayout />} />
        <Route />
      </Routes>
    </Suspense>
  );
}

export default App;
