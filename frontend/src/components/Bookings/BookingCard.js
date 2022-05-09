import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { useEffect, useState } from "react";

function BookingCard({ booking }) {
  const bookingDateView = new Date(booking?.bookingDate);
  const dateView = bookingDateView.toDateString();

  return (
    <div>
      <h1>Booking Date</h1>
      <h3>{booking && dateView}</h3>
      <h1>Check In</h1>
      <h3>{booking && booking.checkIn}</h3>
      <h1>Check Out</h1>
      <h3>{booking && booking.checkOut}</h3>
    </div>
  );
}

export default BookingCard;
