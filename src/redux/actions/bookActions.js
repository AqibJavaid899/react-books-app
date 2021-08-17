import { actionTypes } from "../constants";
import { db } from "../../firebase";
import { firestore } from "../../firebase";
import firebase from "firebase";

export const setBooksStore = () => async (dispatch) => {
  try {
    let books = [];
    const booksList = await firestore.collection("books").get();
    booksList.forEach((doc) => {
      books.push({ id: doc.id, book: doc.data() });
    });
    dispatch({ type: actionTypes.SET_BOOKS, payload: books });
  } catch (err) {
    console.log(err);
  }
};

export const addBookToStore =
  (books, bookName, genre, author) => async (dispatch) => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

export const deleteBookFromStore = (bookId) => async (dispatch) => {
  try {
    db.collection("books").doc(bookId).delete();
    dispatch({ type: actionTypes.DELETE_BOOK, payload: bookId });
  } catch (err) {
    console.log(err);
  }
};
