import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const GET_REVIEWS_BOAT = "reviews/boatsGetAll";
const ADD_REVIEW_NR = "reviews/addReviewNR";
const ADD_REVIEW = "reviews/addReview";
const DELETE = "reviews/delete";
const CLEAN = "reviews/clean";

const singleBoatReviews = (reviews) => {
  return {
    type: GET_REVIEWS_BOAT,
    payload: reviews,
  };
};

const addBoatReviewNR = (review) => {
  return {
    type: ADD_REVIEW_NR,
    payload: review,
  };
};

const addBoatReview = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review,
  };
};

export const deleteReview = (reviewId) => {
  return {
    type: DELETE,
    payload: reviewId,
  };
};
const cleanReviews = () => {
  return {
    type: CLEAN,
  };
};

export const getAllReviewsForSingleBoat = (boatId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/boat/${boatId}`, {
    method: "GET",
  });

  const reviews = await response.json();
  // console.log(reviews);

  dispatch(singleBoatReviews(reviews));
  return reviews;
};

export const addReview = (reviewBody) => async (dispatch) => {
  const { userId } = reviewBody;

  const newBoatReview = await csrfFetch(`/api/reviews/boatReview`, {
    method: "POST",
    body: JSON.stringify(reviewBody),
  });
  const response = await newBoatReview.json();

  const getUser = await csrfFetch(`/api/users/profile/${userId}`, {
    method: "GET",
  });
  const User = await getUser.json();

  response.newBoatReview["User"] = User.user;

  dispatch(addBoatReviewNR(response.newBoatReview));
  return newBoatReview;
};

export const addReviewWithRating = (reviewBody, ratingBody) => async (dispatch) => {
  const { userId } = reviewBody;

  // console.log(BoatRating, "helooooooooooooooooooooooooodhsgklasjdlkgjsdkl");

  const getUser = await csrfFetch(`/api/users/profile/${userId}`, {
    method: "GET",
  });
  const User = await getUser.json();

  const newBoatReview = await csrfFetch(`/api/reviews/boatReview`, {
    method: "POST",
    body: JSON.stringify(reviewBody),
  });
  const response = await newBoatReview.json();
  // console.log(response.newBoatReview.id, "this is the response");
  ratingBody.boatReviewId = response.newBoatReview.id;

  const newBoatRating = await csrfFetch(`/api/ratings/boatRating`, {
    method: "POST",
    body: JSON.stringify(ratingBody),
  });
  const BoatRating = await newBoatRating.json();

  response.newBoatReview["User"] = User.user;
  response.newBoatReview["BoatRating"] = BoatRating.newBoatRating;

  dispatch(addBoatReview(response.newBoatReview));
  return response.newBoatRating;
};

export const deleteBoatReview = (reviewId) => async (dispatch) => {
  const reviewToDelete = await csrfFetch(`/api/reviews/boats/${reviewId}`, {
    method: "DELETE",
  });
  const reviewResponse = await reviewToDelete.json();
  dispatch(deleteReview(reviewId));
};
export const clean = () => (dispatch) => {
  dispatch(cleanReviews());
};

const initialState = {};

const boatReviewsReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case GET_REVIEWS_BOAT:
      const allReviews = {};
      for (let review of action.payload.boatReviews) allReviews[review.id] = review;
      return { ...state, ...allReviews };
    case ADD_REVIEW:
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_REVIEW_NR:
      newState[action.payload.id] = action.payload;
      return newState;

    case DELETE:
      delete newState[action.payload];
      return newState;

    case CLEAN:
      return {};

    default:
      return state;
  }
};

export default boatReviewsReducer;
