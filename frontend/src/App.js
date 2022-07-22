import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
// import BoatPage from "./components/Boats/BoatPage";
import LoginForm from "./components/forms/AuthForms/Login";
import BoatListings from "./components/BoatListings/BoatListings";
import NewBoatForm from "./components/forms/NewBoatForm/NewBoat";
import BoatPage from "./components/BoatPage/BoatPage";

import { getKey } from "./store/maps";
import UserAccountPage from "./components/UserAccountPage/UserAccountPage";
import { GoogleMap, useJsApiLoader, useLoadScript } from "@react-google-maps/api";

import UserBookings from "./components/UserBookings/UserBookings";
import { google } from "./components/Utils";
import BoatManager from "./components/BoatManager/BoatManager";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const key = useSelector((state) => state.maps.key);
  // const google = { key: process.env.POOP };
  // console.log(google, "---------------hello please work");
  const [location, setLocation] = useState([]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      dispatch(getKey()).then(() => {
        setIsLoaded(true);
      });
    });

    // navigator.geolocation.getCurrentPosition(
    //   (location) => setLocation([location.coords.latitude, location.coords.longitude]),
    //   () => null
    // );
  }, [dispatch]);

  // const { isLoaded, loadError } = useLoadScript({
  //   id: "google-map-script",
  //   googleMapsApiKey: key,
  //   libraries: google,
  // });
  // console.log(isLoaded, loadError, "---------------");
  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "Loading Maps";

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
            <Route path="/users/:userId/">
              <h1>hello</h1>
              {/* <UserProfilePage></UserProfilePage> */}
            </Route>
            <Route path="/bookings">
              {/* <h1>hello from bookings</h1> */}
              <UserBookings></UserBookings>
            </Route>
            <Route path="/manage-boats">
              {/* <h1>hello from boat manager</h1> */}
              <BoatManager></BoatManager>
            </Route>
            <Route path="/boat-listings/:searchState">
              <BoatListings></BoatListings>

              {/* <UserProfilePage></UserProfilePage> */}
            </Route>
            <Route path="/account-settings">
              <UserAccountPage></UserAccountPage>
            </Route>
            <Route path="/new-listing">
              <NewBoatForm key={key}></NewBoatForm>
            </Route>
            <Route path="/boat/:boatId/edit">
              <ProviderBoatEdit></ProviderBoatEdit>
            </Route>
            <Route path="/boats/:boatId">
              <BoatPage></BoatPage>
            </Route>
            <Route path="/test/:userId">
              <UserProfilePage></UserProfilePage>
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
