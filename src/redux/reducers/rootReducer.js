import { combineReducers } from "redux";

import auth from "./auth";
import projects from "../../views/projects/store/reducers";
import users from "./users";
import roofVendors from "./roofVendor";
import customers from "./customer";

const rootReducer = combineReducers({
  auth,
  projects,
  users,
  roofVendors,
  customers,
});

export default rootReducer;
