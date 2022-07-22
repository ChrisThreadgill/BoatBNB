// import BookingCard from "./BookingCard";
// import BoatCard from "../Boats/BoatCard";
// import { useDispatch, useSelector } from "react-redux";
// import * as bookingsActions from "../../store/bookings";
// import { useEffect } from "react";

// function UserBookings() {
//   const dispatch = useDispatch();
//   // const Bookings = Object.values(bookings);
//   const user = useSelector((state) => state.session.user);
//   useEffect(() => {
//     if (user.roleId < 2) dispatch(bookingsActions.getAllProviderBookings(user.id));
//     else {
//       dispatch(bookingsActions.getAllUserBookings(user.id));
//     }
//   }, [dispatch]);

//   return (
//     <div className="user__bookings__panel">
//       <h1>Bookings</h1>
//     </div>
//   );
// }

// export default UserBookings;
