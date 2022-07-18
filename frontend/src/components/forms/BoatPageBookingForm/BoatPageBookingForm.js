import "./BoatPageBookingForm.css";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const moment = require("moment");

function BoatPageBookingForm({ boat }) {
  const [date, setDate] = useState("");
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(0);

  //disabled dates arr for datepicker
  let disabledDates = [];

  //date manipulation
  const dateManip = new Date();
  let yesterday = new Date(dateManip);
  yesterday.setDate(yesterday.getDate() - 1);
  let tomorrow = new Date(dateManip);
  tomorrow.setDate(tomorrow.getDate() + 1);

  //setting disabled dates for DatePicker Based on boat's availability
  for (let i = 0; i < boat.Bookings?.length; i++) {
    disabledDates.push(new Date(boat.Bookings[i]));
  }

  function checkInHelper(number, setter) {
    setShowCheckIn(false);
    return setter(number);
  }

  return (
    <div className="new__boat__booking__container">
      <form className="new__boat__booking__form">
        <DatePicker
          className="date__picker"
          selected={""}
          showDateDisplay={false}
          // showDateDisplay={false}
          excludeDates={disabledDates}
          onChange={(date) => {
            // console.log(date);
            // console.log(moment(date).format("MMM DD YYYY"));
            // moment(date).format("MMMM Do YYYY")
            setDate(date);
          }}
          dateFormat="MMMM d, yyyy h:mm aa"
          inline
        ></DatePicker>
        <div className="selected__date__display__container">
          <span>Date</span>
          <div>{date ? moment(date).format("MMMM Do YYYY") : "Please select a date"}</div>
        </div>
        <div className="selected__time__display__container">
          <span>Start Time</span>
          <div className="time__select__container">
            <div
              className="time__select__toggle__container"
              onClick={() => {
                if (!showCheckIn) {
                  setShowCheckIn(true);
                } else {
                  setShowCheckIn(false);
                }
              }}
            >
              {checkInTime > 0 ? `${checkInTime} ${checkInTime === 12 ? "PM" : "AM"}` : "Please Select a Time"}
              <div className="booking__form__time__clock"></div>
            </div>
            {showCheckIn ? (
              <div className="check__in__menu__container">
                <div className="checkIn__toggle__menu">
                  <div
                    className={checkInTime === 7 ? "checkIn__time__option__selected" : "checkIn__time__option"}
                    onClick={() => checkInHelper(7, setCheckInTime)}
                  >
                    7 AM
                  </div>
                  <div
                    className={checkInTime === 8 ? "checkIn__time__option__selected" : "checkIn__time__option"}
                    onClick={() => checkInHelper(8, setCheckInTime)}
                  >
                    8 AM
                  </div>
                  <div
                    className={checkInTime === 9 ? "checkIn__time__option__selected" : "checkIn__time__option"}
                    onClick={() => checkInHelper(9, setCheckInTime)}
                  >
                    9 AM
                  </div>
                  <div
                    className={checkInTime === 10 ? "checkIn__time__option__selected" : "checkIn__time__option"}
                    onClick={() => checkInHelper(10, setCheckInTime)}
                  >
                    10 AM
                  </div>
                  <div
                    className={checkInTime === 11 ? "checkIn__time__option__selected" : "checkIn__time__option"}
                    onClick={() => checkInHelper(11, setCheckInTime)}
                  >
                    11 AM
                  </div>
                  <div
                    className={checkInTime === 12 ? "checkIn__time__option__selected" : "checkIn__time__option"}
                    onClick={() => checkInHelper(12, setCheckInTime)}
                  >
                    12 PM
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="booking__price__display__container">
          <span>Rental total</span>
          <div>${boat.price}.00</div>
        </div>

        <div className="booking__submit__button">REQUEST TO BOOK</div>
      </form>
    </div>
  );
}

export default BoatPageBookingForm;
