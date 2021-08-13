import { actionTypes } from "../constants";

const initUser = {};

export const userReducer = (state = initUser, action) => {
  switch (action.type) {
    case actionTypes.STORE_SIGN_IN_USER:
      return action.payload;
    case actionTypes.REMOVE_SIGN_IN_USER:
      return {};
    default:
      return state;
  }
};
