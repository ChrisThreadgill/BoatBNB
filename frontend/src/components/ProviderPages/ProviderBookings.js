import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookingCard from "../Bookings/BookingCard";
import * as bookingsActions from "../../store/bookings.js";

function ProviderBookings() {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.session.user.id);
  const bookings = useSelector((state) => state.bookings);
  console.log(bookings, "hopefully gets the bookings in this file");

  useEffect(() => {
    dispatch(bookingsActions.getAllUserBookings(loggedInUserId));
  }, [dispatch]);

  return (
    <div>
      {bookings.length > 0 &&
        bookings?.map((booking) => {
          return <BookingCard key={booking.id} booking={booking}></BookingCard>;
        })}
    </div>
  );
}

export default ProviderBookings;
