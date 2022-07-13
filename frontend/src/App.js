import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navigation from "./components/Navigation";
import SignUpForm from "./components/forms/AuthForms/SignUp";
import UserLoginForm from "./components/UserLoginForm";
import HomePage from "./components/HomePage";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import UserProfilePage from "./components/UserProfilePage";
import Test from "./components/test/test";
import ProviderBoatEdit from "./components/ProviderPages/ProviderBoatEdit";
import ProviderPanel from "./components/ProviderPages/ProviderPanel";
import ProviderBoats from "./components/ProviderPages/ProviderBoats";
import ProviderBookings from "./components/ProviderPages/ProviderBookings";
import UserInbox from "./components/UserInbox";
import AddBoat from "./components/Boats/AddBoat";
import BoatPage from "./components/Boats/BoatPage";
import LoginForm from "./components/forms/AuthForms/Login";
import BoatListings from "./components/BoatListings/BoatListings";

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
            <Route exact path="/">
              <HomePage className="home__page__component"></HomePage>
            </Route>
            <Route path="/sign-up">
              <SignUpForm></SignUpForm>
            </Route>
            <Route path="/login">
              <LoginForm></LoginForm>
              {/* <UserLoginForm></UserLoginForm> */}
            </Route>
            {/* <Route path="/login">
              <UserLoginForm></UserLoginForm>
            </Route> */}
            <Route path="/users/:userId/profile">
              <UserProfilePage></UserProfilePage>
            </Route>
            <Route path="/boat-listings/:searchState">
              <BoatListings></BoatListings>

              {/* <UserProfilePage></UserProfilePage> */}
            </Route>
            <Route path="/boat/:boatId/edit">
              <ProviderBoatEdit></ProviderBoatEdit>
            </Route>
            <Route path="/boats/:boatId">
              <BoatPage />
            </Route>

            {/* <Route path="/test">
              <Test></Test>
            </Route> */}
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
