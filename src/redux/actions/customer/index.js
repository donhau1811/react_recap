import axios from "axios";
import { API_GET_ALL_CUSTOMERS } from "../../../utility/constants/api";
import { FETCH_CUSTOMERS_REQUEST } from "../../../utility/constants/actions";

export const getAllCustomer = () => {
  return async (dispatch) => {
    await axios
      .get(API_GET_ALL_CUSTOMERS)

      .then((response) => {
        if (response.status === 200 && response.data.data) {
          dispatch({
            type: FETCH_CUSTOMERS_REQUEST,
            data: response.data.data,
            total: response.data.count,
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
