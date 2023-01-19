import React from "react";

const ProjectList = React.lazy(() => import("./views/projects"));
const NotFound = React.lazy(() => import("./views/notFound/NotFound"));

const routes = [
  { path: "/project", name: "Project List", element: ProjectList },
  { path: "/unauthorized", name: "Not Found/ Unauthorized", element: NotFound },
];

export default routes;
