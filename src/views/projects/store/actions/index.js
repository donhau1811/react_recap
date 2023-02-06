import {
  FETCH_PROJECT_REQUEST,
  GET_USERS,
} from "../../../../utility/constants/actions";
import {
  API_GET_NEW_PROJECT,
  API_GET_USERS,
} from "../../../../utility/constants/api";
import axios from "axios";

export const getListProject = (params = {}) => {
  return async (dispatch) => {
    const { pagination = {}, searchValue, ...rest } = params;
    const payload = {
      ...rest,
      limit: pagination.rowsPerPage,
      offset: pagination.rowsPerPage * (pagination.currentPage - 1),
    };
    if (searchValue?.trim()) {
      payload.searchValue = {
        value: searchValue,
        fields: ["name", "code", "companyName"],
        type: "contains",
      };
    }
    await axios
      .post(API_GET_NEW_PROJECT, payload)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          dispatch({
            type: FETCH_PROJECT_REQUEST,
            data: response.data.data,
            total: response.data.count,
            params,
          });
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};

export const getUsersLimit = (params) => {
  return async (dispatch) => {
    await axios
      .get(`${API_GET_USERS}?rowsPerPage=9999`)
      .then((response) => {
        if (response.data && response.data.status && response.data.data) {
          dispatch({
            type: GET_USERS,
            data: response.data.data,
            total: response.data.totalRow,
            params,
          });
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};
