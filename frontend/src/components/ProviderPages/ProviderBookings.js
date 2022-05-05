import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookingCard from "../Bookings/BookingCard";
import BoatCard from "../Boats/BoatCard";
import * as bookingsActions from "../../store/bookings.js";
import "./ProviderPagesCSS/ProviderBookings.css";

function ProviderBookings() {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.session.user.id);
  const bookings = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(bookingsActions.getAllUserBookings(loggedInUserId));
    return () => dispatch(bookingsActions.cleanUp());
  }, [dispatch]);

  return (
    <div className="profile__bookings__panel">
      {bookings &&
        Object.values(bookings).map((booking) => {
          return (
            <div className="provider__profile__bookings">
              <div>
                <BoatCard boat={booking.Boat}></BoatCard>
              </div>

              <div className="booking__card__container">
                <h1>Booking Card Rendered Below</h1>
                <BookingCard key={booking.id} booking={booking}></BookingCard>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(bookingsActions.cancelUserBooking(booking));
                  }}
                >
                  <button type="submit">Cancel Booking</button>
                </form>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ProviderBookings;
