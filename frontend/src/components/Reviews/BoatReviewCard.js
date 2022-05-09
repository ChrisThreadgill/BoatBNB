import {
  FaStar,
  FaUserClock,
  FaRegSmile,
  FaHandshakeAltSlash,
  FaRegHandshake,
  FaRegClock,
  FaAirbnb,
  FaRegCalendarAlt,
  FaRegCalendarCheck,
  FaRegCalendarMinus,
  FaSoap,
  FaCouch,
  FaWrench,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ratingActions from "../../store/boatRatings";
import * as reviewActions from "../../store/boatReviews";

function BoatReviewCard({ review }) {
  const userId = useSelector((state) => state.session.user?.id);
  const dispatch = useDispatch();

  return (
    <div className="boat__review__card">
      <div>
        {review.User.profilePicture && (
          <div>
            <h3>{review.User.firstName}</h3>
            <img src={`/api/images/${review.User?.profilePicture}`} className="profile__avatar" />
          </div>
        )}
        {/* <div>{review.User.UserRatings[0]?.average}</div> */}
      </div>

      <div className="review__content__container">
        <div>
          <h2>{review.review}</h2>
        </div>
        {userId === review.User.id && (
          <div className="review__delete__form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (review.BoatRating?.id) {
                  dispatch(ratingActions.deleteBoatRating(review.id, review.BoatRating.id));
                } else dispatch(reviewActions.deleteBoatReview(review.id));
              }}
            >
              <button className="review__delete__button" type="submit">
                Delete Review
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="boat__review__card__ratings">
        {review.BoatRating && (
          <div>
            <div>
              <h1>Rating: {review.BoatRating.average}</h1>

              <div className="boat__rating__stars">
                {[...Array(Math.ceil(review.BoatRating.average))].map((star, idx) => {
                  return <FaStar key={idx} color={"#ffc107"}></FaStar>;
                })}
              </div>
            </div>

            <div>
              <h2>Cleanliness: {review.BoatRating.cleanliness}</h2>

              <div className="boat__rating__stars">
                {[...Array(Math.ceil(review.BoatRating.cleanliness))].map((star, idx) => {
                  return <FaSoap key={idx} color={"#ffc107"}></FaSoap>;
                })}
              </div>
            </div>

            <div>
              <h2>Comfort: {review.BoatRating.comfort}</h2>

              <div className="boat__rating__stars">
                {[...Array(Math.ceil(review.BoatRating.comfort))].map((star, idx) => {
                  return <FaCouch key={idx} color={"#ffc107"}></FaCouch>;
                })}
              </div>
            </div>

            <div>
              <h2>Functionality: {review.BoatRating.functional}</h2>

              <div className="boat__rating__stars">
                {[...Array(Math.ceil(review.BoatRating.functional))].map((star, idx) => {
                  return <FaWrench key={idx} color={"#ffc107"}></FaWrench>;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoatReviewCard;
