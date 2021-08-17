import { actionTypes } from "../constants";
import { auth } from "../../firebase";

export const signInUser = (authUser) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.STORE_SIGN_IN_USER, payload: authUser });
  } catch (err) {
    console.log(err);
  }
};

export const signOutUser = () => async (dispatch) => {
  try {
    auth.signOut();
    dispatch({ type: actionTypes.REMOVE_SIGN_IN_USER, payload: {} });
  } catch (err) {
    console.log(err);
  }
};
