import React, { useState, useEffect } from "react";
import "./Home.css";
import { db, auth } from "../../firebase.js";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [authorBookList, setAuthorBookList] = useState([]);

  let authUser = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("books")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setBooks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            book: doc.data(),
          }))
        );
      });
    db.collection("author").onSnapshot((snapshot) => {
      setAuthors(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
  }, []);

  const addBook = (e) => {
    e.preventDefault();
    const bookNames = books.map((book) => book.book.name);
    if (!bookNames.includes(bookName)) {
      db.collection("books").add({
        name: bookName,
        genre: genre,
        author: author,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setBookName("");
    setGenre("");
    setAuthor("");
  };

  const bookSelected = (book) => {
    setSelectedBook(book);
    setIsClicked(true);
    setAuthorBookList(
      books
        .flatMap((item) =>
          item.book.author === book.author && item.book.name !== book.name
            ? item.book.name
            : null
        )
        .filter((val) => val !== null)
    );
    console.log(authorBookList);
  };

  const deleteBook = (e) => {
    e.preventDefault();
    db.collection("books").doc(selectedBook.id).delete();
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
              <h2>{`Hey ${authUser.displayName}, Reading List for you!`}</h2>
            )}
          </div>
          <div className="home__bookList">
            {books.map((book) => (
              <div className="home__bookData" key={book.id}>
                <Button
                  onClick={() => bookSelected(book)}
                  variant="outlined"
                  color="primary"
                >
                  {book.book.name}
                </Button>
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
                {authors.map(({ id, name }) => (
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
                color="primary"
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
                  <li>{book}</li>
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
              Close Drawer
            </Button>
            <Button
              className="home__deleteBook"
              color="secondary"
              variant="contained"
              onClick={(e) => deleteBook(e)}
            >
              Delete Book
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
