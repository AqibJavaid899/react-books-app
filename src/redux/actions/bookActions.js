import { actionTypes } from "../constants";
import { db } from "../../firebase";
import firebase from "firebase";

export const setBooksStore = () => async (dispatch) => {
  let books = [];
  db.collection("books").onSnapshot((snapshot) => {
    snapshot.docs.map((doc) => books.push({ id: doc.id, book: doc.data() }));
  });
  dispatch({ type: actionTypes.SET_BOOKS, payload: books });
};

export const addBookToStore =
  (books, bookName, genre, author) => async (dispatch) => {
    const bookNames = await books.map((book) => book.book.name.toUpperCase());
    if (!bookNames.includes(bookName)) {
      await db
        .collection("books")
        .add({
          name: bookName,
          genre: genre,
          author: author,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) =>
          dispatch({
            type: actionTypes.ADD_BOOK,
            payload: {
              id: docRef.id,
              book: { name: bookName, genre: genre, author: author },
            },
          })
        );
    }
  };

export const deleteBookFromStore = (bookId) => async (dispatch) => {
  db.collection("books").doc(bookId).delete();
  dispatch({ type: actionTypes.DELETE_BOOK, payload: bookId });
};
