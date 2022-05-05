import { csrfFetch } from "./csrf";

const GET_ALL_FOR_USER = "bookings/getAllForUser";
const GET_ALL_FOR_BOAT = "bookings/getAllForBoat";
const CLEAR = "bookings/clear";
const CANCEL = "bookings/cancel";

const allUserBookings = (bookings) => {
  return {
    type: GET_ALL_FOR_USER,
    payload: bookings,
  };
};

const cancelBooking = (booking) => {
  return {
    type: CANCEL,
    payload: booking,
  };
};

const clearBookings = () => {
  return {
    type: CLEAR,
  };
};

const allBookingsForBoat = (bookings) => {
  return {
    type: GET_ALL_FOR_BOAT,
    payload: bookings,
  };
};
// const oneBoat = (boat) => {
//   return {
//     type: GET_ONE,
//     payload: boat,
//   };
// };

// const providerBoats = (boats) => {
//   return {
//     type: GET_PROV,
//     payload: boats,
//   };
// };

// export const getOneBoat = (boatId) => async (dispatch) => {
//   console.log("working");
//   const response = await csrfFetch(`/api/boats/${boatId}`, {
//     method: "GET",
//   });
//   console.log(response, "response-----------");
//   const boat = await response.json();
//   console.log(boat, "----------");
//   dispatch(oneBoat(boat));
//   return boat;
// };
export const getAllUserBookings = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/user/${userId}`, {
    method: "GET",
  });
  const { bookingsForSpecificUser } = await response.json();

  // console.log(userWithBookings.Bookings);
  dispatch(allUserBookings(bookingsForSpecificUser));
  // return boats;
};

export const getAllBoatBookings = (boatId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/boat/${boatId}`, {
    method: "GET",
  });
  const { bookingsForBoat } = await response.json();
  dispatch(allBookingsForBoat(bookingsForBoat));
};

export const cancelUserBooking = (booking) => async (dispatch) => {
  console.log(booking.id, "goooooking id");
  const bookingToDelete = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "DELETE",
  });
  const response = await bookingToDelete.json();

  dispatch(cancelBooking(booking));
  return booking;
};

export const cleanUp = () => (dispatch) => {
  dispatch(clearBookings());
};
// export const getProviderBoats = (userId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/users/${userId}/boats`, {
//     method: "GET",
//   });
//   const boats = await response.json();
//   dispatch(providerBoats(boats));
//   return boats;
// };

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_FOR_USER:
      const bookings = {};
      for (let booking of action.payload) {
        bookings[booking.id] = booking;
      }
      return { ...bookings };
    case GET_ALL_FOR_BOAT:
      const boatBookings = {};
      // console.log(action.payload);
      for (let booking of action.payload) {
        boatBookings[booking.id] = booking;
      }
      return { ...boatBookings };
    // console.log(action.payload, "payload");
    // newState = Object.assign({}, state);
    // newState = action.payload;
    // // console.log(newState);
    // return newState;
    // case GET_ONE:
    //   newState = Object.assign({}, state);
    //   newState = action.payload;
    //   console.log(newState, "-------- new state");
    //   return newState;
    // case GET_PROV:
    //   newState = Object.assign({}, state);
    //   newState = action.payload;
    //   return newState;
    case CANCEL:
      // let bookings = {};
      newState = { ...state };
      delete newState[action.payload.id];
      // console.log(newState[action.payload.id]);
      // for (const booking in newState) {
      //   console.log(newState.booking);
      //   bookings[booking.id] = booking;
      // }
      // console.log(bookings);
      return newState;
    case CLEAR:
      return {};
    default:
      return state;
  }
};

export default bookingsReducer;
