import { csrfFetch } from "./csrf";

const GET_ALL_FOR_USER = "bookings/getAllForUser";
const GET_PROV = "boats/getprov";
const GET_ONE = "boats/getone";

const allUserBookings = (bookings) => {
  return {
    type: GET_ALL_FOR_USER,
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
  const { userWithBookings } = await response.json();

  // console.log(userWithBookings.Bookings);
  dispatch(allUserBookings(userWithBookings.Bookings));
  // return boats;
};

// export const getProviderBoats = (userId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/users/${userId}/boats`, {
//     method: "GET",
//   });
//   const boats = await response.json();
//   dispatch(providerBoats(boats));
//   return boats;
// };

const initialState = { bookings: null };

const bookingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_FOR_USER:
      // console.log(action.payload, "payload");
      newState = Object.assign({}, state);
      newState = action.payload;
      // console.log(newState);
      return newState;
    // case GET_ONE:
    //   newState = Object.assign({}, state);
    //   newState = action.payload;
    //   console.log(newState, "-------- new state");
    //   return newState;
    // case GET_PROV:
    //   newState = Object.assign({}, state);
    //   newState = action.payload;
    //   return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
