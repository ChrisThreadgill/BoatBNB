import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const ADD_ONE = "boats/getone";
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
const addBoat = (boat) => {
  return {
    type: ADD_ONE,
    payload: boat,
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
export const getAllBoats = (boatId) => async (dispatch) => {
  const response = await csrfFetch(`/api/boats/`, {
    method: "GET",
    body: JSON.stringify(boatId),
  });

  const boat = await response.json();
  console.log(boat, "in the thunk");

  dispatch(oneBoat(boat));
  return boat;
};
export const addOneBoat = (boat, userId) => async (dispatch) => {
  // console.log(boatId, "in the thunk");
  let boatReviewsNoRating = [];
  const response = await csrfFetch(`/api/boats/${userId}/boats`, {
    method: "POST",
    body: JSON.stringify(boat),
  });
  // console.log(response, "---------- response in thunk");
  const newBoat = await response.json();
  return newBoat;
  // const { boat, boatBookings, boatReviews } = await response.json();
  // // console.log(boat, boatBookings, boatReviews, "in the thunk");
  // if (boatReviews.length >= 1) {
  //   for (let i = 0; i < boatReviews.length; i++) {
  //     let curr = boatReviews[i];
  //     // console.log(curr);
  //     if (curr.BoatRating) {
  //       continue;
  //     } else {
  //       boatReviewsNoRating.push(curr);
  //     }
  //   }
  // }

  // boat.Bookings = boatBookings;
  // boat.boatReviewsNoRating = boatReviewsNoRating;
  // dispatch(oneBoat(boat));
  // return boat;
};

export const getOneBoat = (boatId) => async (dispatch) => {
  // console.log(boatId, "in the thunk");
  let boatReviewsNoRating = [];
  console.log(boatReviewsNoRating, "------------ in the thunk before fetch");
  const response = await csrfFetch(`/api/boats/${boatId}`, {
    method: "GET",
  });

  const { boat, boatBookings, boatReviews } = await response.json();
  console.log(boatReviews, "in the thunk");
  if (boatReviews.length >= 1) {
    for (let i = 0; i < boatReviews.length; i++) {
      let curr = boatReviews[i];
      // console.log(curr);
      if (curr.BoatRating) {
        continue;
      } else {
        boatReviewsNoRating.push(curr);
      }
    }
  }
  console.log(boatReviewsNoRating, "------------ in the thunk after for loop");
  boat.Bookings = boatBookings;
  boat.boatReviewsNoRating = boatReviewsNoRating;
  dispatch(oneBoat(boat));
  return boat;
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
  // console.log("in here hopefully on unmount");
  const response = await csrfFetch(`/api/boats/search/${state}`, {
    method: "GET",
  });
  const boats = await response.json();

  dispatch(allBoats(boats));
  return boats;
};
export const uploadBoatPhoto = (file, boatId) => async (dispatch) => {
  const formData = new FormData();

  // if (file.length < 2) formData.append("image", file);

  if (file && file.length !== 0) {
    for (var i = 0; i < file.length; i++) {
      formData.append("image", file[i]);
    }
  }
  // console.log(file.length, "=-------------");
  if (file.length > 1) {
    const res = await csrfFetch(`/api/boats/${boatId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    return "success";
  }
  if (file.length === 1) {
    const res = await csrfFetch(`/api/boats/${boatId}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    return "success";
  }

  // console.log(res, "-resssssss--------------------------");
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

export const getProviderBoats = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/boats/${userId}/boats`, {
    method: "GET",
  });
  const boats = await response.json();

  dispatch(providerBoats(boats.boats));
  return boats;
};
export const clean = () => (dispatch) => {
  // console.log("we are in the clean");
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
      // console.log(action, "in the reducer");
      // const oneBoat = {};
      // oneBoat[action.payload.id] = action.payload;

      return action.payload;

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
