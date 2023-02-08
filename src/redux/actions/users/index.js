import axios from "axios";
import { API_GET_USERS } from "../../../utility/constants/api";
import { GET_USERS } from "../../../utility/constants/actions";

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
