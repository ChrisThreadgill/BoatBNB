import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { useEffect, useState } from "react";

function BookingCard({ booking }) {
  // console.log(booking);
  // const { checkIn, checkOut, startDate, endDate } = booking;
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [checkIn, setCheckIn] = useState(null);
  // const [checkOut, setCheckOut] = useState(null);
  // const loggedInUserId = useSelector((state) => state.session.user.id);

  return (
    <div>
      <h1>Booking Date</h1>
      <h3>{booking && booking.bookingDate}</h3>
      <h1>Check In</h1>
      <h3>{booking && booking.checkIn}</h3>
      <h1>Check Out</h1>
      <h3>{booking && booking.checkOut}</h3>
    </div>
  );
}

export default BookingCard;
