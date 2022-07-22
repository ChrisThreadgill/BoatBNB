import BoatCard from "../../Boats/BoatCard";
import "./UserBookingCard.css";
import { FaRegCalendarAlt, FaCalendarTimes } from "react-icons/fa";
const moment = require("moment");

function UserBookingCard({ booking }) {
  //
  // console.log(booking, "--------------");
  return (
    <div className="user__booking__card__container">
      <BoatCard boat={booking.Boat}></BoatCard>
      <div className="booking__details__container">
        <div>Date: {moment(booking.bookingDate).format("MMMM Do YYYY")}</div>
        <div>Check In: {moment(booking.checkIn, "HH:mm").format("hh:mm A")}</div>
        <div className="user__booking__buttons__container">
          <div className="user__booking__reschedule">
            <FaRegCalendarAlt></FaRegCalendarAlt>
          </div>
          <div className="user__booking__cancel">
            <FaCalendarTimes></FaCalendarTimes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBookingCard;
