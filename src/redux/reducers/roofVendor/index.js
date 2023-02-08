import { FETCH_ROOF_RENTAL_UNIT_REQUEST } from "../../../utility/constants/actions";

const initialState = {
  data: [],
  total: 0,
  selectedRoofVendor: {},
  params: {
    pagination: {
      rowsPerPage: 25,
      currentPage: 1,
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOF_RENTAL_UNIT_REQUEST:
      return {
        ...state,
        data: action?.data || state.data,
        total: action?.total || state.total,
        params: action.params
          ? { ...state.params, ...action.params }
          : state.params,
      };
    default:
      return state;
  }
};

export default reducer
