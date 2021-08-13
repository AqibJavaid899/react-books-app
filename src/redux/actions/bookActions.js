import { actionTypes } from "../constants";
import { db } from "../../firebase";
import firebase from "firebase";

export const setBooksStore = () => async (dispatch) => {
  console.log("FROM FIREBASE!!");
  let books = [];
  db.collection("books").onSnapshot((snapshot) => {
    snapshot.docs.map((doc) => books.push({ id: doc.id, book: doc.data() }));
  });
  console.log("From SET BOOK ACTION Functions : ", books);
  dispatch({ type: actionTypes.SET_BOOKS, payload: books });
};

export const addBookToStore =
  (books, bookName, genre, author) => async (dispatch) => {
    console.log("ADD BOOKS ACTIONS...");
    const bookNames = books.map((book) => book.book.name);
    if (!bookNames.includes(bookName)) {
      db.collection("books")
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
  console.log("Deleted ID is : ", bookId);
  db.collection("books").doc(bookId).delete();
  dispatch({ type: actionTypes.DELETE_BOOK, payload: bookId });
};
