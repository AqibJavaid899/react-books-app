import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./firebase";
import { authStateChanged } from "./utils/helperFunctions";
import { useDispatch } from "react-redux";
import { LinearProgress } from "@material-ui/core";

const Nav = React.lazy(() => import("./components/Nav/Nav"));
const Home = React.lazy(() => import("./components/Home/Home"));
const Signup = React.lazy(() => import("./components/Signup/Signup"));
const Login = React.lazy(() => import("./components/Login/Login"));
const AuthorForm = React.lazy(() =>
  import("./components/addAuthor/AuthorForm")
);

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
            <Route path="/addAuthor" exact component={AuthorForm} />
          </Switch>
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
