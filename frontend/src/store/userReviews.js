import { csrfFetch } from "./csrf";

const GET_REVIEWS_USER = "reviews/userGetAll";
const GET_ONE_REVIEW = "reviews/boatsGetOne";

const singleUserReviews = (reviews) => {
  return {
    type: GET_REVIEWS_USER,
    payload: reviews,
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

const initialState = {};

const userReviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS_USER:
      const allReviews = {};
      for (let review of action.payload.userReviews) allReviews[review.id] = review;
      return { ...state, ...allReviews };

    default:
      return state;
  }
};

export default userReviewsReducer;
