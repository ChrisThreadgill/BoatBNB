import { csrfFetch } from "./csrf";

const LOAD_API_KEY = "maps/LOAD_API_KEY";

const loadApiKey = (key) => ({
  type: LOAD_API_KEY,
  payload: key,
});

export const getKey = () => async (dispatch) => {
  console.log("in the get key thunk");
  const res = await csrfFetch("/api/boats/key", {
    method: "POST",
  });
  const data = await res.json();
  console.log(data);
  dispatch(loadApiKey(data.googleMapsAPIKey));
};

const initialState = { key: null };

const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_API_KEY:
      return { key: action.payload };
    default:
      return state;
  }
};

export default mapsReducer;
