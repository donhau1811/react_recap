import React from "react";

const ProjectList = React.lazy(() => import("./views/empList/EmpList"));

const routes = [
  { path: "/project", name: "Project List", element: ProjectList },
];

export default routes;
