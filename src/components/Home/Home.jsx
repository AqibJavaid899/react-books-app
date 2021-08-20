import React, { useState, useEffect } from "react";
import "./Home.css";

// Calling Book Componenet
import Books from "../Books/Books";
// Button component from Material UI
import { Button } from "@material-ui/core";
// Hooks from React Redux
import { useSelector, useDispatch } from "react-redux";
// Utility function
import { selectedAuthorBooks } from "../../Utilities/helperFunctions";
// Action Creators
import { addBookToStore, setBooksStore } from "../../Redux/Actions/bookActions";
import { setAuthorsStore } from "../../Redux/Actions/authorActions";

// Functions from React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [authorBookList, setAuthorBookList] = useState([]);

  const dispatch = useDispatch();
  let authUser = useSelector((state) => state.userStore);
  let authors = useSelector((state) => state.authorStore);
  let books = useSelector((state) => state.bookStore);

  useEffect(() => {
    dispatch(setBooksStore());
    dispatch(setAuthorsStore());
  }, [dispatch]);

  const addBook = (e) => {
    e.preventDefault();
    dispatch(addBookToStore(books, bookName, genre, author));
    toast.dark("New Book is Added!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setBookName("");
    setGenre("");
    setAuthor("");
  };
  const bookSelected = (selectedBook) => {
    setSelectedBook(selectedBook);
    setIsClicked(true);
    setAuthorBookList(selectedAuthorBooks(selectedBook, books));
  };

  return (
    <div class="main__section">
      <div className="home">
        <div className="home__content">
          <div className="home__heading">
            {Object.keys(authUser).length === 0 ? (
              <h2>Reading List for Users!</h2>
            ) : (
              <h2>{`Reading List for ${authUser.displayName}!`}</h2>
            )}
          </div>
          <div className="home__bookList">
            {books?.map((book) => (
              <div className="home__bookData" key={book?.docId}>
                <button onClick={() => bookSelected(book || null)}>
                  {book?.book?.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="home__bookForm">
          {!(Object.keys(authUser).length === 0) ? (
            <form>
              <span>Book Name:</span>
              <input
                className="home__bookName"
                type="text"
                title="bookName"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
              <span>Genre:</span>
              <input
                className="home__bookGenre"
                type="text"
                title="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
              <span>Author:</span>

              <select
                className="home__bookAuthor"
                title="author"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              >
                <option value="" selected disabled hidden>
                  Choose your Author
                </option>
                {authors?.map(({ id, name }) => (
                  <option selected="Aqib Javaid" id={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <Button
                disabled={!bookName || !genre || !author}
                type="submit"
                onClick={(e) => {
                  addBook(e);
                }}
                className="home__submit"
                variant="contained"
                color="secondary"
              >
                Add Book
              </Button>
              <ToastContainer />
            </form>
          ) : null}
        </div>
      </div>

      {isClicked ? (
        <Books
          setIsClicked={setIsClicked}
          selectedBook={selectedBook}
          authorBookList={authorBookList}
        />
      ) : null}
    </div>
  );
};

export default Home;
