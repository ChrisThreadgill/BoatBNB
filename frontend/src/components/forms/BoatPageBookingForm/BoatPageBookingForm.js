import "./BoatPageBookingForm.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import * as bookingsActions from "../../../store/bookings";
import "react-datepicker/dist/react-datepicker.css";
const moment = require("moment");

function BoatPageBookingForm({ boat }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [date, setDate] = useState("");
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(0);
  const [noTime, setNoTime] = useState(false);
  const [noDate, setNoDate] = useState(false);
  const user = useSelector((state) => state.session.user);

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
  const checkErrs = async () => {
    let count = 0;
    if (!checkInTime) {
      count++;
      setNoTime(true);
    }
    if (!date) {
      count++;
      setNoDate(true);
    }
    return count;
  };

  async function submitBooking() {
    if (!user) history.push("/sign-up");
    const errs = await checkErrs();
    if (!errs) {
      const booking = { checkIn: checkInTime, bookingDate: date, userId: user.id, boatId: boat.id };
      dispatch(bookingsActions.requestBoatBooking(boat.id, booking)).then(() => history.push("/bookings"));
    } else {
      return;
    }
  }

  function checkInHelper(number, setter) {
    setShowCheckIn(false);
    return setter(number);
  }

  useEffect(() => {
    setNoTime(false);
  }, [checkInTime]);
  useEffect(() => {
    setNoDate(false);
  }, [date]);

  return (
    <div className="new__boat__booking__container">
      <form className="new__boat__booking__form">
        <DatePicker
          className="date__picker"
          selected={""}
          minDate={tomorrow}
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
          <span className={noDate ? "no__date__selected__header" : "selected__date__header"}>Date*</span>
          <div className={noDate ? "no__date__selected__display" : "selected__date__display"}>
            {date ? moment(date).format("MMMM Do YYYY") : "Please select a date"}
          </div>
        </div>
        <div className="selected__time__display__container">
          <span className={noTime ? "no__time__selected__header" : "selected__time__header"}>Start Time*</span>
          <div className="time__select__container">
            <div
              className={noTime ? "no__time__select__toggle__container" : "time__select__toggle__container"}
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
        {user && user.id === boat.userId ? (
          <div className="booking__submit__button" onClick={() => history.push("/manage-boats")}>
            MANAGE BOAT
          </div>
        ) : (
          <div className="booking__submit__button" onClick={submitBooking}>
            REQUEST TO BOOK
          </div>
        )}
      </form>
    </div>
  );
}

export default BoatPageBookingForm;
