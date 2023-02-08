const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const BASE_API_URL_V2 = process.env.REACT_APP_BASE_API_URL_V2;

export const API_GET_USERS = `${BASE_API_URL}/glf_user`;

//project
export const API_GET_NEW_PROJECT = `${BASE_API_URL_V2}/project/search`;

//customers
export const API_GET_ALL_CUSTOMERS = `${BASE_API_URL_V2}/customer/all`;

//roof-vendor
export const API_GET_ALL_ROOF_VENDOR = `${BASE_API_URL_V2}/roof-vendor/all`

