import { actionTypes } from "../constants";
import { auth } from "../../firebase";

export const signInUser = (authUser) => async (dispatch) => {
  console.log("At Action Auth User is : ", authUser);
  dispatch({ type: actionTypes.STORE_SIGN_IN_USER, payload: authUser });
};

export const signOutUser = () => async (dispatch) => {
  auth.signOut();
  dispatch({ type: actionTypes.REMOVE_SIGN_IN_USER, payload: {} });
};
