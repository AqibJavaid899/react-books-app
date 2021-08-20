import React, { useState } from "react";
import "./Signup.css";

// Button Component from Material UI
import { Button } from "@material-ui/core";
// Hook from React-Router-DOM
import { useHistory } from "react-router-dom";
// Utility function
import { userSignUp } from "../../Utilities/helperFunctions";
// Functions from React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signUp = (e) => {
    e.preventDefault();
    // Calling Helper Functions for creating user account
    userSignUp(name, email, password, history, toast);

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
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Signup;
