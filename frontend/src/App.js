import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { restoreUser } from "./store/session";
import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import PageNotFoundPage from "./components/PageNotFoundPage";

import "normalize.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // restore user on render of App
  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <h1>Hello from App</h1>
      <Navigation />
      <Switch>
        <Route exact path="/">
          Home
        </Route>

        <Route path="/login">
          <LoginFormPage />
        </Route>

        <Route path="/signup">
          <SignupFormPage />
        </Route>

        <Route>
          <PageNotFoundPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
