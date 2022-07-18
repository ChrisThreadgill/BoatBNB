import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

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

export const getAllUserBookings = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/user/${userId}`, {
    method: "GET",
  });
  const { bookingsForSpecificUser } = await response.json();

  dispatch(allUserBookings(bookingsForSpecificUser));
};

export const getAllBoatBookings = (boatId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/boat/${boatId}`, {
    method: "GET",
  });
  const { bookingsForBoat } = await response.json();
  dispatch(allBookingsForBoat(bookingsForBoat));
};

export const cancelUserBooking = (booking) => async (dispatch) => {
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

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case GET_ALL_FOR_USER:
      const bookings = {};

      for (let booking of action.payload) {
        bookings[booking.id] = booking;
      }

      return { ...bookings };
    case GET_ALL_FOR_BOAT:
      const boatBookings = {};

      for (let booking of action.payload) {
        boatBookings[booking.id] = booking;
      }
      return { ...boatBookings };

    case CANCEL:
      delete newState[action.payload.id];
      return newState;
    case CLEAR:
      return {};
    default:
      return state;
  }
};

export default bookingsReducer;
