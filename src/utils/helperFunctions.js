import { auth } from "../firebase";
import { signInUser, signOutUser } from "../redux/actions/userActions";

export const userSignUp = (name, email, password, history, toast) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: name,
      });
    })
    .then(() =>
      toast.success("Signup Successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    )
    .then(() =>
      setTimeout(() => {
        history.push("/login");
      }, 3000)
    )
    .catch((err) =>
      toast.error(err.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    );
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
