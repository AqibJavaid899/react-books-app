import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Signup.css";
import { auth } from "../../firebase";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInUser, setSignInUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // It means that the user has logged into its account
        console.log(authUser);
        setSignInUser(authUser);
      } else {
        // It means that the user has logged out of its account
        setSignInUser(null);
      }
    });
    // Calling the cleanup function to remove the Auth Event after running it
    return () => unsubscribe();
  }, [name, signInUser]);

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
        });
        console.log(authUser);
      })
      .then(() => history.push("/login"))
      .catch((err) => alert(err.message));

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
