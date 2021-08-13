import { actionTypes } from "../constants";
import { db } from "../../firebase";
import firebase from "firebase";

export const setAuthorsStore = () => async (dispatch) => {
  let authors = [];
  db.collection("author").onSnapshot((snapshot) => {
    snapshot.docs.map((doc) =>
      authors.push({ id: doc.id, name: doc.data().name })
    );
  });
  dispatch({ type: actionTypes.SET_AUTHORS, payload: authors });
};

export const addAuthorToStore = (authorName) => async (dispatch) => {
  db.collection("author")
    .add({
      name: authorName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {});
};
