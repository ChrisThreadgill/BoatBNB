import { csrfFetch } from "./csrf";

const GET_RATINGS_USER = "ratings/userGetAll";
const ADD_RATING = "ratings/addRating";

// const GET_ONE_REVIEW = "reviews/boatsGetOne";

const singleUserRatings = (ratings) => {
  return {
    type: GET_RATINGS_USER,
    payload: ratings,
  };
};
const addUserRating = (rating) => {
  return {
    type: ADD_RATING,
    payload: rating,
  };
};

export const getAllRatingsForSingleUser = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/ratings/${userId}`, {
    method: "GET",
  });

  const ratings = await response.json();

  dispatch(singleUserRatings(ratings));
  return ratings;
};

export const addUserRatingNR = (ratingBody) => async (dispatch) => {
  const newBoatRating = await csrfFetch(`/api/ratings/userRating`, {
    method: "POST",
    body: JSON.stringify(ratingBody),
  });
  const response = await newBoatRating.json();

  dispatch(addUserRating(response.newUserRating));
  return response.newUserRating;
};

const initialState = {};

const userRatingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_RATINGS_USER:
      const allRatings = {};
      for (let rating of action.payload.userRatings) allRatings[rating.id] = rating;
      return { ...state, ...allRatings };

    case ADD_RATING:
      newState[action.payload.id] = action.payload;
      return newState;

    default:
      return state;
  }
};

export default userRatingsReducer;
