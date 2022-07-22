import "./BoatPageReviewCard.css";
import { useHistory } from "react-router-dom";
import BoatPageRatingDisplay from "./BoatPageRatingDisplay";

const moment = require("moment");

function BoatPageRatingReview({ rating }) {
  const history = useHistory();
  // console.log(rating, "boat page rating review");

  //

  return (
    <div className="user__review__card__container">
      {/* <div className="review__card__user__profile">
        <img
          src={rating.User.profilePicture ? `/api/images/${rating.User.profilePicture}` : null}
          className="rating__profile__picture"
          onClick={() => {
            history.push(`/users/${rating.User.id}`);
          }}
        />
        <div>{rating.User.firstName}</div>
      </div> */}
      {rating && rating.BoatReview ? (
        <div className="user__review__card__content__container">
          <div>
            <BoatPageRatingDisplay boatRating={rating}></BoatPageRatingDisplay>
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
