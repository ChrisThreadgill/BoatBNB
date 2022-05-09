import BookingCard from "./BookingCard";
import BoatCard from "../Boats/BoatCard";
import { useDispatch, useSelector } from "react-redux";
import * as bookingsActions from "../../store/bookings";

function UserBookings({ bookings }) {
  const dispatch = useDispatch();
  const Bookings = Object.values(bookings);

  return (
    <div className="user__bookings__panel">
      {Bookings.length > 0 &&
        Bookings.map((booking) => {
          return (
            <div className="user__profile__bookings">
              <div>
                <BoatCard boat={booking?.Boat}></BoatCard>
              </div>

              <div className="user__profile__booking__card">
                <BookingCard key={booking?.id} booking={booking}></BookingCard>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(bookingsActions.cancelUserBooking(booking));
                  }}
                >
                  <button>Cancel Booking</button>
                </form>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default UserBookings;
