import "./UserRatingCard.css";
import { useHistory } from "react-router-dom";
import UserReviewCardRatingDisplay from "../UserReviews/UserReviewCardRatingDisplay/UserReviewCardRatingDisplay";

function UserRatingCard({ rating }) {
  const history = useHistory();
  // console.log(rating);
  //

  return (
    <div className="user__review__card__container">
      <div className="review__card__user__profile">
        <img
          src={rating.User.profilePicture ? `/api/images/${rating.User.profilePicture}` : null}
          className="review__profile__picture"
          onClick={() => {
            history.push(`/users/${rating.User.id}`);
          }}
        />
        <div>{rating.User.firstName}</div>
      </div>

      <div className="user__review__card__content__container">
        <div>
          <UserReviewCardRatingDisplay userRating={rating}></UserReviewCardRatingDisplay>
        </div>
        {/* <div className="user__review__content">{rating.content}</div> */}
      </div>
    </div>
  );
}

export default UserRatingCard;
