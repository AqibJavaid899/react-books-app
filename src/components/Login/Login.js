import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./Login.css";

import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";

// Importing modules from React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      .then(() =>
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .then(() =>
        setTimeout(() => {
          history.push("/");
        }, 3000)
      )
      .catch((err) =>
        toast.error(err.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );

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
