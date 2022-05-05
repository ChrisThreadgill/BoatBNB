import { csrfFetch } from "./csrf";

const GET_RATINGS_USER = "ratings/userGetAll";
// const GET_ONE_REVIEW = "reviews/boatsGetOne";

const singleUserRatings = (ratings) => {
  return {
    type: GET_RATINGS_USER,
    payload: ratings,
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

export const getAllRatingsForSingleUser = (userId) => async (dispatch) => {
  // console.log("hello");
  // console.log(boatId);
  const response = await csrfFetch(`/api/ratings/${userId}`, {
    method: "GET",
  });

  const ratings = await response.json();
  // console.log(ratings, "----------");
  dispatch(singleUserRatings(ratings));
  return ratings;
};
// export const getAllBoats = () => async (dispatch) => {
//   const response = await csrfFetch(`/api/boats/`, {
//     method: "GET",
//   });
//   const boats = await response.json();
//   // console.log(boats);
//   dispatch(allBoats(boats));
//   return boats;
// };

// export const getProviderBoats = (userId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/users/${userId}/boats`, {
//     method: "GET",
//   });
//   const boats = await response.json();
//   dispatch(providerBoats(boats));
//   return boats;
// };

const initialState = {};

const userRatingsReducer = (state = initialState, action) => {
  // console.log(action, "-------action");
  let newState;
  switch (action.type) {
    case GET_RATINGS_USER:
      const allRatings = {};
      for (let rating of action.payload.userRatings) allRatings[rating.id] = rating;
      return { ...state, ...allRatings };
    // case GET_ONE:
    //   newState = Object.assign({}, state);
    //   newState = action.payload;
    //   // console.log(newState, "-------- new state");
    //   return newState;
    // case GET_PROV:
    //   newState = Object.assign({}, state);
    //   newState = action.payload;
    //   return newState;
    default:
      return state;
  }
};

export default userRatingsReducer;
