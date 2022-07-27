import BoatPageRatingCard from "../../BoatPage/BoatPageReviews/BoatPageRatingCard";
import UserRatingDisplay from "../../Ratings/UserRatingDisplay";

function NewBoatReviewCard({ review }) {
  //
  // console.log(review, "---------------------");

  return (
    <div className="modal__review__card">
      {review.average ? <BoatPageRatingCard rating={review}></BoatPageRatingCard> : null}
      {/* <BoatPageRatingCard rating={}></BoatPageRatingCard> */}
    </div>
  );
}

export default NewBoatReviewCard;
