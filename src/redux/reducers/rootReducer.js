import { combineReducers } from "redux";

import auth from "./auth";
import projects from "../../views/projects/store/reducers"
import users from "./users"

const rootReducer = combineReducers({
  auth,
  projects,
  users
});

export default rootReducer;
