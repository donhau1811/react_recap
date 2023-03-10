import axios from "axios";
import jwtDefaultConfig from "./jwtDefaultConfig";

export default class JwtService {
  static BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
  static API_GATEWAY_KEY = process.env.REACT_APP_X_API_KEY;
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig };

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false;

  // ** For Refreshing Token
  subscribers = [];

  // ** Unauthorized
  isUnauthorized = false;

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    // ** Encode params (Fix space -> +)
    // axios.defaults.paramsSerializer = (params) => {
    //   return qs.stringify(params);
    // };

    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        // ** Get token from localStorage
        const accessToken = this.getToken();

        // Update api gateway services
        config.headers["x-api-key"] = JwtService.API_GATEWAY_KEY;

        // Key
        config.headers["x-user-agent-t"] = process.env.REACT_APP_X_USER_AGENT_T;

        // DEV DB key
        if (process.env.REACT_APP_X_DEV_DB_KEY_T) {
          config.headers["x-dev-db-key"] = process.env.REACT_APP_X_DEV_DB_KEY_T;
        }
        if (this.getUserData()?.id) {
          config.headers["ree_user_id"] = this.getUserData()?.id;
        }

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          config.headers["ree_token"] = `${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      (response) => {
        this.isUnauthorized = false;

        return response;
      },
      (error) => {
        const { response } = error;

        // ** if (status === 401) {
        if (
          response &&
          response.status === 401 &&
          window.location.href !== "/unauthorized"
        ) {
          window.location.href = "/unauthorized";
          this.isUnauthorized = true;

          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken().then((r) => {
              this.isAlreadyFetchingAccessToken = false;
              this.isUnauthorized = false;
              // ** Update accessToken in localStorage
              this.setToken(r.data.accessToken);
              this.setRefreshToken(r.data.refreshToken);

              this.onAccessTokenFetched(r.data.accessToken);
            });
          }

          return response;
        }

        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  getToken() {
    return JSON.parse(localStorage.getItem(this.jwtConfig.storageTokenKeyName));
  }

  getRefreshToken() {
    return JSON.parse(
      localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
    );
  }
  getUserData() {
    return JSON.parse(localStorage.getItem(this.jwtConfig.userDataKeyName));
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  login(...args) {
    return axios.post(
      `${JwtService.BASE_API_URL}${this.jwtConfig.loginEndpoint}`,
      ...args
    );
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args);
  }

  refreshToken() {
    return axios.post(
      `${JwtService.BASE_API_URL}${this.jwtConfig.refreshEndpoint}`,
      {
        refreshToken: this.getRefreshToken(),
      }
    );
  }

  getIsUnauthorized() {
    return this.isUnauthorized;
  }
}
