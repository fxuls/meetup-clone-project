import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { restoreUser } from "./store/session";
import { fetchGroups } from "./store/groups";
import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import PageNotFoundPage from "./components/PageNotFoundPage";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import GroupInfoPage from "./components/GroupInfoPage/GroupInfoPage";
import EventInfoPage from "./components/EventInfoPage/EventInfoPage";
import GroupForm from "./components/GroupForm";
import EventForm from "./components/EventForm/EventForm";
import Spinner from "./components/Spinner";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // restore user on render of App
  useEffect(() => {
    Promise.all([
      dispatch(restoreUser()),
      dispatch(fetchGroups()),
    ]).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id="page">
      <Navigation />

      <main>
        {isLoaded ?
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path="/groups/:groupId/events/new">
            <EventForm />
          </Route>

          <Route path="/groups/:groupId/events/:eventId">
            <EventInfoPage />
          </Route>

          <Route path="/groups/new">
            <GroupForm />
          </Route>

          <Route path="/groups/:groupId">
            <GroupInfoPage />
          </Route>

          <Route>
            <PageNotFoundPage />
          </Route>
        </Switch> : <Spinner />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
