// ** Handle User Login
// import useJwt from "@src/auth/jwt/useJwt";
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
    localStorage.setItem("loginTime", Date.now().toString());
    localStorage.setItem("rememberMe", data.rememberMe);
  };
};
