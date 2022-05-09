import BookingCard from "./BookingCard";
import BoatCard from "../Boats/BoatCard";
import { useDispatch, useSelector } from "react-redux";
import * as bookingsActions from "../../store/bookings";

function UserBookings({ bookings }) {
  const dispatch = useDispatch();
  const Bookings = Object.values(bookings);
  // console.log(values);
  // const cancelBooking = async (bookingId) => {
  //   e.preventDefault();
  //   const deletedBooking = await csrfFetch(`/api/booking/${bookingId}`, {
  //     method: "DELETE",
  //   });
  //   const response = await deletedBooking.json();
  // };

  // const deleteBoat = async (e) => {
  //   console.log("working");
  //   e.preventDefault();
  //   const deletedBoat = await csrfFetch(`/api/boats/${boatId}`, {
  //     method: "DELETE",
  //   });
  //   const response = await deletedBoat.json();
  //   console.log(response.message);
  //   // if (response.message === "Successfully Removed Boat") {
  //   //   console.log("working");
  //   history.push(`/users/${userId}/profile`);
  //   // }
  // };

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
