import "./BoatPageRatingCard.css";
import { useHistory } from "react-router-dom";
import BoatPageRatingDisplay from "./BoatPageRatingDisplay";
import BoatPageReviewCard from "./BoatPageReviewCard";
import BoatPageRatingReview from "./BoatPageRatingReview";

function BoatPageRatingCard({ rating }) {
  const history = useHistory();
  console.log(rating, "----------------------");
  // console.log(rating, "boat page rating carddfdddddddddd");
  //

  return (
    <div className="user__review__card__container">
      <div className="review__card__user__profile">
        <img
          src={rating.User.profilePicture ? `${rating.User.profilePicture}` : null}
          className="review__profile__picture"
          onClick={() => {
            history.push(`/users/${rating.User.id}`);
          }}
        />
        <div>{rating.User.firstName}</div>
      </div>

      {/* <div className="user__review__card__content__container"> */}
      <div>
        {rating.BoatReview ? (
          <BoatPageRatingReview rating={rating}></BoatPageRatingReview>
        ) : (
          // <BoatPageRatingReview></BoatPageRatingReview>
          <BoatPageRatingDisplay boatRating={rating}></BoatPageRatingDisplay>
        )}
        {/* <BoatPageRatingDisplay boatRating={rating}></BoatPageRatingDisplay> */}
      </div>
      {/* <BoatPageReviewCard review={review}></BoatPageReviewCard> */}
      {/* <div className="user__review__content">{rating.content}</div> */}
    </div>
    // </div>
  );
}

export default BoatPageRatingCard;
