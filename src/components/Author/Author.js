import React, { useState } from "react";
import "./Author.css";

// Button Component from Material UI
import { Button } from "@material-ui/core";
// Hooks from React Redux
import { useSelector, useDispatch } from "react-redux";
// Function from React-Router-DOM
import { Redirect } from "react-router-dom";
// Action Creators
import { addAuthorToStore } from "../../Redux/Actions/authorActions";
// Functions from React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Author = () => {
  const [author, setAuthor] = useState("");

  // Fetching Sign-In User from the Global Store
  let authUser = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  const addAuthor = (e) => {
    dispatch(addAuthorToStore(author));
    toast.dark("New Author is Added!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
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
                color="secondary"
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
      <ToastContainer />
    </div>
  );
};

export default Author;
