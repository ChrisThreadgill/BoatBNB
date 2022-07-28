import "./BoatPageReviewCard.css";
import { useHistory } from "react-router-dom";
import BoatPageRatingDisplay from "./BoatPageRatingDisplay";
import BoatPageReviewRatingDisplay from "./BoatPageReviewRatingDisplay";

const moment = require("moment");

function BoatPageRatingReview({ rating }) {
  const history = useHistory();
  // console.log(rating.User.profilePicture, "boat page rating review");

  //

  return (
    <div className="boat__review__card__container">
      <div className="review__card__user__profile">
        {rating.User.profilePicture ? (
          <img
            className="boat__information__profile__picture"
            onClick={() => history.push(`/users/${rating.User.id}`)}
            src={rating.User.profilePicture ? `${rating.User.profilePicture}` : null}
          ></img>
        ) : (
          <div
            className="boat__information__no__profile__picture"
            onClick={() => history.push(`/users/${rating.User.id}`)}
          >
            {rating.User.firstName.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div>{`${rating.User.firstName.slice(0, 1).toUpperCase()}${rating.User.firstName.slice(1)}`}</div>
      </div>
      {rating && rating.BoatReview ? (
        <div className="boat__review__card__content__container">
          <div>
            <BoatPageReviewRatingDisplay rating={rating}></BoatPageReviewRatingDisplay>
            {/* <UserReviewCardRatingDisplay userRating={rating.UserRating}></UserReviewCardRatingDisplay> */}
          </div>
          <div className="user__review__content">{rating.BoatReview.review}</div>
        </div>
      ) : (
        <div className="user__review__card__no__rating__content__container">
          <div>
            <div className="placeholder__no__rating__review__content">
              <div className="user__review__no__rating__date">{moment(rating.createdAt).format("MMMM Do YYYY")}</div>
            </div>
          </div>
          <div className="user__review__content">{rating.BoatReview.review}</div>
        </div>
      )}
    </div>
  );
}

export default BoatPageRatingReview;
