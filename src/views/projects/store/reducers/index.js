import { ROWS_PER_PAGE_DEFAULT } from "../../../../utility/constants/common";
import {
  FETCH_PROJECT_REQUEST,
  SET_PROJECT_PARAMS,
} from "../../../../utility/constants/actions";

const initialState = {
  data: [],
  dataAll: [],
  total: 0,
  selectedProject: {},
  params: {
    pagination: {
      rowsPerPage: ROWS_PER_PAGE_DEFAULT,
      currentPage: 1,
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
      return {
        ...state,
        data: action?.data ? action.data : state.data,
        params: action.params,
        total: action.total,
      };
    case SET_PROJECT_PARAMS:
      return {
        ...state,
        params: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
