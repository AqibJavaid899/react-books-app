import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./Nav.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../../redux/actions/userActions";

const Nav = () => {
  let authUser = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  const logOut = (e) => {
    e.preventDefault();
    auth.signOut();
    dispatch(signOutUser());
  };

  return (
    <div className="nav">
      <div className="nav__left">
        <Link to="/">
          <button className="nav__leftHeading">We Love Books!</button>
        </Link>
      </div>
      <div className="nav__right">
        <Link to="/addAuthor">
          <button className="nav__addAuthor">Add Author</button>
        </Link>

        {Object.keys(authUser).length === 0 ? (
          <Link to="/login">
            <button className="nav__login">Login</button>
          </Link>
        ) : null}
        {Object.keys(authUser).length === 0 ? (
          <Link to="/signup">
            <button className="nav__signup">Sign Up</button>
          </Link>
        ) : null}
        {!(Object.keys(authUser).length === 0) ? (
          <button
            onClick={(e) => {
              logOut(e);
            }}
            className="nav__logout"
          >
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Nav;
