import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { useEffect, useState } from "react";

function AddBookingForm({ boatId }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const loggedInUserId = useSelector((state) => state.session.user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { userId: loggedInUserId, boatId, startDate, endDate, checkIn, checkOut };
    // console.log(body);
    const newBooking = await csrfFetch(`/api/bookings/${boatId}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const response = await newBooking.json();

    // console.log(response);
  };

  return (
    <div>
      <h1>hello From the Add a Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date :{/* {validErrors.marinaError ? <span>{validErrors.marinaError}</span> : null} */}
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </label>
        <label>
          End Date
          {/* {validErrors.yearError ? <span>{validErrors.yearError}</span> : null} */}
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </label>
        <label>
          Check-In Time
          <select
            name="checkIn"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
            }}
          >
            <option value={7}>7:00 A.M</option>
            <option value={12}>12:00 P.M</option>
            <option value={17}>5:00 P.M</option>
            <option value={22}>10:00 P.M</option>
          </select>
        </label>
        <label>
          Check-Out Time
          <select
            name="checkOut"
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
            }}
          >
            <option value={7}>7:00 A.M</option>
            <option value={12}>12:00 P.M</option>
            <option value={17}>5:00 P.M</option>
            <option value={22}>10:00 P.M</option>
          </select>
        </label>
        <button type="submit">Book Now!</button>
      </form>
    </div>
  );
}

export default AddBookingForm;
