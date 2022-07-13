import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL = "boats/getAll";
const GET_PROV = "boats/getprov";
const GET_ONE = "boats/getone";
const UPDATE = "/boats/update";
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

const updateBoat = (boat) => {
  return {
    type: UPDATE,
    payload: boat,
  };
};
const cleanBoats = () => {
  return {
    type: CLEAN,
  };
};

export const getOneBoat = (boatId) => async (dispatch) => {
  const response = await csrfFetch(`/api/boats/${boatId}`, {
    method: "GET",
  });

  const boat = await response.json();

  dispatch(oneBoat(boat.boat));
  return boat.boat;
};

export const updateOneBoat = (body) => async (dispatch) => {
  const response = await csrfFetch(`/api/boats/${body.boatId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  const boat = await response.json();

  dispatch(updateBoat(boat.boatToUpdate));
};
export const getAllBoatsSearch = (state) => async (dispatch) => {
  console.log("in here hopefully on unmount");
  const response = await csrfFetch(`/api/boats/${state}`, {
    method: "GET",
  });
  const boats = await response.json();

  dispatch(allBoats(boats));
  return boats;
};

export const getProviderBoats = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/boats`, {
    method: "GET",
  });
  const boats = await response.json();

  dispatch(providerBoats(boats.user.Boats));
  return boats;
};
export const clean = () => (dispatch) => {
  console.log("we are in the clean");
  dispatch(cleanBoats());
};

const initialState = {};

const boatsReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case GET_ALL:
      const boats = {};

      for (let boat of action.payload.boats) {
        boats[boat.id] = boat;
      }

      return { ...boats };
    case GET_ONE:
      const oneBoat = {};
      oneBoat[action.payload.id] = action.payload;

      return oneBoat;

    case GET_PROV:
      const provBoats = {};

      for (let boat of action.payload) {
        provBoats[boat.id] = boat;
      }
      return { ...provBoats };
    case UPDATE:
      delete newState[action.payload.id];

      newState[action.payload.id] = action.payload;

      return newState;
    case CLEAN:
      return {};
    default:
      return state;
  }
};

export default boatsReducer;
