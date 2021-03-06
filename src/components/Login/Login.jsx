import React, { useState } from "react";
import "./Login.css";

// Button Component from Material UI
import { Button } from "@material-ui/core";
// Auth from Firebase
import { auth } from "../../firebase";
// Hook from React-Redux
import { useDispatch } from "react-redux";
// Action Creators
import { signInUser } from "../../Redux/Actions/userActions";
// Hook from React-Router-DOM
import { useHistory } from "react-router-dom";
// Functions from React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  errorReactToastify,
  successReactToastify,
} from "../../Utilities/repetitveFragments";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const signIn = (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        dispatch(signInUser(authUser.user));
      })
      .then(() => successReactToastify("Login Successful!"))
      .then(() =>
        setTimeout(() => {
          history.push("/");
        }, 1800)
      )
      .catch((err) => errorReactToastify(err.message));

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="login__heading">
        <h2>Login to your Account</h2>
      </div>
      <div className="login__form">
        <form>
          <span>Email Address:</span>
          <input
            className="login__email"
            type="email"
            title="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <span>Password:</span>
          <input
            className="login__password"
            type="password"
            title="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <Button
            disabled={!email || !password}
            type="submit"
            onClick={(e) => {
              signIn(e);
            }}
            className="login__submit"
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Login;
