import { csrfFetch } from "./csrf";

const GET_ALL = "boats/getAll";
const GET_PROV = "boats/getprov";
const GET_ONE = "boats/getone";
const CLEAN = "boats/clean";

const allBoats = (boats) => {
  return {
    type: GET_ALL,
    payload: boats,
  };
};

const oneBoat = (boat) => {
  return {
    type: GET_ONE,
    payload: boat,
  };
};

const providerBoats = (boats) => {
  return {
    type: GET_PROV,
    payload: boats,
  };
};
const cleanBoats = () => {
  return {
    type: CLEAN,
  };
};

export const getOneBoat = (boatId) => async (dispatch) => {
  console.log("working");
  const response = await csrfFetch(`/api/boats/${boatId}`, {
    method: "GET",
  });
  // console.log(response, "response-----------");
  const boat = await response.json();
  // console.log(boat, "----------");
  dispatch(oneBoat(boat));
  return boat;
};
export const getAllBoats = () => async (dispatch) => {
  const response = await csrfFetch(`/api/boats/`, {
    method: "GET",
  });
  const boats = await response.json();
  // console.log(boats);
  dispatch(allBoats(boats));
  return boats;
};

export const getProviderBoats = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/boats`, {
    method: "GET",
  });
  const boats = await response.json();
  dispatch(providerBoats(boats));
  return boats;
};
export const clean = () => (dispatch) => {
  dispatch(cleanBoats());
};

const initialState = { boats: null };

const boatsReducer = (state = initialState, action) => {
  // console.log(action, "-------action");
  let newState;
  switch (action.type) {
    case GET_ALL:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case GET_ONE:
      newState = Object.assign({}, state);
      newState = action.payload;
      // console.log(newState, "-------- new state");
      return newState;
    case GET_PROV:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case CLEAN:
      return {};
    default:
      return state;
  }
};

export default boatsReducer;
