import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProviderBoats from "./ProviderBoats";
import ProviderBookings from "./ProviderBookings";
import { useParams, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const dispatch = useDispatch();
  const [view, setView] = useState("profile");
  const [profileTabChecked, setProfileTabChecked] = useState("profile__profile__checked");
  const [bookingsTabChecked, setBookingsTabChecked] = useState("");
  const [boatsTabChecked, setBoatsTabChecked] = useState("");
  const [addBoatTabChecked, setAddBoatTabChecked] = useState("");

  // console.log(user.id, "--------------");
  console.log(history);

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
            className={profileTabChecked}
            value="profile"
            onClick={() => {
              setView("profile");
              setBoatsTabChecked("");
              setAddBoatTabChecked("");
              setBookingsTabChecked("");
              setProfileTabChecked("profile__profile__checked");
            }}
          >
            Profile
          </div>
          <div
            className={bookingsTabChecked}
            value="bookings"
            onClick={() => {
              setView("bookings");
              setProfileTabChecked("");
              setAddBoatTabChecked("");
              setBoatsTabChecked("");
              setBookingsTabChecked("profile__bookings__checked");
              // dispatch(bookingsActions.getAllUserBookings(user.id));
            }}
          >
            Bookings
          </div>
          <div
            className={boatsTabChecked}
            value="boats"
            onClick={() => {
              setView("boats");
              setProfileTabChecked("");
              setAddBoatTabChecked("");
              setBookingsTabChecked("");
              setBoatsTabChecked("profile__boats__checked");
            }}
          >
            Boats
          </div>

          <div
            className={addBoatTabChecked}
            value="addBoat"
            onClick={() => {
              setView("addBoat");
              setProfileTabChecked("");
              setBoatsTabChecked("");
              setBookingsTabChecked("");
              setAddBoatTabChecked("profile__add__boat__checked");
            }}
          >
            Add a Boat
          </div>
        </div>
        <span className="profile__buttons__span"></span>
      </div>
      <div className="provider__board">
        {view === "profile" && userProfile ? (
          <div className="user__profile__view__container">
            <div className="provider__profile__display">
              <UserProfileCard userProfile={userProfile}></UserProfileCard>
              <UserRatingDisplay userProfile={userProfile}></UserRatingDisplay>
            </div>
          </div>
        ) : null}
        {view === "boats" ? (
          <div className="provider__boats__home__container">
            <ProviderBoats view={view} setView={setView} />
          </div>
        ) : null}

        {view === "bookings" ? (
          <div className="provider__bookings__container">
            <ProviderBookings></ProviderBookings>
          </div>
        ) : null}

        {view === "addBoat" ? (
          <div className="add__boat__form__container">
            <AddBoat user={user} view={view} setView={setView} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProviderBoard;
