import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const UPDATE_PICTURE = "session/updatePicture";
const UPDATE_ROLE = "session/updateRole";

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
const updateRole = (user) => {
  return {
    type: UPDATE_ROLE,
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
  const { firstName, lastName, email, password } = user;

  const response = await csrfFetch("/api/users/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
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
  const user = await res.json();
  // const response = await csrfFetch(`/api/users/${userId}`, {
  //   method: "PUT",
  //   body: JSON.stringify({
  //     profilePicture,
  //   }),
  // });
  // const data = await res.json();
  // console.log(data, "----------- data in the thunk");
  // console.log(user, "----------");
  dispatch(updateProfilePicture(user));
  // return response;
};
export const updateRoleId = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/roleId/renter/${userId}`, {
    method: "PUT",
  });
  const user = await res.json();
  dispatch(updateRole(user));
  return user;
};
export const updateProviderId = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/roleId/provider/${userId}`, {
    method: "PUT",
  });
  const user = await res.json();
  dispatch(updateRole(user));

  return user;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case UPDATE_PICTURE:
      return action.payload;
    case UPDATE_ROLE:
      return action.payload;
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
