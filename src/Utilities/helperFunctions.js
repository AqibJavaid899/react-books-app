import { auth } from "../firebase";
import { signInUser, signOutUser } from "../Redux/Actions/userActions";
import { errorReactToastify, successReactToastify } from "./repetitveFragments";

export const userSignUp = (name, email, password, history, toast) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: name,
      });
    })
    .then(() => successReactToastify("Signup Successful!"))
    .then(() =>
      setTimeout(() => {
        history.push("/");
      }, 1800)
    )
    .catch((err) => errorReactToastify(err.message));
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

export const selectedAuthorBooks = (selectedBook, books) => {
  return books
    ?.flatMap((book) =>
      book?.book?.author === selectedBook?.book?.author &&
      selectedBook?.book?.name !== book?.book?.name
        ? book?.book?.name
        : null
    )
    .filter((val) => val !== null);
};
