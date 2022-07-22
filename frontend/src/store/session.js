import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const UPDATE_PICTURE = "session/updatePicture";

const updateProfilePicture = (user) => ({
  type: UPDATE_PICTURE,
  payload: user,
});

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password, profilePicture, roleId } = user;

  const response = await csrfFetch("/api/users/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      profilePicture,
      roleId,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
export const updateUserProfilePicture = (file, userId) => async (dispatch) => {
  const formData = new FormData();

  if (file) formData.append("image", file);

  const res = await csrfFetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  // const response = await csrfFetch(`/api/users/${userId}`, {
  //   method: "PUT",
  //   body: JSON.stringify({
  //     profilePicture,
  //   }),
  // });
  // const data = await res.json();
  // console.log(data, "----------- data in the thunk");
  // dispatch(updateProfilePicture(data.user));
  // return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case UPDATE_PICTURE:
      return { ...state, user: action.payload };
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
