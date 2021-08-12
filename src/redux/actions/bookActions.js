import { actionTypes } from "../constants";
import { auth, db } from "../../firebase";
import { addBookToFirebase } from "../../utils/helperFunctions";
import firebase from "firebase";

export const setBooksStore = () => async (dispatch) => {
  let books = [];
  await db
    .collection("books")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => books.push({ id: doc.id, book: doc.data() }));
    });
  // console.log("From SET BOOK ACTION Functions : ", books);
  dispatch({ type: actionTypes.SET_BOOKS, payload: books });
};

export const addBookToStore =
  (books, id, bookName, genre, author) => async (dispatch) => {
    let ID = 0;
    // console.log("Book List before adding new book is : ", books);
    const bookNames = books.map((book) => book.book.name);
    if (!bookNames.includes(bookName)) {
      db.collection("books")
        .add({
          docId: id,
          name: bookName,
          genre: genre,
          author: author,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          ID = docRef.id;
          // console.log("New ID is : ", ID);
        });
    }
    dispatch({
      type: actionTypes.ADD_BOOK,
      payload: {
        id: ID,
        book: {
          docId: id,
          name: bookName,
          genre: genre,
          author: author,
        },
      },
    });
  };

export const deleteBookFromStore = () => {};
