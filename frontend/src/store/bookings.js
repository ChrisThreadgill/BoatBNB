import * as boatsActions from "./boats";
import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();
const moment = require("moment");

const GET_ALL_FOR_USER = "bookings/getAllForUser";
const GET_ALL_FOR_PROVIDER = "bookings/getAllForProvider";
const GET_ALL_FOR_BOAT = "bookings/getAllForBoat";
const CLEAR = "bookings/clear";
const CANCEL = "bookings/cancel";

const allUserBookings = (bookings) => {
  return {
    type: GET_ALL_FOR_USER,
    payload: bookings,
  };
};

const allProviderBookings = (bookings, boatBookings) => {
  return {
    type: GET_ALL_FOR_PROVIDER,

    userBookings: bookings,
    boatBookings: boatBookings,
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
  const { bookingsNoBoats } = await response.json();
  console.log(bookingsNoBoats.Bookings);

  dispatch(allUserBookings(bookingsNoBoats.Bookings));
};
export const getAllProviderBookings = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/provider/${userId}`, {
    method: "GET",
  });
  const { bookingsWithBoats, providerBookings } = await response.json();
  const personalBookings = [];
  const pastPersonalBookings = [];

  for (let b = 0; b < bookingsWithBoats.Bookings.length; b++) {
    const currBooking = bookingsWithBoats.Bookings[b];

    const today = new Date();
    const bookingDate = new Date(currBooking.bookingDate);

    if (bookingDate > today) {
      // bookingsWithBoats.Bookings.splice(b, 1);
      personalBookings.push(currBooking);

      continue;
    } else {
      pastPersonalBookings.push(currBooking);
      //setting up past personal appointments goes here.
      continue;
    }
  }
  dispatch(boatsActions.getProviderBoats(userId));
  dispatch(allProviderBookings(personalBookings, providerBookings));
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
    case GET_ALL_FOR_PROVIDER:
      const ownerBookings = {};
      const personalBookings = {};
      for (let boatBooking of action.boatBookings) {
        ownerBookings[boatBooking.id] = boatBooking;
      }
      // console.log(action.userBookings, "================");
      for (let personalBooking of action.userBookings) {
        // console.log(personalBooking);
        personalBookings[personalBooking.id] = personalBooking;
        // personalBookings[personalBooking.id] = personalBooking;
      }
      // console.log(action, "------------------");
      // for (let booking of action.payload) {
      //   bookings[booking.id] = booking;
      // }

      return { ownerBookings, personalBookings };
    case GET_ALL_FOR_BOAT:
      const boatBookings = {};

      for (let booking of action.payload) {
        boatBookings[booking.id] = booking;
      }
      return { ...boatBookings };

    case CANCEL:
    // delete newState[action.payload.id];
    // return newState;
    case CLEAR:
      return {};
    default:
      return state;
  }
};

export default bookingsReducer;
