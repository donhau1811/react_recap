// ** Handle User Login
import useJwt from "../../../auth/jwt/useJwt";

const config = useJwt.jwtConfig;

export const handleLogin = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "LOGIN",
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]:
        data[config.storageRefreshTokenKeyName],
    });

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem("userData", JSON.stringify(data.user));
    localStorage.setItem(
      config.storageTokenKeyName,
      JSON.stringify(data.accessToken)
    );
    localStorage.setItem(
      config.storageRefreshTokenKeyName,
      JSON.stringify(data.refreshToken)
    );
  };
};

export const handleLogout = (data) => {
  return (dispatch) => {
    localStorage.removeItem("userData");
    localStorage.removeItem(config.storageTokenKeyName);
    localStorage.removeItem(config.storageRefreshTokenKeyName);

    dispatch({
      type: "LOGOUT",
      [config.storageTokenKeyName]: null,
      [config.storageRefreshTokenKeyName]: null,
      ...data,
    });
  };
};
