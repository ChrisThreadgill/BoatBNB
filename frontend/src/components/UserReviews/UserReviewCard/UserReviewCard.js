import "./UserReviewCard.css";
import { useHistory } from "react-router-dom";
import UserRatingDisplay from "../../Ratings/UserRatingDisplay";
import UserReviewCardRatingDisplay from "../UserReviewCardRatingDisplay/UserReviewCardRatingDisplay";
const moment = require("moment");

function UserReviewCard({ review }) {
  const history = useHistory();
  console.log(review, "in the review card");

  //

  return (
    <div className="user__review__card__container">
      <div className="review__card__user__profile">
        <img
          src={review.User.profilePicture ? `/api/images/${review.User.profilePicture}` : null}
          className="review__profile__picture"
          onClick={() => {
            history.push(`/users/${review.User.id}`);
          }}
        />
        <div>{review.User.firstName}</div>
      </div>
      {review && review.UserRating ? (
        <div className="user__review__card__content__container">
          <div>
            <UserReviewCardRatingDisplay userRating={review.UserRating}></UserReviewCardRatingDisplay>
          </div>
          <div className="user__review__content">{review.content}</div>
        </div>
      ) : (
        <div className="user__review__card__no__rating__content__container">
          <div>
            <div className="placeholder__no__rating__review__content">
              <div className="user__review__no__rating__date">{moment(review.createdAt).format("MMMM Do YYYY")}</div>
            </div>
          </div>
          <div className="user__review__content">{review.content}</div>
        </div>
      )}
    </div>
  );
}

export default UserReviewCard;
