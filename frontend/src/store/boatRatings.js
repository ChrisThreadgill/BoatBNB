import * as reviewActions from "./boatReviews";
import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const GET_RATINGS_NO_REVIEW = "ratings/allNoReview";
const ADD_RATING = "ratings/addRating";
const DELETE_RATING = "ratings/delete";
const CLEAN = "ratings/clean";

const singleBoatRatingsNR = (ratings) => {
  return {
    type: GET_RATINGS_NO_REVIEW,
    payload: ratings,
  };
};

const addBoatRating = (rating) => {
  return {
    type: ADD_RATING,
    payload: rating,
  };
};

const deleteRating = (ratingId) => {
  return {
    type: DELETE_RATING,
    payload: ratingId,
  };
};
const cleanRatings = () => {
  return {
    type: CLEAN,
  };
};

export const getRatingsForSingleBoatNR = (boatId) => async (dispatch) => {
  const response = await csrfFetch(`/api/ratings/boat/${boatId}/noReview`, {
    method: "GET",
  });

  const ratings = await response.json();

  dispatch(singleBoatRatingsNR(ratings));
  return ratings;
};

export const addBoatRatingNR = (ratingBody) => async (dispatch) => {
  const { userId } = ratingBody;
  const newBoatRating = await csrfFetch(`/api/ratings/boatRating`, {
    method: "POST",
    body: JSON.stringify(ratingBody),
  });
  const response = await newBoatRating.json();

  const getUser = await csrfFetch(`/api/users/profile/${userId}`, {
    method: "GET",
  });
  const User = await getUser.json();
  response.newBoatRating["User"] = User.user;

  dispatch(addBoatRating(response.newBoatRating));
  return newBoatRating;
};

export const deleteBoatRating = (reviewId, ratingId) => async (dispatch) => {
  const ratingToDelete = await csrfFetch(`/api/ratings/boats/${ratingId}`, {
    method: "DELETE",
  });
  const ratingResponse = await ratingToDelete.json();
  console.log(ratingResponse);
  dispatch(deleteRating(ratingId));

  const reviewToDelete = await csrfFetch(`/api/reviews/boats/${reviewId}`, {
    method: "DELETE",
  });
  const reviewResponse = await reviewToDelete.json();
  dispatch(reviewActions.deleteReview(reviewId));

  console.log(reviewResponse);
};

export const deleteSingleBoatRating = (ratingId) => async (dispatch) => {
  // console.log(ratingId);
  const ratingToDelete = await csrfFetch(`/api/ratings/boats/${ratingId}`, {
    method: "DELETE",
  });
  const ratingResponse = await ratingToDelete.json();

  dispatch(deleteRating(ratingId));
};

export const clean = () => (dispatch) => {
  dispatch(cleanRatings());
};

const initialState = {};

const boatRatingsReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case GET_RATINGS_NO_REVIEW:
      const ratingsNR = {};
      for (let rating of action.payload.boatRatings) ratingsNR[rating.id] = rating;
      return { ...state, ...ratingsNR };

    case ADD_RATING:
      console.log(state);
      console.log(action.payload.id);
      newState[action.payload.id] = action.payload;
      return newState;

    case DELETE_RATING:
      delete newState[action.payload];
      return newState;
    case CLEAN:
      return {};
    default:
      return state;
  }
};

export default boatRatingsReducer;
