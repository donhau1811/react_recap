const initialState = {
  userData: {},
  sessionTimeout: false,
  isTokenTimeOut: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userData: action.data,
        [action.config.storageTokenKeyName]:
          action[action.config.storageTokenKeyName],
        [action.config.storageRefreshTokenKeyName]:
          action[action.config.storageRefreshTokenKeyName],
        sessionTimeout: false,
      };

    default:
      return state;
  }
};

export default authReducer;
