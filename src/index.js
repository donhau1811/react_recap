import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";

// ** Redux Imports
import { Provider } from "react-redux";
import { store } from "./redux/storeConfig/store";

import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const App = lazy(() => import("./App"));

const loading = (
  <div
    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <img
      width="300px"
      height="300px"
      src={require("./assets/logo/logo.svg").default}
      alt="REE LOGO"
    />
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={loading}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
