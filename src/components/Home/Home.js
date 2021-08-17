import React, { useState, useEffect } from "react";
import "./Home.css";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { selectedAuthorBooks } from "../../utils/helperFunctions";
import {
  addBookToStore,
  deleteBookFromStore,
  setBooksStore,
} from "../../redux/actions/bookActions";
import { setAuthorsStore } from "../../redux/actions/authorActions";

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

  let books = useSelector((state) =>
    //state.bookStore);
    [...new Map(state.bookStore.map((book) => [book["id"], book])).values()]
  );

  useEffect(() => {
    dispatch(setBooksStore());
    dispatch(setAuthorsStore());
  }, [dispatch]);

  const addBook = async (e) => {
    e.preventDefault();
    dispatch(addBookToStore(books, bookName, genre, author));
    setBookName("");
    setGenre("");
    setAuthor("");
  };
  const bookSelected = async (selectedBook) => {
    setSelectedBook(selectedBook);
    setIsClicked(true);
    setAuthorBookList(selectedAuthorBooks(selectedBook, books));
  };

  const deleteBook = (e) => {
    e.preventDefault();
    dispatch(deleteBookFromStore(selectedBook.id));
    setIsClicked(false);
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
                {authors?.map(({ id, name }) => (
                  <option id={id} value={name}>
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
            </form>
          ) : null}
        </div>
      </div>

      {isClicked ? (
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
              onClick={() => setIsClicked(false)}
            >
              Close
            </Button>
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
      ) : null}
    </div>
  );
};

export default Home;
