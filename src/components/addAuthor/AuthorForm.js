import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./AuthorForm.css";
import { db, auth } from "../../firebase.js";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const AuthorForm = () => {
  const [author, setAuthor] = useState("");

  // Fetching Sign-In User from the Global Store
  let authUser = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  const addAuthor = (e) => {
    e.preventDefault();
    db.collection("author").add({
      name: author,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setAuthor("");
  };

  return (
    <div>
      {!(Object.keys(authUser).length === 0) ? (
        <div className="author">
          <div className="author__heading">
            <h2>Create a new Author</h2>
          </div>
          <div className="author__form">
            <form>
              <span>Author Name:</span>
              <input
                className="author__name"
                type="text"
                title="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <Button
                disabled={!author}
                type="submit"
                onClick={(e) => {
                  addAuthor(e);
                }}
                className="author__submit"
                variant="contained"
                color="primary"
              >
                Create Author
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: {
              from: "/addAuthor",
            },
          }}
        />
      )}
    </div>
  );
};

export default AuthorForm;
