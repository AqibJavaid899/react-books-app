import { auth } from "../firebase";
import { signInUser, signOutUser } from "../redux/actions/userActions";

export const userSignUp = (name, email, password, history) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: name,
      });
    })
    .then(() => history.push("/login"))
    .catch((err) => alert(err.message));
};

export const authStateChanged = (dispatch, authUser) => {
  if (authUser) {
    // It means that the user has logged into its account
    dispatch(signInUser(authUser));
  } else {
    // It means that the user has logged out of its account
    dispatch(signOutUser);
  }
};