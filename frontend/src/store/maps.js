import { csrfFetch } from "./csrf";

const run = "maps/run";

const loadApiKey = (key) => ({
  type: run,
  payload: key,
});

export const getKey = () => async (dispatch) => {
  const res = await csrfFetch("/api/boats/key", {
    method: "POST",
  });
  const data = await res.json();
  dispatch(loadApiKey(data.googleMapsAPIKey));
};

const initialState = { key: null };

const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case run:
      return { key: action.payload };
    default:
      return state;
  }
};

export default mapsReducer;
