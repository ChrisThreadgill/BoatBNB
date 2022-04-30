import { csrfFetch } from "./csrf";

const GET_ALL = "boats/getAll";
const GET_PROV = "boats/getprov";

const allBoats = (boats) => {
  return {
    type: GET_ALL,
    payload: boats,
  };
};

const providerBoats = (boats) => {
  return {
    type: GET_PROV,
    payload: boats,
  };
};
export const getAllBoats = () => async (dispatch) => {
  const response = await fetch(`/api/boats/`, {
    method: "GET",
  });
  const boats = await response.json();
  console.log(boats);
  dispatch(allBoats(boats));
  return boats;
};

export const getProviderBoats = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/boats`, {
    method: "GET",
  });
  const boats = await response.json();
  dispatch(providerBoats(boats));
  return boats;
};

const initialState = { boats: null };

const boatsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case GET_PROV:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    default:
      return state;
  }
};

export default boatsReducer;
