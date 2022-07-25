import BoatCard from "../../Boats/BoatCard";
import "./UserBookingCard.css";
import { FaRegCalendarAlt, FaCalendarTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { cancelUserBooking, cancelOwnerBooking } from "../../../store/bookings";
const moment = require("moment");

function UserBookingCard({ booking }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  //
  // console.log(booking, "--------------");
  return (
    <div className="user__booking__card__container">
      {user ? (
        <>
          <BoatCard boat={booking.Boat}></BoatCard>
          <div className="booking__details__container">
            <div>Date: {moment(booking.bookingDate).format("MMMM Do YYYY")}</div>
            <div>Check In: {moment(booking.checkIn, "HH:mm").format("hh:mm A")}</div>
            <div className="user__booking__buttons__container">
              <div className="user__booking__reschedule">{/* <FaRegCalendarAlt></FaRegCalendarAlt> */}</div>
              <div
                className="user__booking__cancel"
                onClick={
                  booking.Boat.userId === user.id
                    ? () => {
                        console.log("in the first turn");
                        dispatch(cancelOwnerBooking(booking));
                      }
                    : () => {
                        console.log("in the else turn");
                        dispatch(cancelUserBooking(booking));
                      }
                }
              >
                <FaCalendarTimes></FaCalendarTimes>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default UserBookingCard;
