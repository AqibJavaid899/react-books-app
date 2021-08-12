import { actionTypes } from "../constants";
import { auth, db } from "../../firebase";

//console.log(`DOC ID : ${doc.id}. Book Data : ${doc.data().name}
// books.push({ id: doc.id, book: doc.data() })

export const setBooksStore = () => async (dispatch) => {
  let books = [];
  await db
    .collection("books")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => books.push({ id: doc.id, book: doc.data() }));
    });
  console.log("Action Books are : ", books);
  dispatch({ type: actionTypes.SET_BOOKS, payload: books });
};
