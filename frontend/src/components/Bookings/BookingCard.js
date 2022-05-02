import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { useEffect, useState } from "react";

function BookingCard({ booking }) {
  // console.log(booking);
  const { checkIn, checkOut, startDate, endDate } = booking;
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [checkIn, setCheckIn] = useState(null);
  // const [checkOut, setCheckOut] = useState(null);
  // const loggedInUserId = useSelector((state) => state.session.user.id);

  return (
    <div>
      <h1>Start Date{startDate}</h1>
      <h1>End Date{endDate}</h1>
      <h1>Check In{checkIn}</h1>
      <h1>Check Out{checkOut}</h1>
    </div>
  );
}

export default BookingCard;
