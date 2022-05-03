import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookingCard from "../Bookings/BookingCard";
import BoatCard from "../Boats/BoatCard";
import * as bookingsActions from "../../store/bookings.js";

function ProviderBookings() {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.session.user.id);
  const bookings = useSelector((state) => state.bookings);
  console.log(bookings, "hopefully gets the bookings in this file");
  const cancelBooking = async () => {};
  useEffect(() => {
    dispatch(bookingsActions.getAllUserBookings(loggedInUserId));
  }, [dispatch]);

  return (
    <div className="profile__bookings__panel">
      {bookings.length > 0 &&
        bookings?.map((booking) => {
          return (
            <div className="provider__profile__bookings">
              <div>
                <BoatCard boat={booking.Boat}></BoatCard>
              </div>

              <div>
                <h1>Booking Card Rendered Below</h1>
                <BookingCard key={booking.id} booking={booking}></BookingCard>
                <form onSubmit={cancelBooking}>
                  <button>Cancel Booking</button>
                </form>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ProviderBookings;
