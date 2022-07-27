import "./BoatPageRatingCard.css";

import BoatPageRatingDisplay from "./BoatPageRatingDisplay";
import BoatPageReviewCard from "./BoatPageReviewCard";
import BoatPageRatingReview from "./BoatPageRatingReview";

function BoatPageRatingCard({ rating }) {
  console.log(rating, "----------------------");
  // console.log(rating, "boat page rating carddfdddddddddd");
  //

  return (
    <>
      {/* <div className="user__review__card__content__container"> */}
      {/* <div> */}
      {rating.BoatReview ? (
        <BoatPageRatingReview rating={rating}></BoatPageRatingReview>
      ) : (
        // <BoatPageRatingReview></BoatPageRatingReview>
        <BoatPageRatingDisplay boatRating={rating}></BoatPageRatingDisplay>
      )}
      {/* <BoatPageRatingDisplay boatRating={rating}></BoatPageRatingDisplay> */}
      {/* </div> */}
      {/* <BoatPageReviewCard review={review}></BoatPageReviewCard> */}
      {/* <div className="user__review__content">{rating.content}</div> */}
    </>
    // </div>
  );
}

export default BoatPageRatingCard;
