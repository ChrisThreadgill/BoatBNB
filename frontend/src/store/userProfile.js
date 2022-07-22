import { csrfFetch } from "./csrf";

const SET_PROFILE = "session/setProfile";
const CLEAR = "profile/clear";

const setUserProfile = (userProfile) => {
  return {
    type: SET_PROFILE,
    payload: userProfile,
  };
};
const clearProfile = () => {
  return {
    type: CLEAR,
  };
};
export const getUserProfile = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/profile/${userId}`, {
    method: "GET",
  });
  const userProfile = await response.json();

  dispatch(setUserProfile(userProfile));
  return userProfile;
};

export const getUserProfileWithBookings = (userId) => async (dispatch) => {
  const response = await fetch(`/api/user/profile/${userId}/bookings`, {
    method: "GET",
  });
};

export const profileCleanUp = () => (dispatch) => {
  dispatch(clearProfile());
};

const initialState = {};

const userProfileReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_PROFILE:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case CLEAR:
      return {};
    default:
      return state;
  }
};

export default userProfileReducer;
