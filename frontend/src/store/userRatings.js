import { csrfFetch } from "./csrf";

const GET_RATINGS_USER = "ratings/userGetAll";
// const GET_ONE_REVIEW = "reviews/boatsGetOne";

const singleUserRatings = (ratings) => {
  return {
    type: GET_RATINGS_USER,
    payload: ratings,
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

const initialState = {};

const userRatingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_RATINGS_USER:
      const allRatings = {};
      for (let rating of action.payload.userRatings) allRatings[rating.id] = rating;
      return { ...state, ...allRatings };

    default:
      return state;
  }
};

export default userRatingsReducer;
