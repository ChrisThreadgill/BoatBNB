import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import * as bookingsActions from "../../store/bookings.js";
import { csrfFetch } from "../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./BoatCSS/BoatBookings.css";

function BoatBookings({ boat }) {
  const dispatch = useDispatch();
  const bookingsObj = useSelector((state) => state.bookings);
  const bookingsArr = Object.values(bookingsObj);
  console.log(bookingsArr);

  useEffect(() => {
    dispatch(bookingsActions.getAllBoatBookings(boat.id));
    return () => dispatch(bookingsActions.cleanUp());
  }, [dispatch]);
  return (
    <div>
      {bookingsArr.length > 0 &&
        bookingsArr.map((booking) => {
          console.log(booking);
          return (
            <div className="provider__bookings__view">
              <div>
                <h1>profile div</h1>
                <img src={`/api/images/${booking.User.profilePicture}`} className="profile__avatar" />
                <h2>user average rating will go here</h2>
              </div>

              <div>
                <h1>booking Information Div</h1>
                <h3>{booking.startDate}</h3>
                <h3>{booking.checkIn}</h3>
                <h3>{booking.checkOut}</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(bookingsActions.cancelUserBooking(booking));
                  }}
                >
                  <button>Cancel Booking</button>
                </form>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default BoatBookings;
