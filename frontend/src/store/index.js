import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import sessionReducer from "./session";
import thunk from "redux-thunk";
import userProfileReducer from "./userProfile";
import boatsReducer from "./boats";
import bookingsReducer from "./bookings";
import boatReviewsReducer from "./boatReviews";
import boatRatingsReducer from "./boatRatings";
import userReviewsReducer from "./userReviews";
import mapsReducer from "./maps";

const rootReducer = combineReducers({
  session: sessionReducer,
  userProfile: userProfileReducer,
  boats: boatsReducer,
  bookings: bookingsReducer,
  boatReviews: boatReviewsReducer,
  boatRatings: boatRatingsReducer,
  userReview: userReviewsReducer,
  maps: mapsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
