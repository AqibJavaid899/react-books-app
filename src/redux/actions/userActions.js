import { actionTypes } from "../constants";


export const signInUser = (authUser) => async(dispatch) => {
    dispatch({ type: actionTypes.STORE_SIGN_IN_USER, payload: authUser})
}

export const signOutUser = () => async(dispatch) => {
    dispatch({ type: actionTypes.REMOVE_SIGN_IN_USER, payload: {}})
}
