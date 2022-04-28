import { csrfFetch } from "./csrf";

const SET_PROFILE = "session/setProfile";

const setUserProfile = (userProfile) => {
  return {
    type: SET_PROFILE,
    payload: userProfile,
  };
};
export const getUserProfile = (userId) => async (dispatch) => {
  console.log(userId, "--------------");
  const response = await fetch(`/api/users/profile/${userId}`, {
    method: "GET",
  });
  const userProfile = await response.json();
  dispatch(setUserProfile(userProfile));
  return userProfile;
};

const initialState = { userProfile: null };

const userProfileReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_PROFILE:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    default:
      return state;
  }
};

export default userProfileReducer;
