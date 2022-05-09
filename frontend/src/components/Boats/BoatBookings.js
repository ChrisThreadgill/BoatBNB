import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import * as bookingsActions from "../../store/bookings.js";
import { csrfFetch } from "../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./BoatCSS/BoatBookings.css";
import { FaStar } from "react-icons/fa";

function BoatBookings({ boat }) {
  const dispatch = useDispatch();
  const bookingsObj = useSelector((state) => state.bookings);
  const bookingsArr = Object.values(bookingsObj);

  useEffect(() => {
    dispatch(bookingsActions.getAllBoatBookings(boat?.id));
    return () => dispatch(bookingsActions.cleanUp());
  }, [dispatch]);
  return (
    <div>
      {bookingsArr.length > 0 &&
        bookingsArr.map((booking) => {
          const averageUserRatings = booking.User.UserRatings.reduce(
            (prev, curr, idx) => {
              prev.average = prev.average + curr.average;
              prev.friendliness = prev.friendliness + curr.friendliness;
              prev.punctuality = prev.punctuality + curr.punctuality;
              prev.trustworthy = prev.trustworthy + curr.trustworthy;
              prev.count = ++idx;
              if (prev.count === booking.User.UserRatings.length) {
                prev.average = Math.ceil(prev.average / prev.count);
                prev.friendliness = Math.ceil(prev.friendliness / prev.count);
                prev.punctuality = Math.ceil(prev.punctuality / prev.count);
                prev.trustworthy = Math.ceil(prev.trustworthy / prev.count);
              }
              return prev;
            },
            { average: null, friendliness: null, punctuality: null, trustworthy: null, count: null }
          );
          return (
            <div className="provider__bookings__view">
              <div className="provider__booking__user__information">
                <h1>{booking.User.firstName}</h1>
                <img src={`/api/images/${booking.User.profilePicture}`} className="profile__avatar" />
                {averageUserRatings && averageUserRatings.average >= 1 && (
                  <div className="provider__booking__user__rating">
                    {[...Array(averageUserRatings.average)].map((star, idx) => {
                      return <FaStar key={idx} color={"#ffc107"}></FaStar>;
                    })}
                  </div>
                )}
              </div>

              <div className="provider__booking__information__div">
                <h3>{booking.bookingDate}</h3>
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
