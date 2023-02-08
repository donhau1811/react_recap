import axios from "axios";
import { API_GET_ALL_ROOF_VENDOR } from "../../../utility/constants/api";
import { FETCH_ROOF_RENTAL_UNIT_REQUEST } from "../../../utility/constants/actions";

export const getAllRoofVendor = () => {
  return async (dispatch) => {
    await axios
      .get(API_GET_ALL_ROOF_VENDOR)
      .then((response) => {
        if (response?.status === 200 && response?.data?.data) {
          dispatch({
            type: FETCH_ROOF_RENTAL_UNIT_REQUEST,
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
