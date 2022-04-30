import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProviderBoats from "./ProviderBoats";
import ProviderBookings from "./ProviderBookings";
import UserInbox from "../UserInbox";
import AddBoat from "../Boats/AddBoat";
import ProviderPanel from "./ProviderPanel";
import UserProfileView from "../UserProfilePage/UserProfileView";
import "./ProviderBoard.css";

function ProviderBoard({ user }) {
  const [view, setView] = useState(null);
  console.log(user);

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
              setView("bookings");
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
        {view === "profile" ? (
          <div className="user__profile__view__container">
            <UserProfileView />
          </div>
        ) : null}

        {view === "boats" ? (
          <div className="provider__boats__container">
            <ProviderBoats />
          </div>
        ) : null}
        {view === "bookings" ? (
          <div className="provider__bookings__container">
            <ProviderBookings />
          </div>
        ) : null}
        {view === "inbox" ? (
          <div className="user__inbox__container">
            <UserInbox />
          </div>
        ) : null}

        {view === "addBoat" ? (
          <div className="add__boat__form__container">
            <AddBoat user={user} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProviderBoard;
