import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProviderBoats from "./ProviderBoats";
import ProviderBookings from "./ProviderBookings";
import UserInbox from "../UserInbox";
import AddBoat from "../Boats/AddBoat";
import ProviderPanel from "./ProviderPanel";
import UserProfileView from "../UserProfilePage/UserProfileView";
import * as bookingsActions from "../../store/bookings.js";
import * as userProfileActions from "../../store/userProfile";
import UserProfileCard from "../UserProfilePage/UserProfileCard";
import UserRatingDisplay from "../Ratings/UserRatingDisplay";
import * as boatsAction from "../../store/boats.js";
import "./ProviderPagesCSS/ProviderBoard.css";
import BoatEdit from "./ProviderBoatEdit";
import BoatCard from "../Boats/BoatCard";
import Test from "../test/test";
import ProviderProfileView from "./ProviderProfileView";

function ProviderBoard({ user }) {
  const dispatch = useDispatch();
  const [view, setView] = useState(null);
  console.log(user.id, "--------------");

  const bookings = useSelector((state) => state.bookings);

  const userProfile = useSelector((state) => state.userProfile.user);

  useEffect(() => {
    dispatch(userProfileActions.getUserProfile(user.id));
    return () => {
      dispatch(bookingsActions.cleanUp());
      dispatch(userProfileActions.profileCleanUp());
    };
  }, [dispatch]);

  return (
    <div className="provider__board__container">
      <div>
        <div className="provider__nav__panel">
          <div
            value="profile"
            onClick={() => {
              setView("profile");
            }}
          >
            Profile
          </div>
          <div
            value="boats"
            onClick={() => {
              setView("boats");
            }}
          >
            Boats
          </div>
          <div
            value="bookings"
            onClick={() => {
              try {
                setView("bookings");
                dispatch(bookingsActions.getAllUserBookings(user.id));
              } catch (error) {
                setView("bookings");
              }
            }}
          >
            Bookings
          </div>
          <div
            value="inbox"
            onClick={() => {
              setView("inbox");
            }}
          >
            Inbox
          </div>
          <div
            value="addBoat"
            onClick={() => {
              setView("addBoat");
            }}
          >
            Add a Boat
          </div>
          {/* <NavLink to={`/users/${userId}/profile}`}>Edit Profile</NavLink> */}
        </div>
      </div>
      <div className="provider__board">
        {view === "profile" && userProfile ? (
          <div className="user__profile__view__container">
            <div>
              <UserProfileCard userProfile={userProfile}></UserProfileCard>
            </div>
            <div>
              <UserRatingDisplay userProfile={userProfile}></UserRatingDisplay>
            </div>
          </div>
        ) : null}
        {view === "boats" ? (
          <div className="provider__boats__container">
            <ProviderBoats view={view} setView={setView} />
          </div>
        ) : null}

        {view === "bookings" ? (
          <div className="provider__bookings__container">
            <ProviderBookings></ProviderBookings>
          </div>
        ) : null}
        {view === "inbox" ? (
          <div className="user__inbox__container">
            <UserInbox />
          </div>
        ) : null}

        {view === "addBoat" ? (
          <div className="add__boat__form__container">
            <AddBoat user={user} view={view} setView={setView} />
          </div>
        ) : null}

        {/* {view == "editBoat" ? (
          <div className="edit__boat__form__container">
            <h1>hello</h1>
            {useSelector((state) => state.boats)}
            {/* <BoatCard boatId={view} /> */}
        {/* <BoatEdit /> */}
        {/* </div>
        ) : null} */}
      </div>
    </div>
  );
}

export default ProviderBoard;
