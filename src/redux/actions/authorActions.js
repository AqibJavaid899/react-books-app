// Calling Constant Object from Constants File
import { actionTypes } from "../constants";
// Functions from Firebase
import { db } from "../../firebase";
import { firestore } from "../../firebase";
import firebase from "firebase";

export const setAuthorsStore = () => async (dispatch) => {
  try {
    let authors = [];
    const authorCollection = await firestore.collection("author").get();
    authorCollection.forEach((doc) => {
      authors.push({ id: doc.id, name: doc.data().name });
    });
    dispatch({ type: actionTypes.SET_AUTHORS, payload: authors });
  } catch (err) {
    console.log(err);
  }
};

export const addAuthorToStore = (authorName) => async (dispatch) => {
  try {
    db.collection("author")
      .add({
        name: authorName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {});
  } catch (err) {
    console.log(err);
  }
};
