import { GET_USERS } from "../../../utility/constants/actions";

const initialState = {
  data: [],
  total: 1,
  params: {
    page: 1,
    rowsPerPage: 25,
    order: "createDate desc",
    state: "*",
    fk: '["customers", "projects", "group"]',
  },
  paramsActivities: {
    page: 1,
    rowsPerPage: 25,
    state: "*",
    fk: "*",
  },
  allData: [],
  activitiesData: [],
  selectedUser: null,
  activitiesDataReportData: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        allData: action?.allData ? action.allData : state.allData,
        data: action?.data ? action.data : state.data,
        total: action.total,
        params: action.params
          ? { ...state.params, ...action.params }
          : state.params,
      };
    default:
      return state;
  }
};

export default userReducer;
