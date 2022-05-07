import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./BookingsCSS/BoatBooking.css";

import Calendar from "react-calendar";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function AddBookingForm({ boatId }) {
  const history = useHistory();
  const [bookingDate, setBookingDate] = useState("");
  const [checkIn, setCheckIn] = useState(7);
  const [checkOut, setCheckOut] = useState(17);
  const [validErrors, setValidErrors] = useState(null);
  const loggedInUserId = useSelector((state) => state.session.user.id);
  console.log(bookingDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { userId: loggedInUserId, boatId, bookingDate, checkIn, checkOut };
    // console.log(body);
    const newBooking = await csrfFetch(`/api/bookings/${boatId}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const response = await newBooking.json();
    // console.log(response.newBooking);
    if (response.newBooking.userId === loggedInUserId) {
      history.push(`/users/${loggedInUserId}/profile`);
    }
  };

  useEffect(() => {
    if (!bookingDate) setValidErrors("Please select a date");
  }, [bookingDate]);
  useEffect(() => {
    setValidErrors(null);
  }, []);

  return (
    <div className="boat__booking__form">
      <h1>hello From the Add a Booking Form</h1>
      <div>
        <form onSubmit={handleSubmit} className="booking__form">
          <div>
            <label>
              Booking Date :{validErrors && <span>Please Select a date!</span>}
              <input
                type="date"
                required
                name="startDate"
                value={bookingDate}
                onChange={(e) => {
                  setBookingDate(e.target.value);
                }}
              />
            </label>
          </div>

          <div>
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
          </div>

          <div>
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
          </div>
          <div className="book__now__button__div">
            <button className="add__booking__button" type="submit">
              Book Now!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBookingForm;
