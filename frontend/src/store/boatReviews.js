import { csrfFetch } from "./csrf";

const GET_REVIEWS_BOAT = "reviews/boatsGetAll";
const GET_ONE_REVIEW = "reviews/boatsGetOne";

const singleBoatReviews = (reviews) => {
  return {
    type: GET_REVIEWS_BOAT,
    payload: reviews,
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

export const getAllReviewsForSingleBoat = (boatId) => async (dispatch) => {
  // console.log("hello");
  // console.log(boatId);
  const response = await csrfFetch(`/api/reviews/boat/${boatId}`, {
    method: "GET",
  });

  const reviews = await response.json();
  // console.log(reviews, "----------");
  dispatch(singleBoatReviews(reviews));
  return reviews;
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

const boatReviewsReducer = (state = initialState, action) => {
  // console.log(action, "-------action");
  let newState;
  switch (action.type) {
    case GET_REVIEWS_BOAT:
      const allReviews = {};
      for (let review of action.payload.boatReviews) allReviews[review.id] = review;
      return { ...state, ...allReviews };
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

export default boatReviewsReducer;
