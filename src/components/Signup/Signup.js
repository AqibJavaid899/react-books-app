import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Signup.css";
import { auth } from "../../firebase";
import { Link, useHistory } from "react-router-dom";
import { authStateChanged, userSignUp } from "../../utils/helperFunctions";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [signInUser, setSignInUser] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      authStateChanged(dispatch, authUser);
    });
    // Calling the cleanup function to remove the Auth Event after running it
    return () => unsubscribe();
  }, [name, dispatch]);

  const signUp = (e) => {
    e.preventDefault();
    // Calling Helper Functions for creating user account
    userSignUp(name, email, password, history);

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup">
      <div className="signup__heading">
        <h2>Register your Account</h2>
      </div>
      <div className="signup__form">
        <form>
          <span>Username:</span>
          <input
            className="signup__user"
            type="text"
            title="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>Email Address:</span>
          <input
            className="signup__email"
            type="email"
            title="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Password:</span>
          <input
            className="signup__password"
            type="password"
            title="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={!name || !email || !password}
            type="submit"
            onClick={(e) => {
              signUp(e);
            }}
            className="signup__submit"
            variant="contained"
            color="secondary"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
