import { useDispatch, useSelector } from "react-redux";
import * as bookingsActions from "../../store/bookings";
import * as boatsActions from "../../store/boats";
import { useEffect, useState } from "react";
import UserBookingCard from "./UserBookingCard/UserBookingCard";
import "./UserBookings.css";

function UserBookings() {
  const dispatch = useDispatch();
  // const Bookings = Object.values(bookings);
  const user = useSelector((state) => state.session.user);
  const personalBookings = useSelector((state) => state.bookings.personalBookings);
  const ownerBookings = useSelector((state) => state.bookings.ownerBookings);
  const providerBoats = useSelector((state) => state.boats);
  // const boatsObj = providerBoats;
  const [userOwnerActive, setUserOwnerActive] = useState(false);
  const [userRenterActive, setUserRenterActive] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (user.roleId < 2) dispatch(bookingsActions.getAllProviderBookings(user.id)).then(() => setIsLoaded(true));
    else {
      dispatch(bookingsActions.getAllUserBookings(user.id)).then(() => setIsLoaded(true));
    }
    return () => {
      dispatch(boatsActions.getProviderBoats(user.id));
    };
  }, [dispatch]);
  // console.log(personalBookings, "-----------------");
  return (
    <div className="user__bookings__container">
      <h1>Bookings</h1>
      <div className="renter__owner__toggle__container">
        <div
          className={userRenterActive ? "user__renter__active" : "user__renter__inactive"}
          onClick={
            userRenterActive
              ? null
              : () => {
                  setUserOwnerActive(false);
                  setUserRenterActive(true);
                }
          }
        >
          As renter
        </div>
        {user.roleId < 2 ? (
          <div
            className={userOwnerActive ? "user__owner__active" : "user__owner__inactive"}
            onClick={
              userOwnerActive
                ? null
                : () => {
                    setUserRenterActive(false);
                    setUserOwnerActive(true);
                  }
            }
          >
            As owner
          </div>
        ) : null}
      </div>
      {isLoaded && Object.values(personalBookings).length >= 1 && userRenterActive ? (
        Object.values(personalBookings).map((booking) => {
          return <UserBookingCard booking={booking}></UserBookingCard>;
        })
      ) : (
        <div>{isLoaded && Object.values(personalBookings).length < 1 && userRenterActive ? "No Bookings" : null}</div>
      )}
      {isLoaded && Object.values(ownerBookings).length >= 1 && userOwnerActive ? (
        Object.values(ownerBookings).map((booking) => {
          booking["Boat"] = providerBoats[booking.boatId];
          //  let booking['Boat'] = providerBoats[booking.boatId];
          // console.log(booking.Boat, "---------------");
          // return <li>{booking.boatId}</li>;
          return <UserBookingCard booking={booking}></UserBookingCard>;
        })
      ) : (
        <div>{isLoaded && Object.values(ownerBookings).length < 1 && userOwnerActive ? "No Bookings" : null}</div>
      )}
      {/* <h1>Bookings</h1> */}
      {/* <h1>ALSO HERE</h1> */}
    </div>
  );
}

export default UserBookings;
