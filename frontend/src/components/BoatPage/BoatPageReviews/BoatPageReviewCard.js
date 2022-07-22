import "./BoatPageReviewCard.css";
import { useHistory } from "react-router-dom";
import BoatPageRatingDisplay from "./BoatPageRatingDisplay";

const moment = require("moment");

function BoatPageReviewCard({ review, user }) {
  const history = useHistory();
  // console.log(review, user, "in the review card");

  //

  return (
    <div className="user__review__card__container">
      <div className="review__card__user__profile">
        <img
          src={review.User.profilePicture ? `${review.User.profilePicture}` : null}
          className="review__profile__picture"
          onClick={() => {
            history.push(`/users/${review.User.id}`);
          }}
        />
        <div>{review.User.firstName}</div>
      </div>
      {review && review.BoatRating ? (
        <div className="user__review__card__content__container">
          <div>
            <BoatPageRatingDisplay boatRating={review.BoatRating}></BoatPageRatingDisplay>
            {/* <UserReviewCardRatingDisplay userRating={review.UserRating}></UserReviewCardRatingDisplay> */}
          </div>
          <div className="user__review__content">{review.review}</div>
        </div>
      ) : (
        <div className="user__review__card__no__rating__content__container">
          <div>
            <div className="placeholder__no__rating__review__content">
              <div className="user__review__no__rating__date">{moment(review.createdAt).format("MMMM Do YYYY")}</div>
            </div>
          </div>
          <div className="user__review__content">{review.review}</div>
        </div>
      )}
    </div>
  );
}

export default BoatPageReviewCard;
