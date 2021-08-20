import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./firebase";
import { authStateChanged } from "./Utilities/helperFunctions";
import { useDispatch } from "react-redux";
import { LinearProgress } from "@material-ui/core";

const Nav = React.lazy(() => import("./Components/Navigation/Navigation"));
const Home = React.lazy(() => import("./Components/Home/Home"));
const Signup = React.lazy(() => import("./Components/Signup/Signup"));
const Login = React.lazy(() => import("./Components/Login/Login"));
const Author = React.lazy(() => import("./Components/Author/Author"));

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
      <React.Suspense fallback={<LinearProgress color="secondary" />}>
        <Router>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/addAuthor" exact component={Author} />
          </Switch>
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
