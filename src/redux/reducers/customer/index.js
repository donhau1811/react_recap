import { FETCH_CUSTOMERS_REQUEST } from "../../../utility/constants/actions";

const initialState = {
  data: [],
  total: 0,
  params: {
    pagination: {
      rowsPerPage: 25,
      currentPage: 1,
    },
  },
  selectedCustomer: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_REQUEST:
      return {
        ...state,
        data: action?.data ? action.data : state.data,
        params: action.params,
        total: action.total,
      };
    default:
      return state;
  }
};

export default reducer;
