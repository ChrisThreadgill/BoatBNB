import { csrfFetch } from "./csrf";

const GET_REVIEWS_USER = "reviews/userGetAll";
const GET_ONE_REVIEW = "reviews/boatsGetOne";
const ADD_REVIEW_NR = "reviews/addReviewNR";
const ADD_USER_REVIEW = "reviews/addUserReview";

const singleUserReviews = (reviews) => {
  return {
    type: GET_REVIEWS_USER,
    payload: reviews,
  };
};
const addUserReviewNR = (review) => {
  return {
    type: ADD_REVIEW_NR,
    payload: review,
  };
};

const addUserReview = (review) => {
  return {
    type: ADD_USER_REVIEW,
    payload: review,
  };
};

export const getAllReviewsForSingleUser = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/user/${userId}`, {
    method: "GET",
  });

  const reviews = await response.json();

  dispatch(singleUserReviews(reviews));
  return reviews;
};
export const addReview = (reviewBody) => async (dispatch) => {
  const newUserReview = await csrfFetch(`/api/reviews/userReview`, {
    method: "POST",
    body: JSON.stringify(reviewBody),
  });
  const review = await newUserReview.json();

  dispatch(addUserReviewNR(review.newUserReview));
  return newUserReview;
};
export const addReviewWithRating = (reviewBody, ratingBody) => async (dispatch) => {
  const newUserReview = await csrfFetch(`/api/reviews/userReview`, {
    method: "POST",
    body: JSON.stringify(reviewBody),
  });
  const response = await newUserReview.json();

  ratingBody.userReviewId = response.newUserReview.id;

  const newUserRating = await csrfFetch(`/api/ratings/userRating`, {
    method: "POST",
    body: JSON.stringify(ratingBody),
  });
  const UserRating = await newUserRating.json();

  response.newUserReview["UserRating"] = UserRating.newUserRating;

  dispatch(addUserReview(response.newUserReview));
  return response.newUserRating;
};

const initialState = {};

const userReviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS_USER:
      const allReviews = {};
      for (let review of action.payload.userReviews) allReviews[review.id] = review;
      return { ...state, ...allReviews };

    case ADD_USER_REVIEW:
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_REVIEW_NR:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default userReviewsReducer;
