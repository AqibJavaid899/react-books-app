import React from "react";
import "./Books.css";

// Button component from Material UI
import { Button } from "@material-ui/core";
// Hooks from React Redux
import { useSelector, useDispatch } from "react-redux";
// Functions from React Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Action Creators
import { deleteBookFromStore } from "../../Redux/Actions/bookActions";

const Books = ({ setOpen, selectedBook, authorBookList }) => {
  const dispatch = useDispatch();
  let authUser = useSelector((state) => state.userStore);

  const deleteBook = (e) => {
    dispatch(deleteBookFromStore(selectedBook.id));
    toast.dark("Selected Book is deleted!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setOpen(false);
  };

  return (
    <div className="home__drawer">
      <div className="home__drawerContent">
        <h2 className="home__drawerHeading">{selectedBook.book.name}</h2>
        <div className="home__drawerInfo">
          <h4>{selectedBook.book.genre}</h4>
          <h4>{selectedBook.book.author}</h4>
          <h4>All books by this Author:</h4>
          {authorBookList.map((book) => (
            <ul className="home__drawerList">
              <li key={book}>{book}</li>
            </ul>
          ))}
        </div>
      </div>
      <div className="home__drawerButtons">
        <Button
          className="home__closeDrawer"
          variant="contained"
          color="primary"
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
        <ToastContainer />

        {!(Object.keys(authUser).length === 0) ? (
          <Button
            className="home__deleteBook"
            color="secondary"
            variant="contained"
            onClick={(e) => deleteBook(e)}
          >
            Delete
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Books;
