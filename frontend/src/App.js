import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navigation from "./components/Navigation";
import SignUpForm from "./components/SignUpForm";
import UserLoginForm from "./components/UserLoginForm";
import HomePage from "./components/HomePage";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import UserProfilePage from "./components/UserProfilePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded}></Navigation>
      {isLoaded && (
        <div>
          <Switch>
            <Route path="/sign-up">
              <SignUpForm></SignUpForm>
            </Route>
            <Route path="/login">
              <UserLoginForm></UserLoginForm>
            </Route>
            <Route path="/users/:userId/profile">
              <UserProfilePage></UserProfilePage>
            </Route>
            <Route exact path="/">
              <HomePage></HomePage>
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
