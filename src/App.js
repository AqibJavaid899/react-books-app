import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import AuthorForm from "./components/addAuthor/AuthorForm";
import { auth } from "./firebase";
import { authStateChanged } from "./utils/helperFunctions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      authStateChanged(dispatch, authUser);
    });
    // Calling the cleanup function to remove the Auth Event after running it
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/addAuthor" exact component={AuthorForm} />
          {/* <Route path='/bookDetails/:bookId' exact component={BookDetails} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
