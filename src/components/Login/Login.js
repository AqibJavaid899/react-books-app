import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        dispatch(signInUser(authUser.user));
      })
      .then(() => history.push("/"))
      .catch((err) => alert(err.message));

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
        </form>
      </div>
    </div>
  );
};

export default Login;
