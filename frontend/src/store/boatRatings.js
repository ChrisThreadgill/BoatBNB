import { csrfFetch } from "./csrf";

const GET_REVIEWS_BOAT = "reviews/boatsGetAll";
const GET_RATINGS_NO_REVIEW = "ratings/allNoReview";
const GET_ONE_REVIEW = "reviews/boatsGetOne";

const singleBoatRatingsNR = (ratings) => {
  return {
    type: GET_RATINGS_NO_REVIEW,
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

export const getRatingsForSingleBoatNR = (boatId) => async (dispatch) => {
  console.log(boatId);
  const response = await csrfFetch(`/api/ratings/boat/${boatId}/noReview`, {
    method: "GET",
  });

  const ratings = await response.json();
  console.log(ratings, "----------");
  dispatch(singleBoatRatingsNR(ratings));
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

const boatRatingsReducer = (state = initialState, action) => {
  console.log(action, "-------action");
  let newState;
  switch (action.type) {
    case GET_RATINGS_NO_REVIEW:
      console.log(action.payload, "-------------------");
      const ratingsNR = {};
      for (let rating of action.payload.boatRatings) ratingsNR[rating.id] = rating;
      return { ...state, ...ratingsNR };
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

export default boatRatingsReducer;
