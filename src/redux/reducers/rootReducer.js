import { combineReducers } from "redux";

import auth from "./auth";
import projects from "../../views/projects/store/reducers"

const rootReducer = combineReducers({
  auth,
  projects
});

export default rootReducer;
