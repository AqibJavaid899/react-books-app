import { actionTypes } from "../constants";
import { db } from "../../firebase";
import firebase from "firebase";

// id: doc.id,
// name: doc.data().name,

export const setAuthorsStore = () => async (dispatch) => {
  let authors = [];
  db.collection("author").onSnapshot((snapshot) => {
    snapshot.docs.map((doc) =>
      authors.push({ id: doc.id, name: doc.data().name })
    );
  });
  console.log("Authors array in action creators : ", authors);
  dispatch({ type: actionTypes.SET_AUTHORS, payload: authors });
};

export const addAuthorToStore = (authorName) => async (dispatch) => {
  console.log("In Add Author Action");
  let ID = 0;
  db.collection("author")
    .add({
      name: authorName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      ID = docRef.id;
    })
    .then(() =>
      dispatch({
        type: actionTypes.ADD_AUTHOR,
        payload: {
          id: ID,
          name: authorName,
        },
      })
    );
};
